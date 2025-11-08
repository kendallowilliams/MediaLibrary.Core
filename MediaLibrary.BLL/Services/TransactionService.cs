using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.BLL.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IDataService dataService;
        private readonly IConfiguration configuration;

        public TransactionService(IDataService dataService, IConfiguration configuration)
        {
            this.dataService = dataService;
            this.configuration = configuration;
        }

        public async Task<Transaction> GetNewTransaction(TransactionTypes transactionType)
        {
            Transaction transaction = new Transaction(transactionType);

            transaction.Status = TransactionStatus.Created;
            transaction.StatusMessage = $"{TransactionStatus.Created} [{Enum.GetName(typeof(TransactionTypes), transaction.Type)}]";
            await dataService.Insert(transaction);

            return transaction;
        }

        public async Task UpdateTransactionCompleted(Transaction transaction, string message = null)
        {
            if (transaction != null)
            {
                transaction.Status = TransactionStatus.Completed;
                transaction.StatusMessage = $"{TransactionStatus.Completed} [{Enum.GetName(typeof(TransactionTypes), transaction.Type)}]";
                transaction.Message = message ?? transaction.Message;
                transaction.ModifyDate = DateTime.Now;
                await dataService.Update(transaction);
            }
        }

        public async Task UpdateTransactionInProcess(Transaction transaction)
        {
            if (transaction != null)
            {
                transaction.Status = TransactionStatus.InProcess;
                transaction.StatusMessage = $"{TransactionStatus.InProcess} [{Enum.GetName(typeof(TransactionTypes), transaction.Type)}]";
                transaction.ModifyDate = DateTime.Now;
                await dataService.Update(transaction);
            }
        }

        public async Task UpdateTransactionErrored(Transaction transaction, Exception exception)
        {
            if (transaction != null)
            {
                transaction.Status = TransactionStatus.Errored;
                transaction.StatusMessage = $"{TransactionStatus.Errored} [{Enum.GetName(typeof(TransactionTypes), transaction.Type)}]";
                transaction.ErrorMessage = exception.ToString();
                transaction.ModifyDate = DateTime.Now;
                await dataService.Update(transaction);
            }
        }

        public async Task<IEnumerable<Transaction>> GetActiveTransactionsByType(TransactionTypes transactionType) =>
            await dataService.GetList<Transaction>(t => t.Type == transactionType && t.Status == TransactionStatus.InProcess);

        public async Task CleanUpTransactions()
        {
            int.TryParse(configuration["TransactionExpirationAge"], out int transactionExpirationDays);
            DateTime expirationDate = DateTime.Now.Date.AddDays(-transactionExpirationDays);
            await dataService.DeleteAll<Transaction>(transaction => transaction.CreateDate < expirationDate);
        }
    }
}