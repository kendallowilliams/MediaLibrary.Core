using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.DAL.Partials.Interfaces;

namespace MediaLibrary.DAL.Models
{
    public partial class Artist : IDataModel, IArtistJSON
    {
        public Artist(string name) : base()
        {
            Name = name;
        }

        public Artist(int id, string name) : base()
        {
            Id = id;
            Name = name;
        }
    }
}
