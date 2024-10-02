import { MlCallback } from "../types/callback.type";

export default interface IPlayerControlsFunctions {
    next: MlCallback,
    previous: MlCallback,
    skipForward: MlCallback,
    skipBackward: MlCallback,
    play: MlCallback,
    pause: MlCallback,
    setUnPlayedShuffleIds: MlCallback<boolean>,
    canPlayNext: MlCallback<void, boolean>,
    canPlayPrevious: MlCallback<void, boolean>,
    mutePlayers: MlCallback<boolean>,
    setPlayerVolume: MlCallback<number>,
    setCurrentTime: MlCallback<number>,
    getPlaybackTime: MlCallback<number, string>,
    updatePlayerProgress: MlCallback<number>,
    nowPlayingEmpty: MlCallback<void, boolean>,
    getPlayer: MlCallback<void, HTMLMediaElement>,
    toggleAudioVisualizer: MlCallback
}