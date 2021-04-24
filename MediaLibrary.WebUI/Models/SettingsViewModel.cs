using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.WebUI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Models
{
    [Export, PartCreationPolicy(CreationPolicy.NonShared)]
    public class SettingsViewModel : IViewModel
    {
        [ImportingConstructor]
        public SettingsViewModel()
        {
            CurrentSettingsTab = SettingsTabs.General;
        }

        public SettingsTabs CurrentSettingsTab { get; set; }
        public MediaLibraryConfiguration MediaLibraryConfiguration { get; set; }
        public HomeConfiguration HomeConfiguration { get; set; }
        public MusicConfiguration MusicConfiguration { get; set; }
        public PlayerConfiguration PlayerConfiguration { get; set; }
        public PlaylistConfiguration PlaylistConfiguration { get; set; }
        public PodcastConfiguration PodcastConfiguration { get; set; }
        public TelevisionConfiguration TelevisionConfiguration { get; set; }
    }
}
