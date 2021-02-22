using MediaLibrary.DAL.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IPlaylistPodcastItemJSON
    {
        [JsonIgnore]
        Playlist Playlist { get; set; }
    }
}
