import HtmlControls from "../controls/html-controls";
import { getAlbumSortEnum, getAppWidthEnum, getArtistSortEnum,  getPlaylistSortEnum,  getPodcastFilterEnum,  getPodcastSortEnum,  getSeriesSortEnum,  getSongSortEnum } from "../enums/enum-functions";
import { MediaPages, MessageBoxConfirmType } from "../enums/enums";
import IConfigurations from "../interfaces/configurations-interface";
import ISettingsReloadFunctions from "../interfaces/settings-reload-functions";
import { fetch_post } from "../utilities/fetch_service";
import * as MessageBox from "../../assets/utilities/message-box";
import LoadingModal from "../../assets/modals/loading-modal";
import AddNewSongModal from "./add-song-modal";
import ManageDirectoriesModal from "./manage-directories-modal";

export default class SettingsModal {
    private modal: HTMLElement;
    private autoHideTimeOut: number;
    private addNewSongModal: AddNewSongModal;
    private manageDirectoriesModal: ManageDirectoriesModal;

    constructor(private configurations: IConfigurations, private settingsLoadFunctions: ISettingsReloadFunctions) {
        const tooltipsEnabled = () => this.configurations.MediaLibary.properties.TooltipsEnabled;

        this.modal = HtmlControls.Modals().SettingsModal;
        this.addNewSongModal = new AddNewSongModal(() => this.settingsLoadFunctions.loadMusic(),
            tooltipsEnabled,
            () => this.hide());
        this.manageDirectoriesModal = new ManageDirectoriesModal(() => this.settingsLoadFunctions.loadMusic(),
            tooltipsEnabled,
            () => this.hide());
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
            this.addNewSongModal.hide();
            this.manageDirectoriesModal.hide();

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

        $modalBody.find('[data-element-id="RootPath"]').on('click', e => {
            const $btn = $(e.currentTarget),
                path = $('#' + $btn.attr('data-element-id')).val() as string;

            this.configurations.Music.properties.RootPath = path;
            this.configurations.Music.updateConfiguration()
                .catch();
            this.autoCloseModal();
        });
        $modalBody.find('select[name="AppWidth"]').on('change', e => {
            const width = $(e.currentTarget).val() as string;

            this.configurations.MediaLibary.properties.AppWidth = getAppWidthEnum(width);
            this.configurations.MediaLibary.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('input[name="NavBarDelay"]').on('change', e => {
            const timeout = parseInt($(e.currentTarget).val() as string);

            this.configurations.MediaLibary.properties.NavBarDelay = timeout;
            this.configurations.MediaLibary.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('input[name="SettingsDelay"]').on('change', e => {
            const timeout = parseInt($(e.currentTarget).val() as string);

            this.configurations.MediaLibary.properties.SettingsDelay = timeout;
            this.configurations.MediaLibary.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('select[name="SelectedAlbumSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Music.properties.SelectedAlbumSort = getAlbumSortEnum(sort);
            this.configurations.Music.updateConfiguration()
                .then(() => this.settingsLoadFunctions.loadMusic());
            this.autoCloseModal();
        });
        $modalBody.find('select[name="SelectedArtistSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Music.properties.SelectedArtistSort = getArtistSortEnum(sort);
            this.configurations.Music.updateConfiguration()
                .then(() => this.settingsLoadFunctions.loadMusic());
            this.autoCloseModal();
        });
        $modalBody.find('select[name="SelectedSongSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Music.properties.SelectedSongSort = getSongSortEnum(sort);
            this.configurations.Music.updateConfiguration()
                .then(() => this.settingsLoadFunctions.loadMusic());
            this.autoCloseModal();
        });
        $modalBody.find('input[name="MaxSystemPlaylistItems"]').on('change', e => {
            const max = parseInt($(e.currentTarget).val() as string);

            this.configurations.Playlist.properties.MaxSystemPlaylistItems = max;
            this.configurations.Playlist.updateConfiguration()
                .then(() => this.settingsLoadFunctions.loadPlaylist());
            this.autoCloseModal();
        });
        $modalBody.find('input[name="SkipBackwardSeconds"]').on('change', e => {
            const seconds = parseInt($(e.currentTarget).val() as string);

            this.configurations.Player.properties.SkipBackwardSeconds = seconds;
            this.configurations.Player.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('input[name="SkipForwardSeconds"]').on('change', e => {
            const seconds = parseInt($(e.currentTarget).val() as string);

            this.configurations.Player.properties.SkipForwardSeconds = seconds;
            this.configurations.Player.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('input[name="ProgressUpdateInterval"]').on('change', e => {
            const seconds = parseInt($(e.currentTarget).val() as string);

            this.configurations.Player.properties.ProgressUpdateInterval = seconds;
            this.configurations.Player.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('input[name="AudioVisualizerBarCount"]').on('change', e => {
            const quantity = parseInt($(e.currentTarget).val() as string);

            this.configurations.Player.properties.AudioVisualizerBarCount = quantity;
            this.configurations.Player.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('input[name="TooltipsEnabled"]').on('change', e => {
            const enabled = (e.currentTarget as HTMLInputElement).checked;

            this.configurations.MediaLibary.properties.TooltipsEnabled = enabled;
            this.configurations.MediaLibary.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('select[name="SelectedSeriesSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Television.properties.SelectedSeriesSort = getSeriesSortEnum(sort);
            this.configurations.Television.updateConfiguration()
                .then(() => this.settingsLoadFunctions.loadTelevision());
            this.autoCloseModal();
        });
        $modalBody.find('select[name="SelectedTelevisionPlaylistSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Playlist.properties.SelectedTelevisionPlaylistSort = getPlaylistSortEnum(sort);
            this.configurations.Playlist.updateConfiguration()
                .then(() => this.settingsLoadFunctions.loadPlaylist());
            this.autoCloseModal();
        });
        $modalBody.find('select[name="SelectedPodcastPlaylistSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Playlist.properties.SelectedPodcastPlaylistSort = getPlaylistSortEnum(sort);
            this.configurations.Playlist.updateConfiguration()
                .then(() => this.settingsLoadFunctions.loadPlaylist());
            this.autoCloseModal();
        });
        $modalBody.find('select[name="SelectedMusicPlaylistSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Playlist.properties.SelectedMusicPlaylistSort = getPlaylistSortEnum(sort);
            this.configurations.Playlist.updateConfiguration()
                .then(() => this.settingsLoadFunctions.loadPlaylist());
            this.autoCloseModal();
        });
        $modalBody.find('select[name="SelectedPodcastSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Podcast.properties.SelectedPodcastSort = getPodcastSortEnum(sort);
            this.configurations.Podcast.updateConfiguration()
                .then(() => this.settingsLoadFunctions.loadPodcast());
            this.autoCloseModal();
        });
        $modalBody.find('select[name="SelectedPodcastFilter"]').on('change', e => {
            const filter = $(e.currentTarget).val() as string;

            this.configurations.Podcast.properties.SelectedPodcastFilter = getPodcastFilterEnum(filter);
            this.configurations.Podcast.updateConfiguration()
                .then(() => this.settingsLoadFunctions.loadPodcast());
            this.autoCloseModal();
        });

        $('[data-settings-action="refresh"]').on('click', e => {
            const title = 'Refresh Music',
                question = 'Do you want the refresh to delete missing/invalid files?',
                formData = new FormData(),
                yesCallback = () => {
                    LoadingModal.showLoading();
                    formData.set('deleteFiles', 'true');
                    fetch_post('Music/Refresh', formData)
                        .then(_ => this.settingsLoadFunctions.loadMusic());
                },
                noCallback = () => {
                    LoadingModal.showLoading();
                    fetch_post('Music/Refresh')
                        .then(_ => this.settingsLoadFunctions.loadMusic());
                };

            this.autoCloseModal();
            MessageBox.confirm(title, question, MessageBoxConfirmType.YesNoCancel, yesCallback, noCallback);
        });
    }

    private autoCloseModal(): void {
        const delay = this.configurations.MediaLibary.properties.SettingsDelay;

        if (delay > 0) {
            if (this.autoHideTimeOut) /*then*/ window.clearTimeout(this.autoHideTimeOut);
            this.autoHideTimeOut = window.setTimeout(this.hide, this.configurations.MediaLibary.properties.SettingsDelay * 1000);
        } else {
            this.hide();
        }
    }

    public hide(): void {
        $(this.modal).modal('hide');
    }
}