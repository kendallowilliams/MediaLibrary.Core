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

        public ProcessorService(IDataService dataService, IPodcastService podcastService, IFileService fileService,
                                ILogService logService, ITPLService tplService, ITransactionService transactionService)
        {
            this.dataService = dataService;
            this.podcastService = podcastService;
            this.fileService = fileService;
            this.logService = logService;
            this.tplService = tplService;
            this.transactionService = transactionService;
        }

        public async Task RefreshPodcasts()
        {
            IEnumerable<Podcast> podcasts = null;

            try
            {
                podcasts = await dataService.GetList<Podcast>();
                await tplService.ConcurrentAsync(async podcast =>
                    {
                        string message = $"{nameof(ProcessorService)} -> {nameof(RefreshPodcasts)} -> {nameof(PodcastService.RefreshPodcast)}";

                        try
                        {
                            await logService.Info($"{message} [{podcast.Title}] started...");
                            await podcastService.RefreshPodcast(podcast);
                            await logService.Info($"{message} [{podcast.Title}] completed.");
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
            catch(Exception ex)
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