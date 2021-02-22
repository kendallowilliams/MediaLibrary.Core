using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.WebUI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using MediaLibrary.DAL.Models;

namespace MediaLibrary.WebUI.Services
{
    [Export(typeof(IControllerService))]
    public class ControllerService : IControllerService
    {
        private readonly ITransactionService transactionService;

        [ImportingConstructor]
        public ControllerService(ITransactionService transactionService)
        {
            this.transactionService = transactionService;
        }

        public async Task QueueBackgroundWorkItem(Func<CancellationToken, Task> workItem, Transaction transaction)
        {
            await transactionService.UpdateTransactionInProcess(transaction);
            //HostingEnvironment.QueueBackgroundWorkItem(async ct => await workItem(ct));
        }

        public async Task QueueBackgroundWorkItem(Action<CancellationToken> workItem, Transaction transaction)
        {
            await transactionService.UpdateTransactionInProcess(transaction);
            //HostingEnvironment.QueueBackgroundWorkItem(workItem);
        }
    }
}