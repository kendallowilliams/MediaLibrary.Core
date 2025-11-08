using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.WebUI.Models.Interfaces;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Models
{
    public class SettingsViewModel : IViewModel
    {
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
