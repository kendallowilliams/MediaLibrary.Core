using MediaLibrary.DAL.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IPlaylistJSON
    {
        [JsonIgnore]
        ICollection<PlaylistTrack> PlaylistTracks { get; set; }
        [JsonIgnore]
        ICollection<PlaylistPodcastItem> PlaylistPodcastItems { get; set; }
        [JsonIgnore]
        ICollection<PlaylistEpisode> PlaylistEpisodes { get; set; }
    }
}
