using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.DAL.Enums;

namespace MediaLibrary.BLL.Services
{
    [Export(typeof(ILogService))]
    public class LogService : ILogService
    {
        private readonly ITransactionService transactionService;

        [ImportingConstructor]
        public LogService(ITransactionService transactionService)
        {
            this.transactionService = transactionService;
        }

        public async Task Log(TransactionTypes transactionType, string message)
        {
            Transaction transaction = await transactionService.GetNewTransaction(transactionType);

            transaction.Message = message;
            await transactionService.UpdateTransactionCompleted(transaction);
        }
    }
}
