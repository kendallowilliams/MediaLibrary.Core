using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.DAL.Models
{
    public partial class Transaction : IDataModel
    {
        public Transaction() : base()
        {
            Status = (int)TransactionStatus.Created;
            StatusMessage = TransactionStatus.Created.ToString();
            Type = (int)TransactionTypes.None;
        }

        public Transaction(TransactionTypes transactionType) : base()
        {
            Status = (int)TransactionStatus.Created;
            StatusMessage = TransactionStatus.Created.ToString();
            Type = (int)transactionType;
        }

        public TransactionTypes GetTransactionType() => (TransactionTypes)Type;
    }
}
