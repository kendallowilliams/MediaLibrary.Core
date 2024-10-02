import { MlCallback } from "../types/callback.type";

export default interface IPlayerLoadFunctions {
    loadArtist: MlCallback<number>,
    loadAlbum: MlCallback<number>,
    loadPodcast: MlCallback<number>,
    loadSeries: MlCallback<number>
}