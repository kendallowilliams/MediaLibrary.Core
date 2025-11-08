using MediaLibrary.DAL.Models;
using Newtonsoft.Json;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IPlaylistTrackJSON
    {
        [JsonIgnore]
        Playlist Playlist { get; set; }
    }
}
