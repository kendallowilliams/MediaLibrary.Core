using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.WebUI.Models;
using MediaLibrary.WebUI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;
using IO_File = System.IO.File;

namespace MediaLibrary.WebUI.Controllers
{
    public class PodcastController : BaseController
    {
        private readonly IBackgroundTaskQueueService backgroundTaskQueue;
        private readonly IPodcastUIService podcastUIService;
        private readonly IDataService dataService;
        private readonly PodcastViewModel podcastViewModel;
        private readonly IPodcastService podcastService;
        private readonly ITransactionService transactionService;
        private readonly IFileService fileService;
        private readonly ILogService logService;
        private readonly ITPLService tplService;
        private readonly IWebService webService;
        private readonly IMemoryCache memoryCache;

        public PodcastController(IBackgroundTaskQueueService backgroundTaskQueue, IPodcastUIService podcastUIService, IDataService dataService,
                                 PodcastViewModel podcastViewModel, IPodcastService podcastService, ITransactionService transactionService,
                                 IFileService fileService, ILogService logService, ITPLService tplService,
                                 IWebService webService, IMemoryCache memoryCache)
        {
            this.podcastUIService = podcastUIService;
            this.dataService = dataService;
            this.podcastViewModel = podcastViewModel;
            this.podcastService = podcastService;
            this.transactionService = transactionService;
            this.fileService = fileService;
            this.backgroundTaskQueue = backgroundTaskQueue;
            this.logService = logService;
            this.tplService = tplService;
            this.webService = webService;
            this.memoryCache = memoryCache;
        }

        public async Task<IActionResult> Index()
        {
            IActionResult result = null;
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Podcast);

            podcastViewModel.Configuration = configuration?.GetConfigurationObject<PodcastConfiguration>() ?? new PodcastConfiguration();
            podcastViewModel.PodcastGroups = await podcastUIService.GetPodcastGroups(podcastViewModel.Configuration.SelectedPodcastSort);

            if (podcastViewModel.Configuration.SelectedPodcastPage == PodcastPages.Podcast &&
                await dataService.Exists<Podcast>(podcast => podcast.Id == podcastViewModel.Configuration.SelectedPodcastId))
            {
                result = await Get(podcastViewModel.Configuration.SelectedPodcastId, podcastViewModel.Configuration.SelectedPodcastFilter);
            }
            else
            {
                result = PartialView(podcastViewModel);
            }

            return result;
        }

        public async Task AddPodcast(string rssFeed)
        {
            Podcast podcast = await dataService.Get<Podcast>(item => item.Url.Trim() == rssFeed.Trim()) ?? 
                              await podcastService.AddPodcast(rssFeed);
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Podcast);

            podcastUIService.ClearPodcasts();

            if (configuration != null)
            {
                podcastViewModel.Configuration = configuration.GetConfigurationObject<PodcastConfiguration>();
                podcastViewModel.Configuration.SelectedPodcastId = podcast.Id;
                podcastViewModel.Configuration.SelectedPodcastPage = PodcastPages.Podcast;
                configuration.JsonData = JsonConvert.SerializeObject(podcastViewModel.Configuration);
                await dataService.Update(configuration);
            }
        }

        public async Task RemovePodcast(int id)
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Podcast);

            await podcastService.RemovePodcast(id);
            podcastUIService.ClearPodcasts();

            if (configuration != null)
            {
                PodcastConfiguration podcastConfiguration = configuration.GetConfigurationObject<PodcastConfiguration>();

                podcastConfiguration.SelectedPodcastPage = PodcastPages.Index;
                configuration.JsonData = JsonConvert.SerializeObject(podcastConfiguration);
                await dataService.Update(configuration);
            }
        }

        private async Task<IActionResult> Get(int id, PodcastFilter filter = default(PodcastFilter))
        {   // retrieve podcast items in order to get list of all years for view
            Func<PodcastItem, bool> expression = null;

            if (filter == PodcastFilter.Downloaded) /*then*/ expression = item => !string.IsNullOrWhiteSpace(item.File);
            else if (filter == PodcastFilter.Unplayed) /*then*/ expression = item => !item.LastPlayedDate.HasValue;
            podcastViewModel.SelectedPodcast = await dataService.Get<Podcast>(podcast => podcast.Id == id, default, podcast => podcast.PodcastItems);
            if (expression != null) /*then*/ podcastViewModel.SelectedPodcast.PodcastItems = podcastViewModel.SelectedPodcast.PodcastItems.Where(expression).ToList();

            return PartialView("Podcast", podcastViewModel);
        }

        public async Task<IActionResult> GetPodcastItems(int id, int year, PodcastFilter filter = default(PodcastFilter))
        {
            Func<PodcastItem, bool> expression = null;
            IEnumerable<PodcastItem> podcastItems = await dataService.GetList<PodcastItem>(item => item.PodcastId == id && item.PublishDate.Year == year);
            bool hasPlaylists = await dataService.Exists<Playlist>(item => item.Type == PlaylistTypes.Podcast);
            IEnumerable<int> downloadIds = await GetActiveDownloadIds();

            if (filter == PodcastFilter.Downloaded) /*then*/ expression = item => !string.IsNullOrWhiteSpace(item.File);
            else if (filter == PodcastFilter.Unplayed) /*then*/ expression = item => !item.LastPlayedDate.HasValue;
            if (expression != null) /*then*/ podcastItems = podcastItems.Where(expression);

            return PartialView("PodcastItems", (hasPlaylists, podcastItems.OrderByDescending(item => item.PublishDate), downloadIds));
        }

        private async Task<IEnumerable<int>> GetActiveDownloadIds()
        {
            IEnumerable<Transaction> inProcessDownloads = await dataService.GetList<Transaction>(item => item.Status == TransactionStatus.InProcess &&
                                                                                                          item.Type == TransactionTypes.DownloadEpisode);
            IEnumerable<int> downloadIds = inProcessDownloads.Select(item => item.Message)
                                                             .Where(item => !string.IsNullOrWhiteSpace(item))
                                                             .Select(item => new { Valid = int.TryParse(item, out int value), Id = value })
                                                             .Select(item => item.Id);

            return downloadIds;
        }

        public async Task<bool> IsDownloading(int id)
        {
            return await GetActiveDownloadIds().ContinueWith(task => task.Result.Contains(id));
        }

        public async Task DownloadPodcastItem(int id)
        {
            Transaction transaction = new Transaction(TransactionTypes.DownloadEpisode);

            try
            {
                bool existingTransaction = await GetActiveDownloadIds().ContinueWith(task => task.Result.Contains(id));

                transaction = await transactionService.GetNewTransaction(TransactionTypes.DownloadEpisode);

                if (!existingTransaction)
                {
                    await transactionService.UpdateTransactionInProcess(transaction);
                    backgroundTaskQueue.QueueBackgroundWorkItem(async task => await podcastService.AddPodcastFile(transaction, id).ContinueWith(_ => podcastUIService.ClearPodcasts()));
                }
                else
                {
                    await transactionService.UpdateTransactionCompleted(transaction, $"Podcast episode ({id}) download in progress.");
                }
            }
            catch(Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }
        }

        public async Task RemovePodcastItemDownload(int id)
        {
            Transaction transaction = new Transaction(TransactionTypes.RemoveEpisodeDownload);

            try
            {
                bool existingTransaction = await GetActiveDownloadIds().ContinueWith(task => task.Result.Contains(id));
                PodcastItem podcastItem = await dataService.Get<PodcastItem>(item => item.Id == id);

                transaction = await transactionService.GetNewTransaction(TransactionTypes.RemoveEpisodeDownload);

                if (!existingTransaction)
                {
                    if (!string.IsNullOrWhiteSpace(podcastItem.File))
                    {
                        if (System.IO.File.Exists(podcastItem.File))
                        {
                            System.IO.File.Delete(podcastItem.File);
                        }

                        podcastItem.File = null;
                        await dataService.Update(podcastItem);
                        podcastUIService.ClearPodcasts();
                        await transactionService.UpdateTransactionCompleted(transaction);
                    }
                    else
                    {
                        await transactionService.UpdateTransactionCompleted(transaction, $"Download not found or does not exist.");
                    }
                }
                else
                {
                    await transactionService.UpdateTransactionCompleted(transaction, $"Podcast episode ({id}) download in progress.");
                }
            }
            catch (Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }
        }

        public async Task Refresh(int id = 0)
        {
            if (id > 0)
            {
                Podcast podcast = await dataService.Get<Podcast>(item => item.Id == id);

                if (podcast != null)
                {
                    await logService.Info($"Refreshing podcast: {podcast.Title}");
                    await podcastService.RefreshPodcast(podcast);
                }
                else
                {
                    await logService.Warn($"Podcast [Id: {id}] not found.");
                }
            }
            else
            {
                IEnumerable<Podcast> podcasts = await dataService.GetList<Podcast>();

                await logService.Info($"Refreshing podcasts: {string.Join(", ", podcasts.Select(p => p.Title))}");
                await tplService.ConcurrentAsync(async podcast => await podcastService.RefreshPodcast(podcast), podcasts, 4, default(CancellationToken));
            }

            podcastUIService.ClearPodcasts();
        }

        [AllowAnonymous]
        public async Task<IActionResult> File(int id)
        {
            IActionResult result = null;

            try
            {
                PodcastItem podcastItem = await dataService.Get<PodcastItem>(item => item.Id == id);

                if (podcastItem != null)
                {
                    if (string.IsNullOrWhiteSpace(podcastItem.File))
                    {
                        string cacheKey = podcastService.GetPodcastItemCacheKey(podcastItem.Id);
                        bool cacheFound = memoryCache.TryGetValue(cacheKey, out byte[] itemData);

                        if (cacheFound && itemData != null)
                        {
                            result = File(itemData, "audio/mpeg", true);
                        }
                        else
                        {
                            if (!cacheFound)
                            {
                                var expiration = DateTimeOffset.Now.AddDays(1);

                                memoryCache.Set<byte[]>(cacheKey, null, expiration);
                                backgroundTaskQueue.QueueBackgroundWorkItem(async token =>
                                    await webService.DownloadData(podcastItem.Url)
                                                    .ContinueWith(t => memoryCache.Set(cacheKey, t.Result, expiration)));
                            }
                            result = new RedirectResult(podcastItem.Url);
                        }
                    }
                    else
                    {
                        FileExtensionContentTypeProvider contentTypeProvider = new FileExtensionContentTypeProvider();

                        contentTypeProvider.TryGetContentType(podcastItem.File, out string contentType);
                        result = File(IO_File.OpenRead(podcastItem.File), contentType, true);
                    }
                    await logService.Info($"{nameof(PodcastController)} -> {nameof(File)} -> Id: {podcastItem.Id}");
                }
                else
                {
                    result = new StatusCodeResult((int)HttpStatusCode.NotFound);
                    await logService.Warn($"{nameof(PodcastController)} -> {nameof(File)} -> Id: {id} -> Not Found");
                }
            }
            catch(Exception ex)
            {
                await logService.Error(ex);
                result = new StatusCodeResult((int)HttpStatusCode.InternalServerError);
            }

            return result;
        }

        public async Task<IActionResult> UpdateConfiguration([FromBody] PodcastConfiguration podcastConfiguration)
        {
            if (ModelState.IsValid)
            {
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Podcast);

                if (configuration == null)
                {
                    configuration = new Configuration() { Type = ConfigurationTypes.Podcast, JsonData = JsonConvert.SerializeObject(podcastConfiguration) };
                    await dataService.Insert(configuration);
                }
                else
                {
                    configuration.JsonData = JsonConvert.SerializeObject(podcastConfiguration);
                    await dataService.Update(configuration);
                }
            }

            return NoContent();
        }

        public async Task<IActionResult> PodcastConfiguration()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Podcast);

            podcastViewModel.Configuration = configuration?.GetConfigurationObject<PodcastConfiguration>() ?? new PodcastConfiguration();

            return Json(podcastViewModel.Configuration, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }

        public async Task AddPodcastItemToPlaylist(int itemId, int playlistId)
        {
            PlaylistPodcastItem item = new PlaylistPodcastItem() { PlaylistId = playlistId, PodcastItemId = itemId };
            Transaction transaction = null;

            try
            {
                transaction = await transactionService.GetNewTransaction(TransactionTypes.AddPlaylistPodcastItem);
                await dataService.Insert(item);
                await transactionService.UpdateTransactionCompleted(transaction, $"Playlist: {playlistId}, PodcastItem: {itemId}");
            }
            catch (Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }
        }

        public async Task<IActionResult> GetPodcastsJSON()
        {
            JsonSerializerSettings settings = new JsonSerializerSettings() { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };
            IEnumerable<Podcast> podcasts = await dataService.GetList<Podcast>();
            string json = JsonConvert.SerializeObject(podcasts, settings);

            return new ContentResult() { Content = json, ContentType = "application/json" };
        }

        public async Task<IActionResult> GetPodcastJSON(int id)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings() { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };
            Podcast podcast = await dataService.Get<Podcast>(item => item.Id == id, default, item => item.PodcastItems);
            string json = JsonConvert.SerializeObject(podcast, settings);

            return new ContentResult() { Content = json, ContentType = "application/json" };
        }

        public async Task MarkPodcastItemPlayed(int id)
        {
            PodcastItem podcastItem = await dataService.Get<PodcastItem>(item => item.Id == id);

            podcastItem.LastPlayedDate = DateTime.Now;
            await dataService.Update(podcastItem);
            podcastUIService.ClearPodcasts();
            memoryCache.Remove(podcastService.GetPodcastItemCacheKey(id));
        }

        public async Task MarkPodcastItemUnplayed(int id)
        {
            PodcastItem podcastItem = await dataService.Get<PodcastItem>(item => item.Id == id);

            if (podcastItem.LastPlayedDate.HasValue)
            {
                podcastItem.LastPlayedDate = null;
                await dataService.Update(podcastItem);
                podcastUIService.ClearPodcasts();
            }
        }
    }
}