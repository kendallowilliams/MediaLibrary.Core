using MediaLibrary.Shared.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.Shared.Models.Configurations
{
    public class PodcastConfiguration : BaseConfiguration
    {
        public PodcastConfiguration()
        {
        }

        public int SelectedPodcastId { get; set; }
        public PodcastPages SelectedPodcastPage { get; set; }
        public PodcastSort SelectedPodcastSort { get; set; }
        public PodcastFilter SelectedPodcastFilter { get; set; }
        public DateTime LastAutoDownloadDate { get; set; }
    }
}