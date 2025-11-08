using MediaLibrary.DAL.Models;
using Newtonsoft.Json;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IPlaylistEpisodeJSON
    {
        [JsonIgnore]
        Playlist Playlist { get; set; }
    }
}
