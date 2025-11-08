using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;

namespace MediaLibrary.BLL.Services
{
    public class PlaylistService : IPlaylistService
    {
        private readonly IDataService dataService;

        public PlaylistService(IDataService dataService)
        {
            this.dataService = dataService;
        }
    }
}