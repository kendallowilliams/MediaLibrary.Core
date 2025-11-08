using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.Shared.Models.Configurations
{
    public class PlaylistConfiguration : BaseConfiguration
    {
        public PlaylistConfiguration()
        {
            MaxSystemPlaylistItems = 25;
        }

        public int MaxSystemPlaylistItems { get; set; }
        public int SelectedPlaylistId { get; set; }
        public PlaylistPages SelectedPlaylistPage { get; set; }
        public PlaylistSort SelectedMusicPlaylistSort { get; set; }
        public PlaylistSort SelectedPodcastPlaylistSort { get; set; }
        public PlaylistSort SelectedTelevisionPlaylistSort { get; set; }
        public PlaylistTabs SelectedPlaylistTab { get; set; }
    }
}