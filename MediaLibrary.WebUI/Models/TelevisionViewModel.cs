using MediaLibrary.DAL.Models;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.WebUI.Repositories;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaLibrary.WebUI.Models
{
    public class TelevisionViewModel : ViewModel<TelevisionConfiguration>
    {
        public TelevisionViewModel()
        {
            SeriesGroups = Enumerable.Empty<IGrouping<string, Series>>();
            SeriesSortItems = TelevisionRepository.GetSeriesSortItems().Select(item => new SelectListItem { Text = item.Name, Value = item.Value.ToString() });
        }

        public Series SelectedSeries { get; set; }
        public IEnumerable<IGrouping<string, Series>> SeriesGroups { get; set; }
        public IEnumerable<SelectListItem> SeriesSortItems { get; }
        public int MinimumNumberOfSeasons { get => 5; }
        public bool HasPlaylists { get; set; }
    }
}