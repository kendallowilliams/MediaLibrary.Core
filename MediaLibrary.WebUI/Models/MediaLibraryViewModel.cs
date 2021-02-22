using MediaLibrary.DAL.Models;
using MediaLibrary.WebUI.Models.Configurations;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;

namespace MediaLibrary.WebUI.Models
{
    [Export]
    public class MediaLibraryViewModel : ViewModel<MediaLibraryConfiguration>
    {
        [ImportingConstructor]
        public MediaLibraryViewModel()
        {
            Playlists = Enumerable.Empty<Playlist>();
        }

        public IEnumerable<Playlist> Playlists { get; set; }
    }
}