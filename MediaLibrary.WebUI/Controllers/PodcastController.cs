﻿using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.WebUI.Models;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.WebUI.Services.Interfaces;
using MediaLibrary.WebUI.Utilities.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using IO_File = System.IO.File;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Controllers
{
    public class PodcastController : BaseController
    {
        private readonly Lazy<IPodcastUIService> lazyPodcastUIService;
        private readonly Lazy<IDataService> lazyDataService;
        private readonly Lazy<PodcastViewModel> lazyPodcastViewModel;
        private readonly Lazy<IPodcastService> lazyPodcastService;
        private readonly Lazy<ITransactionService> lazyTransactionService;
        private readonly Lazy<IFileService> lazyFileService;
        private readonly IBackgroundTaskQueue backgroundTaskQueue;
        private IPodcastUIService podcastUIService => lazyPodcastUIService.Value;
        private IDataService dataService => lazyDataService.Value;
        private PodcastViewModel podcastViewModel => lazyPodcastViewModel.Value;
        private IPodcastService podcastService => lazyPodcastService.Value;
        private ITransactionService transactionService => lazyTransactionService.Value;
        private IFileService fileService => lazyFileService.Value;

        public PodcastController(IMefService mefService, IBackgroundTaskQueue backgroundTaskQueue)
        {
            this.lazyPodcastUIService = mefService.GetExport<IPodcastUIService>();
            this.lazyDataService = mefService.GetExport<IDataService>();
            this.lazyPodcastViewModel = mefService.GetExport<PodcastViewModel>();
            this.lazyPodcastService = mefService.GetExport<IPodcastService>();
            this.lazyTransactionService = mefService.GetExport<ITransactionService>();
            this.lazyFileService = mefService.GetExport<IFileService>();
            this.backgroundTaskQueue = backgroundTaskQueue;
        }

        public async Task<IActionResult> Index()
        {
            IActionResult result = null;
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Podcast));

            if (configuration != null)
            {
                podcastViewModel.Configuration = JsonConvert.DeserializeObject<PodcastConfiguration>(configuration.JsonData);
            }

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

            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Podcast));

            if (configuration != null)
            {
                podcastViewModel.Configuration = JsonConvert.DeserializeObject<PodcastConfiguration>(configuration.JsonData);
                podcastViewModel.Configuration.SelectedPodcastId = podcast.Id;
                podcastViewModel.Configuration.SelectedPodcastPage = PodcastPages.Podcast;
                configuration.JsonData = JsonConvert.SerializeObject(podcastViewModel.Configuration);
                await dataService.Update(configuration);
            }
        }

        public async Task RemovePodcast(int id)
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Podcast));
            Podcast podcast = await dataService.Get<Podcast>(item => item.Id == id, default, item => item.PodcastItems);
            IEnumerable<string> episodes = podcast.PodcastItems.Where(item => !string.IsNullOrWhiteSpace(item.File))
                                                               .Select(item => item.File);

            foreach (string file in episodes) { fileService.Delete(file); }
            await dataService.Delete<Podcast>(id);

            if (configuration != null)
            {
                PodcastConfiguration podcastConfiguration = JsonConvert.DeserializeObject<PodcastConfiguration>(configuration.JsonData);

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
            bool hasPlaylists = await dataService.Exists<Playlist>(item => item.Type == (int)PlaylistTabs.Podcast);
            IEnumerable<int> downloadIds = await GetActiveDownloadIds();

            if (filter == PodcastFilter.Downloaded) /*then*/ expression = item => !string.IsNullOrWhiteSpace(item.File);
            else if (filter == PodcastFilter.Unplayed) /*then*/ expression = item => !item.LastPlayedDate.HasValue;
            if (expression != null) /*then*/ podcastItems = podcastItems.Where(expression);

            return PartialView("PodcastItems", (hasPlaylists, podcastItems.OrderByDescending(item => item.PublishDate), downloadIds));
        }

        private async Task<IEnumerable<int>> GetActiveDownloadIds()
        {
            IEnumerable<Transaction> inProcessDownloads = await dataService.GetList<Transaction>(item => item.Status == (int)TransactionStatus.InProcess &&
                                                                                                          item.Type == (int)TransactionTypes.DownloadEpisode);
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
                    backgroundTaskQueue.QueueBackgroundWorkItem(async task => await podcastService.AddPodcastFile(transaction, id));
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

        public async Task RefreshPodcast(int id)
        {
            await podcastService.RefreshPodcast(await dataService.Get<Podcast>(item => item.Id == id));
        }

#if !DEBUG && !DEV
        [AllowAnonymous]
#endif
        public async Task<IActionResult> File(int id)
        {
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.GetPodcastFile);
            IActionResult result = null;

            try
            {
                PodcastItem podcastItem = await dataService.Get<PodcastItem>(item => item.Id == id);

                if (podcastItem != null)
                {
                    if (string.IsNullOrWhiteSpace(podcastItem.File))
                    {
                        result = new RedirectResult(podcastItem.Url);
                    }
                    else
                    {
                        FileExtensionContentTypeProvider contentTypeProvider = new FileExtensionContentTypeProvider();

                        contentTypeProvider.TryGetContentType(podcastItem.File, out string contentType);
                        result = File(IO_File.OpenRead(podcastItem.File), contentType, true);
                    }
                    await transactionService.UpdateTransactionCompleted(transaction);
                }
                else
                {
                    result = new StatusCodeResult((int)HttpStatusCode.NotFound);
                    await transactionService.UpdateTransactionCompleted(transaction, $"Podcast item: {id} not found.");
                }
            }
            catch(Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
                result = new StatusCodeResult((int)HttpStatusCode.InternalServerError);
            }

            return result;
        }

        public async Task<IActionResult> UpdateConfiguration(PodcastConfiguration podcastConfiguration)
        {
            if (ModelState.IsValid)
            {
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Podcast));

                if (configuration == null)
                {
                    configuration = new Configuration() { Type = nameof(MediaPages.Podcast), JsonData = JsonConvert.SerializeObject(podcastConfiguration) };
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
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Podcast));

            if (configuration != null)
            {
                podcastViewModel.Configuration = JsonConvert.DeserializeObject<PodcastConfiguration>(configuration.JsonData) ?? new PodcastConfiguration();
            }

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

            if (!podcastItem.LastPlayedDate.HasValue)
            {
                podcastItem.LastPlayedDate = DateTime.Now;
                await dataService.Update(podcastItem);
            }
        }

        public async Task MarkPodcastItemUnplayed(int id)
        {
            PodcastItem podcastItem = await dataService.Get<PodcastItem>(item => item.Id == id);

            if (podcastItem.LastPlayedDate.HasValue)
            {
                podcastItem.LastPlayedDate = null;
                await dataService.Update(podcastItem);
            }
        }
    }
}