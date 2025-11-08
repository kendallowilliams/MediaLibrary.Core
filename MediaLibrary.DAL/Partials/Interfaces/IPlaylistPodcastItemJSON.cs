using MediaLibrary.DAL.Models;
using Newtonsoft.Json;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IPlaylistPodcastItemJSON
    {
        [JsonIgnore]
        Playlist Playlist { get; set; }
    }
}
