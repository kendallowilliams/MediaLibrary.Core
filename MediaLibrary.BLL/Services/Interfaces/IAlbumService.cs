using MediaLibrary.DAL.Models;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IAlbumService
    {
        Task<int?> AddAlbum(Album album, CancellationToken token = default);
    }
}
