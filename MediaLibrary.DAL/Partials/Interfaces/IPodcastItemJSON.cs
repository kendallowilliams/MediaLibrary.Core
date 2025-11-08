using MediaLibrary.DAL.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IPodcastItemJSON
    {
        [JsonIgnore]
        Podcast Podcast { get; set; }
        [JsonIgnore]
        ICollection<PlaylistPodcastItem> PlaylistPodcastItems { get; set; }
    }
}
