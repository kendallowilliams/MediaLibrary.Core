﻿using MediaLibrary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<Transaction> GetNewTransaction(TransactionTypes transactionType);

        Task UpdateTransactionCompleted(Transaction transaction, string message = null);

        Task UpdateTransactionInProcess(Transaction transaction);

        Task UpdateTransactionErrored(Transaction transaction, Exception exception);

        Task<IEnumerable<Transaction>> GetActiveTransactionsByType(TransactionTypes transactionType);

        Task CleanUpTransactions();
    }
}
