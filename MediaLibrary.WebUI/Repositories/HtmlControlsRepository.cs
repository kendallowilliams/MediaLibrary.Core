using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaLibrary.WebUI.Repositories
{
    public class HtmlControlsRepository
    {
        #region View Ids
        public static string HomeViewId { get => "home-view"; }
        public static string PlayerViewId { get => "player-view"; }
        public static string MediaViewId { get => "media-view"; }
        public static string PodcastViewId { get => "podcast-view"; }
        public static string SeasonViewId { get => "season-view"; }
        public static string SettingsViewId { get => "settings-view"; }
        #endregion View Ids

        #region Player Ids
        public static string MusicPlayerId { get => "music-player"; }
        public static string VideoPlayerId { get => "video-player"; }
        #endregion Player Ids

        #region Button Ids
        public static string PlayerPlayButtonId { get => "btn-player-play"; }
        public static string PlayerPreviousButtonId { get => "btn-player-previous"; }
        public static string PlayerBackwardButtonId { get => "btn-player-backward"; }
        public static string PlayerForwardButtonId { get => "btn-player-forward"; }
        public static string PlayerNextButtonId { get => "btn-player-next"; }
        public static string PlayerPauseButtonId { get => "btn-player-pause"; }
        public static string PlayerShuffleButtonId { get => "btn-player-shuffle"; }
        public static string PlayerRepeatButtonId { get => "btn-player-repeat"; }
        public static string PlayerRepeatOneButtonId { get => "btn-player-repeat-one"; }
        public static string PlayerRepeatAllButtonId { get => "btn-player-repeat-all"; }
        public static string PlayerPlaylistToggleButtonId { get => "btn-player-playlist-toggle"; }
        public static string PlayerVolumeButtonId { get => "btn-player-volume"; }
        public static string PlayerMuteButtonId { get => "btn-player-mute"; }
        public static string PlayerFullscreenButtonId { get => "btn-player-fullscreen"; }
        public static string PlayerClearButtonId { get => "btn-player-clear"; }
        public static string PlayerAudioVisualizerButtonId { get => "btn-audio-visualizer"; }
        #endregion Button Ids

        #region Container Ids
        public static string PlayerVideoContainerId { get => "video-container"; }
        public static string PlayerAudioContainerId { get => "audio-container"; }
        public static string PlayerItemsContainerId { get => "player-items-container"; }
        public static string PlayerVolumeContainerId { get => "player-volume-container"; }
        public static string SongsContainerId { get => "songs-container"; }
        public static string ArtistsContainerId { get => "artists-container"; }
        public static string AlbumsContainerId { get => "albums-container"; }
        public static string MusicPlaylistContainerId { get => "music-playlist-container"; }
        public static string PodcastPlaylistContainerId { get => "podcast-playlist-container"; }
        public static string EpisodePlaylistContainerId { get => "episode-playlist-container"; }
        public static string SearchSongsContainerId { get => "search-songs-container"; }
        public static string SearchArtistsContainerId { get => "search-artists-container"; }
        public static string SearchAlbumsContainerId { get => "search-albums-container"; }
        public static string GeneralSettingsContainerId { get => "general-settings-container"; }
        public static string MusicSettingsContainerId { get => "music-settings-container"; }
        public static string PlaylistSettingsContainerId { get => "playlist-settings-container"; }
        public static string TelevisionSettingsContainerId { get => "television-settings-container"; }
        public static string PodcastSettingsContainerId { get => "podcast-settings-container"; }
        public static string PlayerSettingsContainerId { get => "player-settings-container"; }
        public static string PlaylistListContainerId { get => "playlist-list-container"; }
        public static string MainControlsContainerId { get => "main-controls-container"; }
        #endregion Container Ids

        #region UI Control Ids
        public static string PlayerSliderId { get => "player-slider"; }
        public static string VolumeSliderId { get => "volume-slider"; }
        public static string PlayerTimeId { get => "player-time"; }
        public static string AudioVisualizerId { get => "audio-visualizer"; }
        public static string MusicTabListId { get => "music-tab-list"; }
        public static string PlaylistTabListId { get => "playlist-tab-list"; }
        public static string SearchQueryId { get => "search-query"; }
        #endregion UI Control Ids

        #region UI Field Ids
        public static string NowPlayingTitleId { get => "player-title"; }
        #endregion UI Field Ids

        #region Modal Ids
        public static string NewPlaylistModalId { get => "new-playlist-modal"; }
        public static string NewSongModalId { get => "new-song-modal"; }
        public static string NewPodcastModalId { get => "new-podcast-modal"; }
        public static string AddToPlaylistModalId { get => "add-to-playlist-modal"; }
        public static string DeleteModalId { get => "delete-modal"; }
        public static string EdiPlaylistModalId { get => "edit-playlist-modal"; }
        public static string EditSongModalId { get => "edit-song-modal"; }
        public static string LoadingModalId { get => "loading-modal"; }
        public static string ClearNowPlayingModalId { get => "clear-now-playing-modal"; }
        public static string DownloadM3UPlaylistModalId { get => "download-m3u-playlist-modal"; }
        public static string ManageDirectoriesModalId { get => "manage-directories-modal"; }
        public static string ErrorModalId { get => "error-modal"; }
        public static string ConfirmModalId { get => "confirm-modal"; }
        public static string AlertModalId { get => "alert-modal"; }
        public static string WarningModalId { get => "warning-modal"; }
        #endregion Modal Ids
    }
}