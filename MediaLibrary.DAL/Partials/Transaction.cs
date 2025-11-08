using MediaLibrary.DAL.Models.Interfaces;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.DAL.Models
{
    public partial class Transaction : IDataModel
    {
        public TransactionStatus Status { get; set; }

        public TransactionTypes Type { get; set; }

        public Transaction() : base()
        {
            Status = TransactionStatus.Created;
            StatusMessage = TransactionStatus.Created.ToString();
            Type = TransactionTypes.None;
        }

        public Transaction(TransactionTypes transactionType) : base()
        {
            Status = TransactionStatus.Created;
            StatusMessage = TransactionStatus.Created.ToString();
            Type = transactionType;
        }
    }
}
