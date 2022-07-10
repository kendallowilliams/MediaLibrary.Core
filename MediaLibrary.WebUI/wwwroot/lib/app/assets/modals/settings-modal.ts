import HtmlControls from "../controls/html-controls";
import { getAlbumSortEnum, getAppWidthEnum, getArtistSortEnum, getPlaylistSortEnum, getPodcastFilterEnum, getPodcastSortEnum, getSeriesSortEnum, getSongSortEnum } from "../enums/enum-functions";
import { MediaPages, MediaTypes, MessageBoxConfirmType, PodcastPages } from "../enums/enums";
import IConfigurations from "../interfaces/configurations-interface";
import ISettingsReloadFunctions from "../interfaces/settings-reload-functions";
import { fetch_get, fetch_post } from "../utilities/fetch_service";
import * as MessageBox from "../../assets/utilities/message-box";
import LoadingModal from "../../assets/modals/loading-modal";
import AddNewSongModal from "./add-song-modal";
import ManageDirectoriesModal from "./manage-directories-modal";
import StringList from "../controls/string-list";
import AddNewPodcastModal from "./add-podcast-modal";

export default class SettingsModal {
    private modal: HTMLElement;
    private autoHideTimeOut: number;
    private addNewSongModal: AddNewSongModal;
    private manageDirectoriesModal: ManageDirectoriesModal;
    private stringList: StringList;
    private addNewPodcastModal: AddNewPodcastModal;

    constructor(private configurations: IConfigurations, private settingsLoadFunctions: ISettingsReloadFunctions) {
        const tooltipsEnabled = () => this.configurations.MediaLibrary.properties.TooltipsEnabled;

        this.modal = HtmlControls.Modals().SettingsModal;
        this.addNewSongModal = new AddNewSongModal(() => this.settingsLoadFunctions.loadMusic(),
            tooltipsEnabled,
            () => this.hide());
        this.manageDirectoriesModal = new ManageDirectoriesModal(() => this.settingsLoadFunctions.loadMusic(),
            tooltipsEnabled,
            () => this.hide());
        this.addNewPodcastModal = new AddNewPodcastModal(() => this.settingsLoadFunctions.loadPodcast());
        this.initializeControls();
        this.toggleGlobalDarkMode();
    }

    private initializeControls(): void {
        const $modalBody = $(this.modal).find('.modal-body'),
            stringListElement = $modalBody.find('.string-list').get(0),
            buttons = HtmlControls.Buttons();

        this.stringList = new StringList(stringListElement,
            this.configurations.Music.properties.MusicPaths,
            (list: string[], hasChanged: boolean) => this.updateMusicPaths(list, hasChanged),
            (list: string[], hasChanged: boolean) => this.updateMusicPaths(list, hasChanged),
            item => this.checkPathValid(item),
            item => this.musicPathInUse(item).then(inUse => !inUse));
        $(this.modal).on('show.bs.modal', e => {
            const mediaPage = this.configurations.MediaLibrary.properties.SelectedMediaPage,
                containers = HtmlControls.Containers(),
                settingsContainers = [
                    containers.GeneralSettingsContainer,
                    containers.MusicSettingsContainer,
                    containers.PlayerSettingsContainer,
                    containers.PlaylistSettingsContainer,
                    containers.PodcastSettingsContainer,
                    containers.TelevisionSettingsContainer
                ],
                mediaType = this.configurations.Player.properties.SelectedMediaType;

            this.configurations.MediaLibrary.refresh()
                .then(() => {
                    const lastRunDate = new Date(this.configurations.MediaLibrary.properties.ConsoleAppLastRunTimeStamp);

                    $modalBody.find('input[name="ConsoleAppLastRunTimeStamp"]').val(lastRunDate.toLocaleString());
                });
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
        $modalBody.find('select[name="AppWidth"]').on('change', e => {
            const width = $(e.currentTarget).val() as string;

            this.configurations.MediaLibrary.properties.AppWidth = getAppWidthEnum(width);
            this.configurations.MediaLibrary.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('input[name="NavBarDelay"]').on('change', e => {
            const timeout = parseInt($(e.currentTarget).val() as string);

            this.configurations.MediaLibrary.properties.NavBarDelay = timeout;
            this.configurations.MediaLibrary.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('input[name="SettingsDelay"]').on('change', e => {
            const timeout = parseInt($(e.currentTarget).val() as string);

            this.configurations.MediaLibrary.properties.SettingsDelay = timeout;
            this.configurations.MediaLibrary.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('input[name="ConsoleAppRunInterval"]').on('change', e => {
            const interval = parseInt($(e.currentTarget).val() as string);

            this.configurations.MediaLibrary.properties.ConsoleAppRunInterval = interval;
            this.configurations.MediaLibrary.updateConfiguration();
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

            this.configurations.MediaLibrary.properties.TooltipsEnabled = enabled;
            this.configurations.MediaLibrary.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('input[name="DarkMode"]').on('change', e => {
            const enabled = (e.currentTarget as HTMLInputElement).checked;

            this.configurations.MediaLibrary.properties.DarkMode = enabled;
            this.configurations.MediaLibrary.updateConfiguration()
                .then(() => this.toggleGlobalDarkMode());
            this.autoCloseModal();
        });
        $modalBody.find('input[name="KeysEnabled"]').on('change', e => {
            const enabled = (e.currentTarget as HTMLInputElement).checked;

            this.configurations.MediaLibrary.properties.KeysEnabled = enabled;
            this.configurations.MediaLibrary.updateConfiguration();
            this.autoCloseModal();
        });
        $modalBody.find('select[name="SelectedSeriesSort"]').on('change', e => {
            const sort = $(e.currentTarget).val() as string;

            this.configurations.Television.properties.SelectedSeriesSort = getSeriesSortEnum(sort);
            this.configurations.Television.updateConfiguration()
                .then(() => this.settingsLoadFunctions.loadTelevision());
            this.autoCloseModal();
        });
        $modalBody.find('input[name="FilePath"]').on('change', e => {
            const path = $(e.currentTarget).val() as string;

            this.configurations.Television.properties.FilePath = path;
            this.configurations.Television.updateConfiguration();
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

        $('[data-music-settings-action="refresh"]').on('click', e => {
            const title = 'Refresh Music',
                question = 'Do you want the refresh to delete missing/invalid files?',
                formData = new FormData(),
                clearNowPlaying = () => {
                    if (this.configurations.Player.properties.SelectedMediaType === MediaTypes.Song) /*then*/ this.settingsLoadFunctions.clearNowPlaying();
                },
                yesCallback = () => {
                    LoadingModal.showLoading();
                    clearNowPlaying();
                    formData.set('deleteFiles', 'true');
                    fetch_post('Music/Refresh', formData)
                        .then(_ => this.settingsLoadFunctions.loadMusic());
                },
                noCallback = () => {
                    LoadingModal.showLoading();
                    clearNowPlaying();
                    fetch_post('Music/Refresh')
                        .then(_ => this.settingsLoadFunctions.loadMusic());
                };

            this.autoCloseModal();
            MessageBox.confirm(title, question, MessageBoxConfirmType.YesNoCancel, yesCallback, noCallback);
        });

        $('[data-podcast-settings-action="refresh"]').on('click', e => {
            const isIndexPage = this.configurations.Podcast.properties.SelectedPodcastPage === PodcastPages.Index,
                selectedPodcastId = this.configurations.Podcast.properties.SelectedPodcastId,
                formData = new FormData(),
                success = () => {
                    LoadingModal.hideLoading();
                };

            LoadingModal.showLoading();
            if (isIndexPage) {
                fetch_post('Podcast/Refresh')
                    .then(_ => success());
            } else if (selectedPodcastId > 0) {
                formData.append('id', selectedPodcastId.toString());
                fetch_post('Podcast/Refresh', formData)
                    .then(_ => success());
            }

            this.autoCloseModal();
        });

        $('[data-podcast-settings-action="add"]').on('click', e => {
            this.autoCloseModal();
            this.addNewPodcastModal.show();
        });

        $('[data-television-settings-action="refresh"]').on('click', e => {
            LoadingModal.showLoading();
            if (this.configurations.Player.properties.SelectedMediaType === MediaTypes.Television) /*then*/ this.settingsLoadFunctions.clearNowPlaying();
            fetch_post('Television/Refresh')
                .then(_ => this.settingsLoadFunctions.loadTelevision())
                .then(() => LoadingModal.hideLoading());
            this.autoCloseModal();
        });

        $(buttons.PlayerClearButton).on('click', e => {
            const title = 'Clear now playing',
                message = 'Are you sure you want to clear now playing?',
                yesCallback = () => {
                    this.settingsLoadFunctions.clearNowPlaying();
                    this.autoCloseModal();
                };

            MessageBox.confirm(title, message, MessageBoxConfirmType.YesNo, yesCallback);
        });
    }

    private autoCloseModal(): void {
        const delay = this.configurations.MediaLibrary.properties.SettingsDelay;

        if (delay > 0) {
            if (this.autoHideTimeOut) /*then*/ window.clearTimeout(this.autoHideTimeOut);
            this.autoHideTimeOut = window.setTimeout(this.hide.bind(this), this.configurations.MediaLibrary.properties.SettingsDelay * 1000);
        } else {
            this.hide();
        }
    }

    public hide(): void {
        $(this.modal).modal('hide');
    }

    private updateMusicPaths(list: string[] = [], hasChanged: boolean = false): void {
        if (hasChanged) {
            this.configurations.Music.properties.MusicPaths = list;
            this.configurations.Music.updateConfiguration()
                .then(() => this.configurations.Music.refresh())
                .then(() => this.stringList.load(this.configurations.Music.properties.MusicPaths));
            this.autoCloseModal();
        }
    }

    private checkPathValid(path: string): Promise<boolean> {
        let promise: Promise<boolean> = Promise.resolve(false);

        if (path.trim()) {
            LoadingModal.showLoading();
            promise = fetch_get('Music/MusicPathValid', { path: path })
                .then(response => response.text())
                .then(message => {
                    if (message) /*then*/ MessageBox.showWarning('Warning', message);
                    LoadingModal.hideLoading();

                    return !message;
                });
        }

        return promise;
    }

    private musicPathInUse(path: string): Promise<boolean> {
        let promise: Promise<boolean> = Promise.resolve(false);

        if (path.trim()) {
            LoadingModal.showLoading();
            promise = fetch_get('Music/MusicPathInUse', { path: path })
                .then(response => response.text())
                .then(response => {
                    const inUse = response === 'true',
                        message = 'This path contains folders that contain music and cannot be removed. Use the directory selector to remove all subfolders first.';

                    if (inUse) /*then*/ MessageBox.showWarning('Warning', message);
                    LoadingModal.hideLoading();

                    return inUse;
                });
        }

        return promise;
    }

    private toggleGlobalDarkMode(): void {
        const body = document.body,
            enabled = this.configurations.MediaLibrary.properties.DarkMode;

        $(body).toggleClass('bg-dark text-light', enabled);
        this.toggleDarkMode(body);
    }

    public toggleDarkMode(container: HTMLElement): void {
        const $container = $(container),
            enabled = this.configurations.MediaLibrary.properties.DarkMode;

        $container.find('.card').toggleClass('bg-dark', enabled);
        $container.find('.btn').toggleClass('btn-light', enabled);
        $container.find('.list-group-item').toggleClass('bg-dark', enabled);
        $container.find('.modal-content').toggleClass('bg-dark text-light', enabled);
        $container.find('.bg-light').toggleClass('bg-light', !enabled).toggleClass('bg-dark', enabled);
        $container.find('.navbar-light').toggleClass('navbar-light', !enabled).toggleClass('navbar-dark', enabled);
        $container.find('.text-dark').toggleClass('text-dark', !enabled).toggleClass('text-light', enabled);
    }
}