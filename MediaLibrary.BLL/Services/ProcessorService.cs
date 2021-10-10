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
        private readonly ITransactionService transactionService;
        private readonly ITPLService tplService;

        public ProcessorService(IDataService dataService, IPodcastService podcastService, IFileService fileService,
                                ITransactionService transactionService, ITPLService tplService)
        {
            this.dataService = dataService;
            this.podcastService = podcastService;
            this.fileService = fileService;
            this.transactionService = transactionService;
            this.tplService = tplService;
        }

        public async Task RefreshPodcasts()
        {
            Transaction transaction = null;
            IEnumerable<Podcast> podcasts = null;
            IEnumerable<Task<Podcast>> tasks = null;

            try
            {
                transaction = await transactionService.GetNewTransaction(TransactionTypes.RefreshPodcast);
                podcasts = await dataService.GetList<Podcast>();
                tasks = podcasts.Select(podcast => podcastService.RefreshPodcast(podcast));
                await tplService.ConcurrentAsync(async podcast => await podcastService.RefreshPodcast(podcast), podcasts, 4, default(CancellationToken));
                await transactionService.UpdateTransactionCompleted(transaction);
            }
            catch (Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
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