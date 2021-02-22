using MediaLibrary.DAL.Models;
using MediaLibrary.WebUI.Models.Configurations;
using MediaLibrary.WebUI.Repositories;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using static MediaLibrary.WebUI.UIEnums;

namespace MediaLibrary.WebUI.Models
{
    [Export]
    public class PlaylistViewModel : ViewModel<PlaylistConfiguration>
    {
        [ImportingConstructor]
        public PlaylistViewModel()
        {
            PlaylistGroups = Enumerable.Empty<IGrouping<string, Playlist>>();
            PlaylistSortItems = PlaylistRepository.GetPlaylistSortItems().Select(item => new SelectListItem { Text = item.Name, Value = item.Value.ToString() });
        }

        public Playlist SelectedPlaylist { get; set; }
        public IEnumerable<IGrouping<string, Playlist>> PlaylistGroups { get; set; }
        public IEnumerable<SelectListItem> PlaylistSortItems { get; }
        public IEnumerable<SelectListItem> PlaylistTabItems { get => Enum.GetValues(typeof(PlaylistTabs))
                                                                         .Cast<PlaylistTabs>()
                                                                         .Select(item => item.ToString())
                                                                         .Select(item => new SelectListItem { Text = item, Value = item }); }
    }
}