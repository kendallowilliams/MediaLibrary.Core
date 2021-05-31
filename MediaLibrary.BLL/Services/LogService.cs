using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;
using Diagnostics = System.Diagnostics;

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

        public async Task Log<T>(T entity, string message)
        {
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.LogObject);
            var data = new { Message = message, Object = JsonConvert.SerializeObject(entity) };

            transaction.Message = JsonConvert.SerializeObject(data);
            await transactionService.UpdateTransactionCompleted(transaction);
        }

        public async Task Error(string message)
        {
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.LogError);

            transaction.ErrorMessage = message;
            await transactionService.UpdateTransactionCompleted(transaction);
        }

        public async Task Error(Exception ex)
        {
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.LogError);
            
            transaction.ErrorMessage = ex.Message;
            if (ex.InnerException != null) /*then*/ transaction.ErrorMessage = $"{transaction.ErrorMessage} [{ex.InnerException.Message}]";
            await transactionService.UpdateTransactionCompleted(transaction);
        }

        public async Task Error(AggregateException ex)
        {
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.LogError);
            IEnumerable<string> errors = ex.InnerExceptions.Select(item => item.Message);
            string separator = string.Join(string.Empty, Enumerable.Repeat(Environment.NewLine, 2));

            transaction.ErrorMessage = string.Join(separator, errors);
            await transactionService.UpdateTransactionCompleted(transaction);
        }

        public async Task Info(string message)
        {
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.LogInfo);

            transaction.Message = message;
            await transactionService.UpdateTransactionCompleted(transaction);
        }

        public async Task Warn(string message)
        {
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.LogWarn);

            transaction.Message = message;
            await transactionService.UpdateTransactionCompleted(transaction);
        }

        public async Task Fatal(string message)
        {
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.LogFatal);

            transaction.ErrorMessage = message;
            await transactionService.UpdateTransactionCompleted(transaction);
        }

        public async Task Fatal(Exception ex)
        {
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.LogFatal);

            transaction.ErrorMessage = ex.Message;
            if (ex.InnerException != null) /*then*/ transaction.ErrorMessage = $"{transaction.ErrorMessage} [{ex.InnerException.Message}]";
            await transactionService.UpdateTransactionCompleted(transaction);
        }

        public async Task Fatal(AggregateException ex)
        {
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.LogFatal);
            IEnumerable<string> errors = ex.InnerExceptions.Select(item => item.Message);
            string separator = string.Join(string.Empty, Enumerable.Repeat(Environment.NewLine, 2));

            transaction.ErrorMessage = string.Join(separator, errors);
            await transactionService.UpdateTransactionCompleted(transaction);
        }

        public async Task Debug(string message)
        {
#if TRACE || DEBUG
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.LogDebug);

            transaction.Message = message;
            await transactionService.UpdateTransactionCompleted(transaction);
            Diagnostics.Debug.WriteLine(message);
#else
            await Task.CompletedTask;
#endif
        }

        public async Task Trace(string message)
        {
#if TRACE
            Transaction transaction = await transactionService.GetNewTransaction(TransactionTypes.LogTrace);

            transaction.Message = message;
            await transactionService.UpdateTransactionCompleted(transaction);
            Diagnostics.Trace.WriteLine(message);
#else
            await Task.CompletedTask;
#endif
        }
    }
}
