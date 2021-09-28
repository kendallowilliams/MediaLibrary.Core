using MediaLibrary.DAL.Models;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.WebUI.Repositories;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Models
{
    public class PodcastViewModel : ViewModel<PodcastConfiguration>
    {
        public PodcastViewModel()
        {
            PodcastGroups = Enumerable.Empty<IGrouping<string, Podcast>>();
            PodcastItems = Enumerable.Empty<PodcastItem>();
            PodcastSortItems = PodcastRepository.GetPodcastSortItems().Select(item => new SelectListItem { Text = item.Name, Value = item.Value.ToString() });
            PodcastFilterItems = PodcastRepository.GetPodcastFilterItems().Select(item => new SelectListItem { Text = item.Name, Value = item.Value.ToString() });
        }

        public IEnumerable<IGrouping<string, Podcast>> PodcastGroups { get; set; }
        public Podcast SelectedPodcast { get; set; }
        public IEnumerable<PodcastItem> PodcastItems { get; set; }
        public IEnumerable<SelectListItem> PodcastSortItems { get; }
        public IEnumerable<SelectListItem> PodcastFilterItems { get; }
        public bool HasPlaylists { get; set; }
    }
}