export default interface ISettingsReloadFunctions {
    loadMusic: () => void,
    loadTelevision: () => void,
    loadPlayer: () => void,
    loadPodcast: () => void,
    loadPlaylist: () => void,
    clearNowPlaying: () => void,
    toggleAudioVisualizer: () => void
}