export default interface IPlayerControlsFunctions {
    next: () => void,
    previous: () => void,
    skipForward: () => void,
    skipBackward: () => void,
    play: () => void,
    pause: () => void,
    setUnPlayedShuffleIds: (shuffle: boolean) => void,
    canPlayNext: () => boolean,
    canPlayPrevious: () => boolean,
    mutePlayers: (muted: boolean) => void,
    setPlayerVolume: (volume: number) => void,
    setCurrentTime: (time: number) => void,
    getPlaybackTime: (time: number, duration: number) => string,
    updatePlayerProgress: (time: number) => void,
    nowPlayingEmpty: () => boolean
}