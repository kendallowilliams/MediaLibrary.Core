using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IWebService
    {
        Task<byte[]> DownloadData(string address, CancellationToken token = default);
        Task<bool> DownloadFile(string address, string filename, CancellationToken token = default);
    }
}
