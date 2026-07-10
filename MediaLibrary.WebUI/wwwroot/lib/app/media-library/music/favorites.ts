import BaseClass from "../../assets/models/base-class";
import MusicConfiguration from "../../assets/models/configurations/music-configuration";
import { MusicPages } from "../../assets/enums/enums";
import HtmlControls from "../../assets/controls/html-controls";
import LoadingModal from "../../assets/modals/loading-modal";
import { loadHTML } from "../../assets/utilities/fetch_service";
import { MlCallback } from "../../assets/types/callback.type";

export default class Favorites extends BaseClass {
    constructor(private musicConfiguration: MusicConfiguration,
        private reload: MlCallback,
        private playFunc: MlCallback<HTMLButtonElement | boolean>,
        private loadAlbum: MlCallback<number | MlCallback>,
        private loadArtist: MlCallback<number | MlCallback>,
        private updateActiveMediaFunc: MlCallback = () => null,
        private toggleDarkMode: MlCallback = () => null,
        private initializeSongOptions: MlCallback<HTMLElement>,
        private initializeAlbumOptions: MlCallback<HTMLElement>,
        private initializeArtistOptions: MlCallback<HTMLElement>) {
        super();
    }

    initializeControls(): void {
        $('[data-back-button="favorites"]').on('click', () => {
            this.musicConfiguration.updateConfiguration()
                .then(() => this.goBack(this.reload));
        });
    }

    loadFavorites(callback: MlCallback = () => null): void {
        this.musicConfiguration.properties.SelectedMusicPage = MusicPages.Favorites;
        this.musicConfiguration.updateConfiguration()
            .then(() => callback());
    }

    private goBack(callback: MlCallback = () => null): void {
        this.musicConfiguration.properties.SelectedMusicPage = MusicPages.Index;
        this.musicConfiguration.updateConfiguration()
            .then(() => callback());
    }

    private _loadAlbum(id: number) {
        LoadingModal.showLoading();
        this.musicConfiguration.properties.PreviousSearchQuery = '';
        this.musicConfiguration.updateConfiguration()
            .then(() => {
            this.loadAlbum(id, this.reload);
            LoadingModal.hideLoading();
        });
    }

    private _loadArtist(id: number) {
        LoadingModal.showLoading();
        this.musicConfiguration.properties.PreviousSearchQuery = '';
        this.musicConfiguration.updateConfiguration()
            .then(() => {
            this.loadArtist(id, this.reload);
            LoadingModal.hideLoading();
        });
    }
};