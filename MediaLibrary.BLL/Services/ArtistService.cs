using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services
{
    public class ArtistService : IArtistService
    {
        private readonly IDataService dataService;

        public ArtistService(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<int?> AddArtist(string strArtists, CancellationToken token = default)
        {
            int? id = default(int?);

            if (!string.IsNullOrWhiteSpace(strArtists))
            {
                object parameters = new { name = strArtists };
                Artist artist = new Artist(strArtists);
                Artist dbArtist = await dataService.Get<Artist>(item => item.Name == strArtists, token);

                if (dbArtist != null) { id = dbArtist.Id; }
                else
                {
                    await dataService.Insert(artist, token);
                    id = artist.Id;
                }
            }

            return id;
        }
    }
}