using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.DAL.Enums;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface ILogService
    {
        Task Log(TransactionTypes transactionType, string message);
    }
}
