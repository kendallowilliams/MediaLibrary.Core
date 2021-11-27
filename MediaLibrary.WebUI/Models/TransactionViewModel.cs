using MediaLibrary.DAL.Models;
using MediaLibrary.Shared.Models.Configurations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Models
{
    public class TransactionViewModel
    {
        public TransactionViewModel()
        {
            Transactions = Enumerable.Empty<Transaction>();
        }

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }

        public TransactionTypes? TransactionType { get; set; }

        public IEnumerable<string> TransactionTypes { get => Enum.GetNames(typeof(TransactionTypes))
                                                                 .OrderBy(name => name)
                                                                 .Prepend(string.Empty); }

        public TransactionStatus? TransactionStatus { get; set; }

        public IEnumerable<string> TransactionStatuses { get => Enum.GetNames(typeof(TransactionStatus))
                                                                    .OrderBy(name => name)
                                                                    .Prepend(string.Empty); }

        public IEnumerable<Transaction> Transactions { get; set; }
    }
}