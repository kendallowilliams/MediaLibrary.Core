using System;
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

                            await logService.Trace($"{message} [{podcast.Title}] started...");
                            await podcastService.RefreshPodcast(podcast);
                            newItems = podcast.PodcastItems.Where(item => item.PublishDate > lastAutoDownloadDate && !item.IsDownloaded);

                            if (podcast.DownloadNewEpisodes && newItems.Any())
                            {
                                await logService.Trace($"Podcast [{podcast.Title}] auto-download started...");

                                foreach (var item in newItems) 
                                { 
                                    await podcastService.AddPodcastFile(item.Id);
                                    await logService.Info($"File [{item.Url}] downloaded.");
                                }

                                await logService.Trace($"Podcast [{podcast.Title}] auto-download completed.");
                            }

                            await logService.Trace($"{message} [{podcast.Title}] completed.");
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

        public async Task MonitorMusicPaths(CancellationToken token = default)
        {
            Trace.WriteLine($"{nameof(MonitorMusicPaths)}: Started...");
            while (!token.IsCancellationRequested)
            {
                var paths = await GetMusicPaths();
                var dbCTS = CancellationTokenSource.CreateLinkedTokenSource(token);
                var dbTask = new Task(async () =>
                {
                    while (!dbCTS.IsCancellationRequested)
                    {
                        var currentPaths = await GetMusicPaths();

                        if (currentPaths.Except(paths, StringComparer.OrdinalIgnoreCase).Any())
                        {
                            dbCTS.Cancel();
                        }
                        else
                        {
                            await Task.Delay(5000);
                        }
                    }
                }, dbCTS.Token);

                dbTask.Start();
                await Task.WhenAll(paths.Select(path => MonitorMusicPath(path, dbCTS.Token)).Append(dbTask));
            }
            Trace.WriteLine($"{nameof(MonitorMusicPaths)}: Started...");
        }

        private async Task<IEnumerable<string>> GetMusicPaths()
        {
            var musicConfig = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Music)
                                                   .ContinueWith(task => task.Result.GetConfigurationObject<MusicConfiguration>() ??
                                                                         new MusicConfiguration());

            return musicConfig.MusicPaths.Where(path => Directory.Exists(path));
        }

        private async Task MonitorMusicPath(string path, CancellationToken token = default)
        {
            var tcs = new TaskCompletionSource();
            var transaction = await transactionService.GetNewTransaction(TransactionTypes.MonitorMusicPath);

            transaction.Message = path;

            try
            {
                using (var watcher = new FileSystemWatcher(path))
                {
                    watcher.EnableRaisingEvents = true;
                    watcher.IncludeSubdirectories = true;

                    // watcher.Changed += async (obj, args) => await HandleMusicChange(args.FullPath, args.ChangeType);
                    watcher.Renamed += async (obj, args) => await HandleMusicChange(args.FullPath, args.ChangeType);
                    watcher.Created += async (obj, args) => await HandleMusicChange(args.FullPath, args.ChangeType);
                    watcher.Deleted += async (obj, args) => await HandleMusicChange(args.FullPath, args.ChangeType);
                    watcher.Disposed += (obj, args) => { if (!token.IsCancellationRequested) tcs.SetResult(); };
                    watcher.Error += (obj, args) => tcs.SetException(args.GetException());
                    token.Register(() => tcs.SetResult());

                    await transactionService.UpdateTransactionInProcess(transaction);
                    await tcs.Task;
                }
            }
            catch (Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }
        }

        private async Task HandleMusicChange(string file, WatcherChangeTypes changeType = WatcherChangeTypes.All)
        {
            var fileTypes = configuration["FileTypes"].Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

            if (fileTypes.Contains(Path.GetExtension(file), StringComparer.OrdinalIgnoreCase))
            {
                await Task.WhenAll(logService.Info($"{nameof(HandleMusicChange)}, Change Type: {changeType}"),
                                   RefreshMusic(changeType == WatcherChangeTypes.Deleted));
            }
        }

        public async Task RefreshMusic(bool refreshWithDelete = false)
        {
            Transaction transaction = null;

            try
            {
                var transactionType = refreshWithDelete ?
                    TransactionTypes.RefreshMusicWithDelete :
                    TransactionTypes.RefreshMusic;
                transaction = await transactionService.GetNewTransaction(transactionType);
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