using MediaLibrary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Models
{
    public class TransactionViewModel
    {
        public TransactionViewModel()
        {
            Transactions = Enumerable.Empty<Transaction>();
            SelectedTransactionStatuses = new TransactionStatus[0];
            SelectedTransactionTypes = new TransactionTypes[0];
        }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public TransactionTypes[] SelectedTransactionTypes { get; set; }

        public IEnumerable<string> TransactionTypes
        {
            get => Enum.GetNames(typeof(TransactionTypes))
                                                                 .OrderBy(name => name);
        }

        public TransactionStatus[] SelectedTransactionStatuses { get; set; }

        public IEnumerable<string> TransactionStatuses
        {
            get => Enum.GetNames(typeof(TransactionStatus))
                                                                    .OrderBy(name => name);
        }

        public IEnumerable<Transaction> Transactions { get; set; }
    }
}