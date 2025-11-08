using MediaLibrary.DAL.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IArtistJSON
    {
        [JsonIgnore]
        ICollection<Album> Albums { get; set; }
        [JsonIgnore]
        ICollection<Track> Tracks { get; set; }
    }
}
