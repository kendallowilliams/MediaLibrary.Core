using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Fody;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using static MediaLibrary.DAL.Enums;
using System.Linq.Expressions;
using MediaLibrary.DAL.Models;
using System.Configuration;
using Newtonsoft.Json.Linq;

namespace MediaLibrary.BLL.Services
{
    [ConfigureAwait(false)]
    [Export(typeof(ITransactionService))]
    public class TransactionService : ITransactionService
    {
        private readonly IDataService dataService;

        [ImportingConstructor]
        public TransactionService(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<Transaction> GetNewTransaction(TransactionTypes transactionType)
        {
            Transaction transaction = new Transaction(transactionType);

            transaction.Status = (int)TransactionStatus.Created;
            transaction.StatusMessage = $"{TransactionStatus.Created} [{Enum.GetName(typeof(TransactionTypes), transaction.Type)}]";
            await dataService.Insert(transaction);

            return transaction;
        }

        public async Task UpdateTransactionCompleted(Transaction transaction, string message = null)
        {
            if (transaction != null)
            {
                transaction.Status = (int)TransactionStatus.Completed;
                transaction.StatusMessage = $"{TransactionStatus.Completed} [{Enum.GetName(typeof(TransactionTypes), transaction.Type)}]";
                transaction.Message = message;
                transaction.ModifyDate = DateTime.Now;
                await dataService.Update(transaction);
            }
        }

        public async Task UpdateTransactionInProcess(Transaction transaction)
        {
            if (transaction != null)
            {
                transaction.Status = (int)TransactionStatus.InProcess;
                transaction.StatusMessage = $"{TransactionStatus.InProcess} [{Enum.GetName(typeof(TransactionTypes), transaction.Type)}]";
                transaction.ModifyDate = DateTime.Now;
                await dataService.Update(transaction);
            }
        }

        public async Task UpdateTransactionErrored(Transaction transaction, Exception exception)
        {
            if (transaction != null)
            {
                transaction.Status = (int)TransactionStatus.Errored;
                transaction.StatusMessage = $"{TransactionStatus.Errored} [{Enum.GetName(typeof(TransactionTypes), transaction.Type)}]";
                transaction.ErrorMessage = exception.ToString();
                transaction.ModifyDate = DateTime.Now;
                await dataService.Update(transaction);
            }
        }

        public async Task<IEnumerable<Transaction>> GetActiveTransactionsByType(TransactionTypes transactionType) =>
            await dataService.GetList<Transaction>(t => t.Type == (int)transactionType && t.Status == (int)TransactionStatus.InProcess);

        public async Task CleanUpTransactions()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == "MediaLibrary");
            JObject mlConfiguration = JObject.Parse(configuration.JsonData);
            int transactionExpirationDays = mlConfiguration.TryGetValue("TransactionExpirationAge", out JToken jToken) ? jToken.Value<int>() : 30;
            DateTime expirationDate = DateTime.Now.Date.AddDays(-transactionExpirationDays);
            await dataService.DeleteAll<Transaction>(transaction => transaction.CreateDate < expirationDate);
        }
    }
}