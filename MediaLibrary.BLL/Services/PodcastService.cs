﻿using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Xml;
using Fody;
using Microsoft.SyndicationFeed;
using Microsoft.SyndicationFeed.Rss;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using System.Linq.Expressions;
using MediaLibrary.DAL.Models;

namespace MediaLibrary.BLL.Services
{
    [ConfigureAwait(false)]
    [Export(typeof(IPodcastService))]
    public class PodcastService : IPodcastService
    {
        private readonly IDataService dataService;
        private readonly IWebService webService;
        private readonly ITransactionService transactionService;
        private readonly IFileService fileService;

         [ImportingConstructor]
        public PodcastService(IDataService dataService, IWebService webService, ITransactionService transactionService,
                              IFileService fileService)
        {
            this.dataService = dataService;
            this.webService = webService;
            this.transactionService = transactionService;
            this.fileService = fileService;
        }

        public async Task<Podcast> AddPodcast(string url) => await ParseRssFeed(new Podcast { Url = url });

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

                }).Select(data => new PodcastItem(data.Title, data.Description, data.Enclosure.Uri.OriginalString,
                                                  data.Enclosure.Length, data.PublishDate, podcast.Id))
                  .Where(item => item.PublishDate > lastUpdateDate)
                  .ToList();
                
                await dataService.Insert(podcastItems);
                podcast.PodcastItems = podcastItems.ToList();
                await dataService.Update(podcast);
            }

            return podcast;
        }

        public async Task<string> AddPodcastFile(Transaction transaction, int podcastItemId)
        {
            string fileName = string.Empty;

            try
            {
                PodcastItem podcastItem = null;

                podcastItem = await dataService.Get<PodcastItem>(item => item.Id == podcastItemId, default, item => item.Podcast);

                if (podcastItem != null)
                {
                    transaction.Message = podcastItem.Id.ToString();
                    await dataService.Update(transaction);

                    if (string.IsNullOrWhiteSpace(podcastItem.File))
                    {
                        string path = Path.Combine(fileService.PodcastFolder, podcastItem.Podcast.Title);

                        foreach (char c in Path.GetInvalidFileNameChars()) { path = path.Replace(c.ToString(), string.Empty); }
                        if (!Directory.Exists(path)) { Directory.CreateDirectory(path); }
                        fileName = Path.Combine(path, Path.GetFileName((new Uri(podcastItem.Url)).LocalPath));
                        podcastItem.File = fileName;
                        File.WriteAllBytes(fileName, await webService.DownloadData(podcastItem.Url));
                        await dataService.Update(podcastItem);
                        await transactionService.UpdateTransactionCompleted(transaction);
                    }
                    else
                    {
                        await transactionService.UpdateTransactionCompleted(transaction, $"Podcast: {podcastItem.Podcast.Title}, Episode: {podcastItem.Title} already downloaded.");
                    }
                }
                else
                {
                    await transactionService.UpdateTransactionCompleted(transaction, $"No podcast item found with id: {podcastItemId}.");
                }
            }
            catch(Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }

            return fileName;
        }
    }
}