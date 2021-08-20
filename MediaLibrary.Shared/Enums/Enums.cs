using System;
using System.Collections.Generic;
using System.Text;

namespace MediaLibrary.Shared
{
    public class Enums
    {
        public enum MediaTypes { Song = PlaylistTypes.Music, Podcast = PlaylistTypes.Podcast, Television = PlaylistTypes.Television }

        public enum PlaylistTypes { Music, Podcast, Television }

        public enum TransactionTypes : int
        {
            /* Tracks: 0 - 50 */
            GetTracks = 0, GetTrack = 1, AddTrack = 2, RemoveTrack = 3, ReplaceTrack = 4, GetTrackFile = 5,

            /* Albums: 51 - 100 */
            GetAlbums = 51, GetAlbum = 52, AddAlbum = 53, RemoveAlbum = 54, ReplaceAlbum = 55,

            /* Artists: 101 - 150 */
            GetArtists = 101, GetArtist = 102, AddArtist = 103, RemoveArtist = 104, ReplaceArtist = 105,

            /* Genres: 151 - 200 */
            GetGenres = 151, GetGenre = 152,

            /* Playlists: 201 - 250 */
            GetPlaylists = 201, GetPlaylist = 202, AddPlaylist = 203, RemovePlaylist = 204, ReplacePlaylist = 205, AddPlaylistSong = 206, AddPlaylistArtist = 207,
            AddPlaylistAlbum = 208, AddPlaylistPodcastItem = 209, AddPlaylistEpisode = 210,

            /* Podcasts: 251 - 300 */
            GetPodcasts = 251, GetPodcast = 252, AddPodcast = 253, RemovePodcast = 254, ReplacePodcast = 255, DownloadEpisode = 256, DownloadAllEpisodes = 257,
            GetPodcastItems = 258, RefreshPodcast = 259, GetPodcastFile = 260, RemoveEpisodeDownload = 261,

            /* Music: 301 - 350 */
            Read = 301, ResetData = 302, RefreshMusic = 303, RefreshMusicWithDelete = 304,

            /* Audit Logging */
            LogInfo = 901, LogWarn = 902, LogError = 903, LogObject = 904, LogTrace = 905, LogFatal = 906, LogDebug = 907, LogObjectUpdate = 908,

            None = -1
        }

        public enum TransactionStatus : int
        {
            Created,
            InProcess,
            Errored,
            Cancelled,
            Completed
        }

        public enum SongSort { AtoZ = 0, Album, Artist, DateAdded, Genre, None = -1 }

        public enum ArtistSort { AtoZ = 0, None = -1 }

        public enum AlbumSort { AtoZ = 0, None = -1 }

        public enum SeriesSort { AtoZ = 0 }

        public enum PodcastSort { LastUpdateDate = 0, AtoZ, DateAdded }

        public enum PodcastFilter { All = 0, Downloaded, Unplayed }

        public enum PlaylistSort { AtoZ = 0, DateAdded }

        public enum MusicTabs { Albums = 0, Artists, Songs }

        public enum MusicPages { Index = 0, Album, Artist, Search }

        public enum PlayerPages { Index = 0, Audio, Video }

        public enum PlaylistPages { Index = 0, Playlist }

        public enum PlaylistTabs { Music = PlaylistTypes.Music, Podcast = PlaylistTypes.Podcast, Television = PlaylistTypes.Television }

        public enum PodcastPages { Index = 0, Podcast }

        public enum TelevisionPages { Index = 0, Series }

        public enum MediaPages { Home = 0, Music, Playlist, Podcast, Player, Television, Settings }

        public enum RepeatTypes { None = 0, RepeatOne, RepeatAll }

        public enum AppWidth { Normal = 0, Wide}

        public enum SettingsTabs { General = 0, Music, Podcast, Television, Playlist, Player }
    }
}
