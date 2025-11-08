using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.DAL.Partials.Interfaces;

namespace MediaLibrary.DAL.Models
{
    public partial class Track : IPlayableItem, ITrackJSON
    {
        public Track(MediaData data, int? pathId, int? genreId, int? albumId, int? artistId) : base()
        {
            Title = data.Title;
            FileName = data.FileName;
            PathId = pathId;
            AlbumId = albumId;
            GenreId = genreId;
            ArtistId = artistId;
            Position = (int)data.Track;
            Year = (int)data.Year;
            Duration = (decimal)data.Duration;
            PlayCount = 0;
        }
    }
}
