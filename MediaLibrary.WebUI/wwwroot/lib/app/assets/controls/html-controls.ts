export default {
    Views: () => ({
        HomeView: document.getElementById('home-view'),
        PlayerView: document.getElementById('player-view'),
        MediaView: document.getElementById('media-view'),
        PodcastView: document.getElementById('podcast-view'),
        SeasonView: document.getElementById('season-view'),
        SettingsView: document.getElementById('settings-view')
    }),
    Players: () => ({
        MusicPlayer: document.getElementById('music-player') as HTMLMediaElement,
        VideoPlayer: document.getElementById('video-player') as HTMLMediaElement
    }),
    Buttons: () => ({
        PlayerRepeatButton: document.getElementById('btn-player-repeat'),
        PlayerRepeatOneButton: document.getElementById('btn-player-repeat-one'),
        PlayerRepeatAllButton: document.getElementById('btn-player-repeat-all'),
        PlayerPlaylistToggleButton: document.getElementById('btn-player-playlist-toggle'),
        PlayerFullscreenButton: document.getElementById('btn-player-fullscreen'),
        PlayerClearButton: document.getElementById('btn-player-clear'),
        PlayerAudioVisualizerButton: document.getElementById('btn-audio-visualizer'),
        PlayerPlayButtons: document.getElementsByClassName(''),
        PlayerPauseButtons: document.getElementsByClassName(''),
        PlayerNextButtons: document.getElementsByClassName(''),
        PlayerPreviousButtons: document.getElementsByClassName(''),
        PlayerBackwardButtons: document.getElementsByClassName(''),
        PlayerForwardButtons: document.getElementsByClassName(''),
        PlayerShuffleButtons: document.getElementsByClassName(''),
        PlayerVolumeButtons: document.getElementsByClassName(''),
        PlayerMuteButtons: document.getElementsByClassName('')
    }),
    Containers: () => ({
        MainControlsContainer: document.getElementById('main-controls-container'),
        PlayerVideoContainer: document.getElementById('video-container'),
        PlayerAudioContainer: document.getElementById('audio-container'),
        PlayerItemsContainer: document.getElementById('player-items-container'),
        SongsContainer: document.getElementById('songs-container'),
        ArtistsContainer: document.getElementById('artists-container'),
        AlbumsContainer: document.getElementById('albums-container'),
        MusicPlaylistContainer: document.getElementById('music-playlist-container'),
        PodcastPlaylistContainer: document.getElementById('podcast-playlist-container'),
        EpisodePlaylistContainer: document.getElementById('episode-playlist-container'),
        SearchSongsContainer: document.getElementById('search-songs-container'),
        SearchArtistsContainer: document.getElementById('search-artists-container'),
        SearchAlbumsContainer: document.getElementById('search-albums-container'),
        GeneralSettingsContainer: document.getElementById('general-settings-container'),
        MusicSettingsContainer: document.getElementById('music-settings-container'),
        PlaylistSettingsContainer: document.getElementById('playlist-settings-container'),
        TelevisionSettingsContainer: document.getElementById('television-settings-container'),
        PodcastSettingsContainer: document.getElementById('podcast-settings-container'),
        PlayerSettingsContainer: document.getElementById('player-settings-container'),
        PlaylistListContainer: document.getElementById('playlist-list-container'),
        PlayerVolumeContainers: document.getElementsByClassName('')
    }),
    UIControls: () => ({
        AudioVisualizer: document.getElementById('audio-visualizer') as HTMLCanvasElement,
        MusicTabList: document.getElementById('music-tab-list'),
        PlaylistTabList: document.getElementById('playlist-tab-list'),
        SearchQuery: document.getElementById('search-query') as HTMLInputElement,
        PlayerSliders: document.getElementsByClassName(''),
        VolumeSliders: document.getElementsByClassName(''),
        PlayerTimes: document.getElementsByClassName('')
    }),
    UIFields: () => ({
        NowPlayingTitle: document.getElementById('player-title')
    }),
    Modals: () => ({
        NewPlaylistModal: document.getElementById('new-playlist-modal'),
        NewSongModal: document.getElementById('new-song-modal'),
        NewPodcastModal: document.getElementById('new-podcast-modal'),
        AddToPlaylistModal: document.getElementById('add-to-playlist-modal'),
        EdiPlaylistModal: document.getElementById('edit-playlist-modal'),
        EditSongModal: document.getElementById('edit-song-modal'),
        LoadingModal: document.getElementById('loading-modal'),
        DownloadM3UPlaylistModal: document.getElementById('download-m3u-playlist-modal'),
        ManageDirectoriesModal: document.getElementById('manage-directories-modal'),
        AlertModal: document.getElementById('alert-modal'),
        ErrorModal: document.getElementById('error-modal'),
        ConfirmModal: document.getElementById('confirm-modal'),
        WarningModal: document.getElementById('warning-modal')
    })
}