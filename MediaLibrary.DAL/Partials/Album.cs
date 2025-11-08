using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.DAL.Partials.Interfaces;

namespace MediaLibrary.DAL.Models
{
    public partial class Album : IDataModel, IAlbumJSON
    {
        public Album(string title) : base()
        {
            Id = default(int);
            Title = title;
            ArtistId = default(int);
            GenreId = default(int);
        }

        public Album(int id, string title) : base()
        {
            Id = id;
            Title = title;
            ArtistId = default(int);
            GenreId = default(int);
        }

        public Album(MediaData data, int? artistId, int? genreId) : base()
        {
            Title = data.Album;
            ArtistId = artistId;
            GenreId = genreId;
            Year = (int)data.Year;
        }
    }
}
