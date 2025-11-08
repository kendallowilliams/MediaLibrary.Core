using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly IDataService dataService;

        public AlbumService(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<int?> AddAlbum(Album album, CancellationToken token = default)
        {
            int? id = default(int?);

            if (album != null && !string.IsNullOrWhiteSpace(album.Title))
            {
                Album dbAlbum = await dataService.Get<Album>(item => item.Title == album.Title, token);

                if (dbAlbum != null) { id = dbAlbum.Id; }
                else
                {
                    await dataService.Insert(album, token);
                    id = album.Id;
                }
            }

            return id;
        }
    }
}