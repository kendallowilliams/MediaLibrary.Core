using MediaLibrary.DAL.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IAlbumJSON
    {
        [JsonIgnore]
        Artist Artist { get; set; }
        [JsonIgnore]
        Genre Genre { get; set; }
        [JsonIgnore]
        ICollection<Track> Tracks { get; set; }
    }
}
