import BaseClass from "../../assets/models/base-class";
import MusicConfiguration from "../../assets/models/configurations/music-configuration";
import { MusicPages } from "../../assets/enums/enums";
import { MlCallback } from "../../assets/types/callback.type";

export default class Album extends BaseClass {
    constructor(private musicConfiguration: MusicConfiguration, private reload: MlCallback) {
        super();
    }

    initializeControls(): void {
        $('[data-back-button="album"]').on('click', () => this.goBack(this.reload));
    }

    loadAlbum(id: number, callback: MlCallback = () => null): void {
        this.musicConfiguration.properties.SelectedAlbumId = id;
        this.musicConfiguration.properties.SelectedMusicPage = MusicPages.Album;
        this.musicConfiguration.updateConfiguration()
            .then(() => callback());
    }

    private goBack(callback: MlCallback = () => null): void {
        this.musicConfiguration.properties.SelectedAlbumId = 0;
        this.musicConfiguration.properties.SelectedMusicPage = MusicPages.Index;
        this.musicConfiguration.updateConfiguration()
            .then(() => callback());
    }
}