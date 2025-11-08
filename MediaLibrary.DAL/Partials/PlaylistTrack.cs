using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.DAL.Partials.Interfaces;

namespace MediaLibrary.DAL.Models
{
    public partial class PlaylistTrack : IDataModel, IPlaylistTrackJSON
    {
        public PlaylistTrack() { }
    }
}
