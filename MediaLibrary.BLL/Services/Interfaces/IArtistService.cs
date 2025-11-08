using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IArtistService
    {
        Task<int?> AddArtist(string artists, CancellationToken token = default);
    }
}
