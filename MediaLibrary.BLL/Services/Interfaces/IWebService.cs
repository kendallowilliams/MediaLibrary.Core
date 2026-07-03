using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IWebService
    {
        Task<string> GetIpAddress();
        Task<byte[]> DownloadData(string address, CancellationToken token = default);
        Task<bool> DownloadFile(string address, string filename, CancellationToken token = default);
        bool IsPrivateIp(string ipAddress);
    }
}
