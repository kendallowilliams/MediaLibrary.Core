import BaseClass from "../../assets/models/base-class";
import IView from "../../assets/interfaces/view-interface";
import HtmlControls from '../../assets/controls/html-controls';
import IConfigurations from "../../assets/interfaces/configurations-interface";
import { getAlbumSortEnum, getAppWidthEnum, getArtistSortEnum, getSongSortEnum } from "../../assets/enums/enum-functions";

export default class Settings extends BaseClass implements IView {
    private settingsView: HTMLElement;

    constructor(private configurations: IConfigurations) {
        super();
        this.settingsView = HtmlControls.Views().SettingsView;
    }

    loadView(callback: () => void = () => null): void {
        const url = $(this.settingsView).attr('data-action-url');

        $(this.settingsView).load(url, () => {
            this.initializeControls();
            callback();
        });
    }

    private initializeControls(): void {
        $(this.settingsView).find('select[name="AppWidth"]').on('change', e => {
            const width = $(e.currentTarget).val() as string;

            this.configurations.MediaLibary.properties.AppWidth = getAppWidthEnum(width);
            this.configurations.MediaLibary.updateConfiguration();
        });
        $(this.settingsView).find('select[name="SelectedAlbumSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Music.properties.SelectedAlbumSort = getAlbumSortEnum(sort);
            this.configurations.Music.updateConfiguration();
        });
        $(this.settingsView).find('select[name="SelectedArtistSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Music.properties.SelectedArtistSort = getArtistSortEnum(sort);
            this.configurations.Music.updateConfiguration();
        });
        $(this.settingsView).find('select[name="SelectedSongSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Music.properties.SelectedSongSort = getSongSortEnum(sort);
            this.configurations.Music.updateConfiguration();
        });
        $(this.settingsView).find('input[name="MaxSystemPlaylistItems"]').on('change', e => {
            const max = $(e.currentTarget).val() as number;

            this.configurations.Playlist.properties.MaxSystemPlaylistItems = max;
            this.configurations.Playlist.updateConfiguration();
        });
    }
}