using MediaLibrary.DAL.Models;
using MediaLibrary.WebUI.Models.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaLibrary.WebUI.Services.Interfaces
{
    public interface IPlaylistUIService
    {
        Task<IEnumerable<IGrouping<string, Playlist>>> GetPlaylistGroups(PlaylistConfiguration configuration);
        Task<IEnumerable<Playlist>> GetSystemPlaylists(bool includeItems = false, bool includeReferences = false);
    }
}
