import BaseClass from "../../assets/models/base-class";
import MusicConfiguration from "../../assets/models/configurations/music-configuration";
import { MusicPages } from "../../assets/enums/enums";
import HtmlControls from "../../assets/controls/html-controls";
import LoadingModal from "../../assets/modals/loading-modal";
import { loadHTML } from "../../assets/utilities/fetch_service";
import { MlCallback } from "../../assets/types/callback.type";

export default class Favorites extends BaseClass {
    constructor(private musicConfiguration: MusicConfiguration,
        private reload: MlCallback) {
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
};