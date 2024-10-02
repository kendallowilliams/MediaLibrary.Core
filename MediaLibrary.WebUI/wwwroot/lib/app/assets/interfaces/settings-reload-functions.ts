import { MlCallback } from "../types/callback.type";

export default interface ISettingsReloadFunctions {
    loadMusic: MlCallback,
    loadTelevision: MlCallback,
    loadPlayer: MlCallback,
    loadPodcast: MlCallback,
    loadPlaylist: MlCallback,
    clearNowPlaying: MlCallback,
    toggleAudioVisualizer: MlCallback
}