using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.Shared.Models.Configurations
{
    public class PlayerConfiguration : BaseConfiguration
    {
        public PlayerConfiguration()
        {
            AutoPlay = true;
            Repeat = RepeatTypes.None;
            SelectedPlayerPage = PlayerPages.Index;
            Volume = 100;
            SkipForwardSeconds = SkipBackwardSeconds = 15;
            NowPlayingList = new List<ListItem<int, int>>();
            ProgressUpdateInterval = 5;
            AudioVisualizerBarCount = 128;
            NowPlayingLists = new List<KeyValuePair<MediaTypes, IEnumerable<int>>>();
        }

        public MediaTypes SelectedMediaType { get; set; }

        public int CurrentItemIndex { get; set; }

        public bool AutoPlay { get; set; }

        public RepeatTypes Repeat { get; set; }

        public bool Shuffle { get; set; }

        public PlayerPages SelectedPlayerPage { get; set; }

        public int Volume { get; set; }

        public bool Muted { get; set; }

        public bool AudioVisualizerEnabled { get; set; }

        public int SkipForwardSeconds { get; set; }

        public int SkipBackwardSeconds { get; set; }

        /// <summary>
        /// List of items in now playing list
        /// Id: indicates the index of an item in the list; necessary in case duplicates exist to maintain their order
        /// </summary>
        public IList<ListItem<int, int>> NowPlayingList { get; set; }

        public IList<KeyValuePair<MediaTypes, IEnumerable<int>>> NowPlayingLists { get; set; }

        public int ProgressUpdateInterval { get; set; }

        public int AudioVisualizerBarCount { get; set; }
    }
}