using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface ITrackService
    {
        Task<int?> AddPath(string location, CancellationToken token = default);
    }
}
