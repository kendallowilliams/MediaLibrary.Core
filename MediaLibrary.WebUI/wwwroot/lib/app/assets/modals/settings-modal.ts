import HtmlControls from "../controls/html-controls";
import { getAlbumSortEnum, getAppWidthEnum, getArtistSortEnum,  getPlaylistSortEnum,  getSeriesSortEnum,  getSongSortEnum } from "../enums/enum-functions";
import { MediaPages } from "../enums/enums";
import IConfigurations from "../interfaces/configurations-interface";
import ISettingsReloadFunctions from "../interfaces/settings-reload-functions";

export default class SettingsModal {
    private modal: HTMLElement;

    constructor(private configurations: IConfigurations, private settingsLoadFunctions: ISettingsReloadFunctions) {
        this.modal = HtmlControls.Modals().SettingsModal;
        this.initializeControls();
    }

    private initializeControls(): void {
        const $modalBody = $(this.modal).find('.modal-body');

        $(this.modal).on('show.bs.modal', e => {
            const mediaPage = this.configurations.MediaLibary.properties.SelectedMediaPage,
                containers = HtmlControls.Containers(),
                settingsContainers = [containers.GeneralSettingsContainer,
                    containers.MusicSettingsContainer,
                    containers.PlayerSettingsContainer,
                    containers.PlaylistSettingsContainer,
                    containers.PodcastSettingsContainer,
                    containers.TelevisionSettingsContainer
                ];

            $(settingsContainers).addClass('d-none');

            if (mediaPage === MediaPages.Home) {
                $(containers.GeneralSettingsContainer).removeClass('d-none');
            } else if (mediaPage === MediaPages.Music) {
                $(containers.MusicSettingsContainer).removeClass('d-none');
            } else if (mediaPage === MediaPages.Player) {
                $(containers.PlayerSettingsContainer).removeClass('d-none');
            } else if (mediaPage === MediaPages.Playlist) {
                $(containers.PlaylistSettingsContainer).removeClass('d-none');
            } else if (mediaPage === MediaPages.Podcast) {
                $(containers.PodcastSettingsContainer).removeClass('d-none');
            } else if (mediaPage === MediaPages.Television) {
                $(containers.TelevisionSettingsContainer).removeClass('d-none');
            }
        });

        $modalBody.find('select[name="AppWidth"]').on('change', e => {
            const width = $(e.currentTarget).val() as string;

            this.configurations.MediaLibary.properties.AppWidth = getAppWidthEnum(width);
            this.configurations.MediaLibary.updateConfiguration();
        });
        $modalBody.find('input[name="NavBarTimeOut"]').on('change', e => {
            const timeout = parseInt($(e.currentTarget).val() as string);

            this.configurations.MediaLibary.properties.NavBarTimeOut = timeout;
            this.configurations.MediaLibary.updateConfiguration();
        });
        $modalBody.find('select[name="SelectedAlbumSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Music.properties.SelectedAlbumSort = getAlbumSortEnum(sort);
            this.configurations.Music.updateConfiguration(() => this.settingsLoadFunctions.loadMusic());
        });
        $modalBody.find('select[name="SelectedArtistSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Music.properties.SelectedArtistSort = getArtistSortEnum(sort);
            this.configurations.Music.updateConfiguration(() => this.settingsLoadFunctions.loadMusic());
        });
        $modalBody.find('select[name="SelectedSongSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Music.properties.SelectedSongSort = getSongSortEnum(sort);
            this.configurations.Music.updateConfiguration(() => this.settingsLoadFunctions.loadMusic());
        });
        $modalBody.find('input[name="MaxSystemPlaylistItems"]').on('change', e => {
            const max = parseInt($(e.currentTarget).val() as string);

            this.configurations.Playlist.properties.MaxSystemPlaylistItems = max;
            this.configurations.Playlist.updateConfiguration(() => this.settingsLoadFunctions.loadPlaylist());
        });
        $modalBody.find('input[name="SkipBackwardSeconds"]').on('change', e => {
            const seconds = parseInt($(e.currentTarget).val() as string);

            this.configurations.Player.properties.SkipBackwardSeconds = seconds;
            this.configurations.Player.updateConfiguration();
        });
        $modalBody.find('input[name="SkipForwardSeconds"]').on('change', e => {
            const seconds = parseInt($(e.currentTarget).val() as string);

            this.configurations.Player.properties.SkipForwardSeconds = seconds;
            this.configurations.Player.updateConfiguration();
        });
        $modalBody.find('input[name="ProgressUpdateInterval"]').on('change', e => {
            const seconds = parseInt($(e.currentTarget).val() as string);

            this.configurations.Player.properties.ProgressUpdateInterval = seconds;
            this.configurations.Player.updateConfiguration();
        });
        $modalBody.find('input[name="AudioVisualizerBarCount"]').on('change', e => {
            const quantity = parseInt($(e.currentTarget).val() as string);

            this.configurations.Player.properties.AudioVisualizerBarCount = quantity;
            this.configurations.Player.updateConfiguration();
        });
        $modalBody.find('input[name="TooltipsEnabled"]').on('change', e => {
            const enabled = (e.currentTarget as HTMLInputElement).checked;

            this.configurations.MediaLibary.properties.TooltipsEnabled = enabled;
            this.configurations.MediaLibary.updateConfiguration();
        });
        $modalBody.find('select[name="SelectedSeriesSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Television.properties.SelectedSeriesSort = getSeriesSortEnum(sort);
            this.configurations.Television.updateConfiguration(() => this.settingsLoadFunctions.loadTelevision());
        });
        $modalBody.find('select[name="SelectedTelevisionPlaylistSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Playlist.properties.SelectedTelevisionPlaylistSort = getPlaylistSortEnum(sort);
            this.configurations.Playlist.updateConfiguration(() => this.settingsLoadFunctions.loadPlaylist());
        });
        $modalBody.find('select[name="SelectedPodcastPlaylistSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Playlist.properties.SelectedPodcastPlaylistSort = getPlaylistSortEnum(sort);
            this.configurations.Playlist.updateConfiguration(() => this.settingsLoadFunctions.loadPlaylist());
        });
        $modalBody.find('select[name="SelectedMusicPlaylistSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Playlist.properties.SelectedMusicPlaylistSort = getPlaylistSortEnum(sort);
            this.configurations.Playlist.updateConfiguration(() => this.settingsLoadFunctions.loadPlaylist());
        });
    }
}