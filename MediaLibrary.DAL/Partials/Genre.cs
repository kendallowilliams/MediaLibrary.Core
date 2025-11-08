using MediaLibrary.DAL.Models.Interfaces;

namespace MediaLibrary.DAL.Models
{
    public partial class Genre : IDataModel
    {
        public Genre(string name) : base()
        {
            Name = name;
        }

        public Genre(int id, string name) : base()
        {
            Id = id;
            Name = name;
        }
    }
}
