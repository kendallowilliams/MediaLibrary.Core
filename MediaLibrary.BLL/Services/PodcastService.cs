using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using Microsoft.SyndicationFeed;
using Microsoft.SyndicationFeed.Rss;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using System.Linq.Expressions;
using MediaLibrary.DAL.Models;
using Microsoft.Extensions.Caching.Memory;

namespace MediaLibrary.BLL.Services
{
    public class PodcastService : IPodcastService
    {
        private readonly IDataService dataService;
        private readonly IWebService webService;
        private readonly ITransactionService transactionService;
        private readonly IFileService fileService;
        private readonly ILogService logService;
        private readonly IMemoryCache memoryCache;

        public PodcastService(IDataService dataService, IWebService webService, ITransactionService transactionService,
                              IFileService fileService, ILogService logService, IMemoryCache memoryCache)
        {
            this.dataService = dataService;
            this.webService = webService;
            this.transactionService = transactionService;
            this.fileService = fileService;
            this.logService = logService;
            this.memoryCache = memoryCache;
        }

        public async Task<Podcast> AddPodcast(string url) => await ParseRssFeed(new Podcast { Url = url });

        public async Task RemovePodcast(int id)
        {
            Podcast podcast = await dataService.Get<Podcast>(item => item.Id == id, default, item => item.PodcastItems);
            IEnumerable<string> episodes = podcast.PodcastItems.Where(item => !string.IsNullOrWhiteSpace(item.File))
                                                               .Select(item => item.File);

            foreach (string file in episodes) { fileService.Delete(file); }
            await dataService.Delete<Podcast>(id);
        }

        public async Task<Podcast> RefreshPodcast(Podcast podcast) => await ParseRssFeed(podcast, true);

        public async Task<Podcast> ParseRssFeed(Podcast podcastData, bool isUpdate = false)
        {
            string title = string.Empty,
                   imageUrl = string.Empty,
                   description = string.Empty,
                   author = string.Empty;
            DateTime pubDate = DateTime.MinValue,
                     lastUpdateDate = DateTime.MinValue;
            List<ISyndicationItem> items = new List<ISyndicationItem>();
            IEnumerable<PodcastItem> podcastItems = Enumerable.Empty<PodcastItem>();
            Podcast podcast = null;

            await logService.Trace($"{nameof(PodcastService)} -> {nameof(ParseRssFeed)} -> {podcastData?.Url} -> Started");

            using (var xmlReader = XmlReader.Create(podcastData.Url, new XmlReaderSettings { Async = true }))
            {
                var feedReader = new RssFeedReader(xmlReader);

                while (await feedReader.Read())
                {
                    switch(feedReader.ElementType)
                    {
                        case SyndicationElementType.Category:
                            ISyndicationCategory category = await feedReader.ReadCategory();
                            break;
                        case SyndicationElementType.Content:
                            ISyndicationContent content = await feedReader.ReadContent();
                            if (content.Name == "title") { title = content.Value; }
                            if (content.Name == "description") { description = content.Value; }
                            if (content.Name == "author") { author = content.Value; }
                            break;
                        case SyndicationElementType.Image:
                            ISyndicationImage image = await feedReader.ReadImage();
                            imageUrl = image.Url?.AbsoluteUri;
                            break;
                        case SyndicationElementType.Item:
                            ISyndicationItem item = await feedReader.ReadItem();
                            items.Add(item);
                            break;
                        case SyndicationElementType.Link:
                            ISyndicationLink link = await feedReader.ReadLink();
                            break;
                        case SyndicationElementType.Person:
                            ISyndicationPerson person = await feedReader.ReadPerson();
                            break;
                        case SyndicationElementType.None:
                        default:
                            break;
                    }
                }
                
                pubDate = items.Max(item => item.Published.DateTime);

                if (isUpdate)
                {
                    lastUpdateDate = podcastData.LastUpdateDate;
                    podcastData.Author = author;
                    podcastData.Title = title;
                    podcastData.ImageUrl = imageUrl;
                    podcastData.Description = description;
                    podcastData.LastUpdateDate = pubDate;
                    podcast = podcastData;
                    await dataService.Update<Podcast>(podcast);
                }
                else
                {
                    podcast = new Podcast(title, podcastData.Url, imageUrl, description, author) { LastUpdateDate = pubDate == DateTime.MinValue ? DateTime.Now : pubDate };
                    await dataService.Insert<Podcast>(podcast);
                }

                podcastItems = items.Select(item => new
                                        {
                                            item.Title,
                                            item.Description,
                                            Enclosure = item.Links.FirstOrDefault(linkItem => linkItem.RelationshipType == "enclosure"),
                                            PublishDate = item.Published.DateTime

                                        })
                                    .Where(item => item.Enclosure != null)
                                    .Select(data => new PodcastItem(data.Title, data.Description, data.Enclosure.Uri.OriginalString,
                                                                    data.Enclosure.Length, data.PublishDate, podcast.Id))
                                    .Where(item => item.PublishDate > lastUpdateDate)
                                    .ToList();
                
                await dataService.Insert(podcastItems);
                podcast.PodcastItems = podcast.PodcastItems.Concat(podcastItems).ToList();
                await dataService.Update(podcast);
            }

            await logService.Trace($"{nameof(PodcastService)} -> {nameof(ParseRssFeed)} -> {podcastData?.Url} -> Completed");

            return podcast;
        }

        public async Task<string> AddPodcastFile(int podcastItemId)
        {
            string fileName = string.Empty;

            try
            {
                PodcastItem podcastItem = null;

                podcastItem = await dataService.Get<PodcastItem>(item => item.Id == podcastItemId, default, item => item.Podcast);

                if (podcastItem != null)
                {
                    if (!podcastItem.IsDownloaded)
                    {
                        string title = podcastItem.Podcast.Title,
                               podcastFolder = fileService.PodcastFolder,
                               path = string.Empty;
                        bool cacheFound = memoryCache.TryGetValue<byte[]>(GetPodcastItemFileCacheKey(podcastItemId), out byte[] itemData);

                        foreach (char c in Path.GetInvalidFileNameChars()) { title = title.Replace(c.ToString(), "_"); }
                        foreach (char c in Path.GetInvalidPathChars()) { path = path.Replace(c.ToString(), "_"); }
                        path = Path.Combine(podcastFolder, title);
                        if (!Directory.Exists(path)) { Directory.CreateDirectory(path); }
                        fileName = Path.Combine(path, Path.GetFileName((new Uri(podcastItem.Url)).LocalPath));
                        podcastItem.File = fileName;

                        if (cacheFound && itemData != null && itemData.Any())
                        {
                            File.WriteAllBytes(fileName, itemData);
                        }
                        else
                        {
                            File.WriteAllBytes(fileName, await webService.DownloadData(podcastItem.Url));
                        }

                        await dataService.Update(podcastItem);
                    }
                    else
                    {
                        await logService.Warn($"Podcast: {podcastItem.Podcast.Title}, Episode: {podcastItem.Title} already downloaded.");
                    }
                }
                else
                {
                    await logService.Warn($"No podcast item found with id: {podcastItemId}.");
                }
            }
            catch(Exception ex)
            {
                await logService.Error(ex);
            }

            return fileName;
        }

        public async Task CleanMissingPodcastFiles()
        {
            IEnumerable<PodcastItem> podcastItems = await dataService.GetList<PodcastItem>(item => item.File != null && item.File != "");

            foreach(var item in podcastItems.Where(item => !File.Exists(item.File)))
            {
                item.File = null;
                await dataService.Update(item);
            }
        }

        public string GetPodcastItemFileCacheKey(int id) => $"PodcastItemFile_{id}";
    }
}