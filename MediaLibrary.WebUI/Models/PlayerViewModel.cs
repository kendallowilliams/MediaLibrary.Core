using MediaLibrary.DAL.Models;
using MediaLibrary.Shared.Models.Configurations;
using System.Collections.Generic;

namespace MediaLibrary.WebUI.Models
{
    public class PlayerViewModel : ViewModel<PlayerConfiguration>
    {
        public PlayerViewModel() { }

        public IEnumerable<Track> Songs { get; set; }

        public IEnumerable<PodcastItem> PodcastItems { get; set; }

        public IEnumerable<Episode> Episodes { get; set; }

        public int NumberOfSecondsBeforeRestart { get => 5; }
    }
}