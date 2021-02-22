using MediaLibrary.DAL.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
