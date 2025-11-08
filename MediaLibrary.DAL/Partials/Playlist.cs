using MediaLibrary.DAL.Models.Interfaces;
using Newtonsoft.Json;
using System;
using System.Linq;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.DAL.Models
{
    public partial class Playlist : IDataModel
    {
        public Playlist(string name) : base()
        {
            Name = name;
        }

        public PlaylistTypes Type { get; set; }

        [JsonIgnore]
        public string Description
        {
            get
            {
                string description = string.Empty;

                switch (Type)
                {
                    case PlaylistTypes.Music:
                        description = PlaylistTracks.Count() == 1 ? "1 song" : $"{PlaylistTracks.Count()} songs";
                        break;
                    case PlaylistTypes.Podcast:
                        description = PlaylistPodcastItems.Count() == 1 ? "1 episode" : $"{PlaylistPodcastItems.Count()} episodes";
                        break;
                    case PlaylistTypes.Television:
                        description = PlaylistEpisodes.Count() == 1 ? "1 episode" : $"{PlaylistEpisodes.Count()} episodes";
                        break;
                    default:
                        break;
                }

                return description;
            }
        }
    }
}
