using System.Collections.Generic;
using System.Linq;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.Shared.Models.Configurations
{
    public class MusicConfiguration : BaseConfiguration
    {
        public MusicConfiguration()
        {
            MusicPaths = Enumerable.Empty<string>();
        }

        public int SelectedAlbumId { get; set; }
        public int SelectedArtistId { get; set; }
        public AlbumSort SelectedAlbumSort { get; set; }
        public ArtistSort SelectedArtistSort { get; set; }
        public SongSort SelectedSongSort { get; set; }
        public MusicTabs SelectedMusicTab { get; set; }
        public MusicPages SelectedMusicPage { get; set; }
        public string PreviousSearchQuery { get; set; }
        public IEnumerable<string> MusicPaths { get; set; }
    }
}