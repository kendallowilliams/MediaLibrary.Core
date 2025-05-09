﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using MediaLibrary.DAL.Models;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using System.Linq.Expressions;
using static MediaLibrary.Shared.Enums;
using System.Threading;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using Newtonsoft.Json;
using System.IO;
using Microsoft.Extensions.Configuration;
using System.Runtime.CompilerServices;
using System.Diagnostics;

namespace MediaLibrary.BLL.Services
{
    public class ProcessorService : IProcessorService
    {
        private readonly IDataService dataService;
        private readonly IPodcastService podcastService;
        private readonly IFileService fileService;
        private readonly ILogService logService;
        private readonly ITPLService tplService;
        private readonly ITransactionService transactionService;
        private readonly IConfiguration configuration;

        public ProcessorService(IDataService dataService, IPodcastService podcastService, IFileService fileService,
                                ILogService logService, ITPLService tplService, ITransactionService transactionService,
                                IConfiguration configuration)
        {
            this.dataService = dataService;
            this.podcastService = podcastService;
            this.fileService = fileService;
            this.logService = logService;
            this.tplService = tplService;
            this.transactionService = transactionService;
            this.configuration = configuration;
        }

        public async Task RefreshPodcasts()
        {
            IEnumerable<Podcast> podcasts = null;
            var configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Podcast);
            var podcastConfiguration = configuration.GetConfigurationObject<PodcastConfiguration>();
            DateTime lastAutoDownloadDate = podcastConfiguration.LastAutoDownloadDate;

            try
            {
                podcasts = await dataService.GetList<Podcast>();
                await tplService.ConcurrentAsync(async podcast =>
                    {
                        string message = $"{nameof(ProcessorService)} -> {nameof(RefreshPodcasts)} -> {nameof(PodcastService.RefreshPodcast)}";

                        try
                        {

                            var newItems = Enumerable.Empty<PodcastItem>();

                            await podcastService.RefreshPodcast(podcast);
                            newItems = podcast.PodcastItems.Where(item => item.PublishDate > lastAutoDownloadDate && !item.IsDownloaded);

                            if (podcast.DownloadNewEpisodes && newItems.Any())
                            {
                                foreach (var item in newItems) 
                                { 
                                    await podcastService.AddPodcastFile(item.Id);
                                }
                            }
                        }
                        catch(AggregateException ex)
                        {
                            await logService.Warn($"{message} [{podcast.Title}] failed.");
                            await logService.Error(ex);
                        }
                        catch(Exception ex)
                        {
                            await logService.Warn($"{message} [{podcast.Title}] failed.");
                            await logService.Error(ex);
                        }
                    }, podcasts, 4, default(CancellationToken));
                podcastConfiguration.LastAutoDownloadDate = DateTime.Now;
                configuration.SetConfigurationObject(podcastConfiguration);
                await dataService.Update(configuration);
                await podcastService.CleanMissingPodcastFiles();
            }
            catch (AggregateException ex)
            {
                await logService.Error(ex);
            }
            catch (Exception ex)
            {
                await logService.Error(ex);
            }
        }

        public async Task RefreshMusic()
        {
            Transaction transaction = null;

            try
            {
                transaction = await transactionService.GetNewTransaction(TransactionTypes.RefreshMusic);
                await fileService.CheckForMusicUpdates(transaction);
            }
            catch (Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }
        }

        public async Task PerformCleanup()
        {
            await transactionService.CleanUpTransactions();
        }
    }
}