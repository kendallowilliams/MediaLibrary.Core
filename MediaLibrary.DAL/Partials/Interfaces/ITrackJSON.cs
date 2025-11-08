using MediaLibrary.DAL.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface ITrackJSON
    {
        [JsonIgnore]
        ICollection<PlaylistTrack> PlaylistTracks { get; set; }
    }
}
