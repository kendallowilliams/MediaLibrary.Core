using MediaLibrary.DAL.Models;
using MediaLibrary.Shared.Models.Configurations;
using System.Collections.Generic;
using System.Linq;

namespace MediaLibrary.WebUI.Models
{
    public class MediaLibraryViewModel : ViewModel<MediaLibraryConfiguration>
    {
        public MediaLibraryViewModel()
        {
            Playlists = Enumerable.Empty<Playlist>();
        }

        public IEnumerable<Playlist> Playlists { get; set; }
    }
}