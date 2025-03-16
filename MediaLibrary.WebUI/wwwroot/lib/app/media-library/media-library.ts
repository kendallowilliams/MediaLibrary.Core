import Music from './music/music';
import Player from './player/player';
import Playlist from './playlist/playlist';
import Television from './television/television';
import Podcast from './podcast/podcast';
import HtmlControls from '../assets/controls/html-controls';
import Configurations from '../assets/models/configurations/configurations';
import BaseClass from '../assets/models/base-class';
import LoadingModal from '../assets/modals/loading-modal';
import { MediaPages, MediaTypes } from '../assets/enums/enums';
import HomeConfiguration from '../assets/models/configurations/home-configuration';
import MediaLibraryConfiguration from '../assets/models/configurations/media-library-configuration';
import PlayerConfiguration from '../assets/models/configurations/player-configuration';
import PlaylistConfiguration from '../assets/models/configurations/playlist-configuration';
import PodcastConfiguration from '../assets/models/configurations/podcast-configuration';
import TelevisionConfiguration from '../assets/models/configurations/television-configuration';
import MusicConfiguration from '../assets/models/configurations/music-configuration';
import Home from './home/home';
import EditSongModal from '../assets/modals/edit-song-modal';
import { getMediaPagesEnum, getMediaPagesEnumString, getMediaTypesEnum } from '../assets/enums/enum-functions';
import AddToPlaylistModal from '../assets/modals/add-to-playlist-modal';
import IPlayerLoadFunctions from '../assets/interfaces/player-load-functions-interface';
import IConfigurations from '../assets/interfaces/configurations-interface';
import { hideAllTooltips, loadAllTooltips } from '../assets/utilities/bootstrap-helper';
import { fetch_get, loadHTML } from '../assets/utilities/fetch_service';
import SettingsModal from '../assets/modals/settings-modal';
import ISettingsReloadFunctions from '../assets/interfaces/settings-reload-functions';
import { Collapse } from 'bootstrap';
import { MlCallback } from '../assets/types/callback.type';

export default class MediaLibrary extends BaseClass {
    private home: Home;
    private music: Music;
    private player: Player;
    private playlist: Playlist;
    private television: Television;
    private podcast: Podcast;
    private settingsModal: SettingsModal;
    private homeConfiguration: HomeConfiguration;
    private mediaLibraryConfiguration: MediaLibraryConfiguration;
    private playerConfiguration: PlayerConfiguration;
    private playlistConfiguration: PlaylistConfiguration;
    private podcastConfiguration: PodcastConfiguration;
    private televisionConfiguration: TelevisionConfiguration;
    private musicConfiguration: MusicConfiguration;
    private mainViews: { HomeView: HTMLElement, MediaView: HTMLElement, PlayerView: HTMLElement, SettingsView: HTMLElement };
    private editSongModal: EditSongModal;
    private addToPlaylistModal: AddToPlaylistModal;
    private navBarTimeOut: number;

    constructor() {
        super();
        this.initialize();
        this.load();
        this.mainViews = HtmlControls.Views();
    }

    private initialize(): void {
        this.initializeControls();
    }

    private initializeControls(): void {
        $(HtmlControls.Containers().NavBarContainer).on('shown.bs.collapse', e => this.autoCloseNavBar());
        $(HtmlControls.Containers().NavBarContainer).on('hidden.bs.collapse', e => window.clearTimeout(this.navBarTimeOut));
        $('[data-media-page]').on('click', e => this.loadView.call(this, getMediaPagesEnum($(e.currentTarget).attr('data-media-page'))));
    }

    private load(): void {
        const loadFunctions: IPlayerLoadFunctions = {
                loadArtist: (id) => this.music.loadArtist(id, this.loadView.bind(this, MediaPages.Music)),
                loadAlbum: (id) => this.music.loadAlbum(id, this.loadView.bind(this, MediaPages.Music)),
                loadPodcast: (id) => this.podcast.loadPodcast(id, this.loadView.bind(this, MediaPages.Podcast)),
                loadSeries: (id) => this.television.loadSeries(id, this.loadView.bind(this, MediaPages.Television))
            },
            settingsLoadFunctions: ISettingsReloadFunctions = {
                loadTelevision: () => this.television.loadView(),
                loadMusic: () => this.music.loadView(),
                loadPodcast: () => this.podcast.loadView(),
                loadPlaylist: () => this.playlist.loadView(),
                loadPlayer: () => this.player.loadView(),
                clearNowPlaying: () => this.player.clearNowPlaying(),
                toggleAudioVisualizer: () => this.player.toggleAudioVisualizer()
            },
            success: MlCallback = () => {
                const configurations: IConfigurations = {
                    MediaLibrary: this.mediaLibraryConfiguration,
                    Music: this.musicConfiguration,
                    Player: this.playerConfiguration,
                    Podcast: this.podcastConfiguration,
                    Playlist: this.playlistConfiguration,
                    Television: this.televisionConfiguration,
                    Home: this.homeConfiguration
                };

                LoadingModal.showLoading();
                this.loadStaticViews(() => {
                    LoadingModal.hideLoading();
                    this.editSongModal = new EditSongModal(this.mediaLibraryConfiguration, this.loadView.bind(this));
                    this.settingsModal = new SettingsModal(configurations, settingsLoadFunctions);
                    this.addToPlaylistModal = new AddToPlaylistModal(this.settingsModal.toggleDarkMode.bind(this.settingsModal),
                        (id, type) => this.player.addItemToNowPlayingList(id, type),
                        () => this.playerConfiguration.properties.SelectedMediaType);
                    this.home = new Home(this.homeConfiguration);
                    this.music = new Music(this.musicConfiguration,
                        this.playWrapper.bind(this),
                        this.updateActiveMedia.bind(this),
                        () => this.mediaLibraryConfiguration.properties.TooltipsEnabled,
                        this.initializeContinuePlaybackBtns.bind(this),
                        container => this.settingsModal.toggleDarkMode(container)
                    );
                    this.playlist = new Playlist(this.playlistConfiguration,
                        this.playWrapper.bind(this),
                        this.updateActiveMedia.bind(this),
                        loadFunctions,
                        () => this.mediaLibraryConfiguration.properties.TooltipsEnabled,
                        container => this.settingsModal.toggleDarkMode(container)
                    );
                    this.podcast = new Podcast(this.podcastConfiguration,
                        this.playWrapper.bind(this),
                        this.updateActiveMedia.bind(this),
                        () => this.mediaLibraryConfiguration.properties.TooltipsEnabled,
                        this.initializeContinuePlaybackBtns.bind(this),
                        container => this.settingsModal.toggleDarkMode(container)
                    );
                    this.television = new Television(this.televisionConfiguration,
                        this.playWrapper.bind(this),
                        this.updateActiveMedia.bind(this),
                        () => this.mediaLibraryConfiguration.properties.TooltipsEnabled,
                        this.initializeContinuePlaybackBtns.bind(this),
                        container => this.settingsModal.toggleDarkMode(container)
                    );
                    this.player = new Player(this.playerConfiguration,
                        loadFunctions,
                        this.updateActiveMedia.bind(this),
                        this.mediaLibraryConfiguration,
                        () => this.mediaLibraryConfiguration.properties.TooltipsEnabled,
                        container => this.settingsModal.toggleDarkMode(container),
                        container => this.music.initializeSongOptions(container),
                        (id: number, status: string) => this.updatePlaybackStatus(id, status)
                    );
                    this.loadView(this.mediaLibraryConfiguration.properties.SelectedMediaPage);
                });
            };

        this.loadConfigurations(success);
    }

    private playWrapper(btn: HTMLButtonElement, playSingleItem?: boolean): void {
        this.player.play.call(this.player, btn, playSingleItem, this.loadView.bind(this, MediaPages.Player));
        this.initializeContinuePlaybackBtns();
    }

    private updateActiveMedia(): void {
        const $mediaView: JQuery<HTMLElement> = $(this.mainViews.MediaView),
            $playerView: JQuery<HTMLElement> = $(this.mainViews.PlayerView),
            currentId: number = this.player.getCurrentlyLoadedId(),
            darkModeEnabled = this.mediaLibraryConfiguration.properties.DarkMode;

        $mediaView.find('.list-group-item[data-song-id].active').removeClass('active');
        $mediaView.find('.list-group-item[data-episode-id].active').removeClass('active');
        $playerView.find('.list-group-item[data-play-index].active').removeClass('active');

        if (this.playerConfiguration.properties.SelectedMediaType === MediaTypes.Song &&
            (this.mediaLibraryConfiguration.properties.SelectedMediaPage === MediaPages.Music ||
                this.mediaLibraryConfiguration.properties.SelectedMediaPage === MediaPages.Playlist)) {
            $mediaView.find('.list-group-item[data-song-id="' + currentId + '"]').addClass('active');
        } else if (this.playerConfiguration.properties.SelectedMediaType === MediaTypes.Television &&
            this.mediaLibraryConfiguration.properties.SelectedMediaPage === MediaPages.Television) {
            $mediaView.find('.list-group-item[data-episode-id="' + currentId + '"]').addClass('active');
        } else if (this.playerConfiguration.properties.SelectedMediaType === MediaTypes.Podcast &&
            this.mediaLibraryConfiguration.properties.SelectedMediaPage === MediaPages.Podcast) {
            $mediaView.find('.list-group-item[data-episode-id="' + currentId + '"]').addClass('active');
        }

        $playerView.find('.list-group-item[data-item-id="' + currentId + '"]').addClass('active');
    }

    private loadConfigurations(callback: MlCallback = () => null): void {
        Promise.all([
            fetch_get('Home/HomeConfiguration', null).then(response => response.json().then(data => this.homeConfiguration = Configurations.Home(data))),
            fetch_get('MediaLibrary/MediaLibraryConfiguration', null).then(response => response.json().then(data => this.mediaLibraryConfiguration = Configurations.MediaLibrary(data))),
            fetch_get('Music/MusicConfiguration', null).then(response => response.json().then(data => this.musicConfiguration = Configurations.Music(data))),
            fetch_get('Television/TelevisionConfiguration', null).then(response => response.json().then(data => this.televisionConfiguration = Configurations.Television(data))),
            fetch_get('Podcast/PodcastConfiguration', null).then(response => response.json().then(data => this.podcastConfiguration = Configurations.Podcast(data))),
            fetch_get('Player/PlayerConfiguration', null).then(response => response.json().then(data => this.playerConfiguration = Configurations.Player(data))),
            fetch_get('Playlist/PlaylistConfiguration', null).then(response => response.json().then(data => this.playlistConfiguration = Configurations.Playlist(data)))
        ]).then(_ => callback());
    }

    private loadStaticViews(callback: MlCallback = () => null) {
        Promise.all([
            loadHTML(this.mainViews.PlayerView, $(this.mainViews.PlayerView).attr('data-action-url'), null),
            loadHTML(this.mainViews.HomeView, $(this.mainViews.HomeView).attr('data-action-url'), null)
        ]).then(_ => callback());
    }

    private loadView(mediaPage: MediaPages): void {
        const success = () => {
            const $tooltips = $('*[data-bs-tooltip="tooltip"]');

            $tooltips.attr('data-disabled', 'true');
            hideAllTooltips();

            if(this.mediaLibraryConfiguration.properties.TooltipsEnabled) {
                $tooltips.removeAttr('data-disabled');
                loadAllTooltips();
            }

            this.initializeContinuePlaybackBtns();
            this.settingsModal.toggleDarkMode(this.mainViews.MediaView);
            this.updateActiveMedia();
            LoadingModal.hideLoading();
        };
        const showHideMainControls: boolean = mediaPage !== MediaPages.Home && mediaPage !== MediaPages.Player;

        LoadingModal.showLoading();
        Collapse.getOrCreateInstance(HtmlControls.Containers().NavBarContainer, { toggle: false }).hide();
        this.mediaLibraryConfiguration.properties.SelectedMediaPage = mediaPage;
        this.disableNavItem(getMediaPagesEnumString(mediaPage));
        this.mediaLibraryConfiguration.updateConfiguration()
            .then(() => {
            this.prepareViews();
            this.showMainView(mediaPage);
            this.player.getPlayerControls().showHideMainControls(showHideMainControls);

            switch (mediaPage) {
                case MediaPages.Music:
                    this.music.loadView(() => success());
                    break;
                case MediaPages.Player:
                    this.player.loadView(() => success());
                    break;
                case MediaPages.Playlist:
                    this.playlist.loadView(() => success());
                    break;
                case MediaPages.Podcast:
                    this.podcast.loadView(() => success());
                    break;
                case MediaPages.Television:
                    this.television.loadView(() => success());
                    break;
                case MediaPages.Home:
                default:
                    this.home.loadView(() => success());
                    break;
            }
        });
    }

    private initializeContinuePlaybackBtns(): void {
        const $btns = $(HtmlControls.Buttons().PlaybackContinueButtons),
            canRemove = btn => !this.playerConfiguration.hasNowPlayingListItems($(btn).data('page')) ||
                getMediaTypesEnum($(btn).data('page')) === this.playerConfiguration.properties.SelectedMediaType;

        $btns.filter((index, btn) => canRemove(btn)).addClass('d-none');
        $btns.on('click', e => this.playWrapper(e.currentTarget as HTMLButtonElement, false));
    }

    private prepareViews(): void {
        $([this.mainViews.HomeView, this.mainViews.MediaView, this.mainViews.PlayerView, this.mainViews.SettingsView]).addClass('d-none');
    }

    private showMainView(mediaPage: MediaPages): void {
        switch (mediaPage) {
            case MediaPages.Home:
                $(this.mainViews.HomeView).removeClass('d-none');
                break;
            case MediaPages.Player:
                $(this.mainViews.PlayerView).removeClass('d-none');
                break;
            default:
                $(this.mainViews.MediaView).removeClass('d-none');
                break;

        }
    }

    private disableNavItem(view: string): void {
        $('a.nav-link[data-media-page][href]').removeClass('d-none');
        $('a.nav-link[data-media-page]:not([href])').addClass('d-none');
        $('a.nav-link[data-media-page="' + view + '"][href]').addClass('d-none');
        $('a.nav-link[data-media-page="' + view + '"]:not([href])').removeClass('d-none');
    }

    private autoCloseNavBar(): void {
        const $navBar = $(HtmlControls.Containers().NavBarContainer),
            bsNavBar = Collapse.getOrCreateInstance(HtmlControls.Containers().NavBarContainer, { toggle: false });

        window.clearTimeout(this.navBarTimeOut);

        if (!$navBar.hasClass('collapsed')) {
            this.navBarTimeOut = window.setTimeout(() => bsNavBar.hide(), this.mediaLibraryConfiguration.properties.NavBarDelay * 1000);
        }
    }

    public getPromptBeforeUnload(): boolean {
        return this.mediaLibraryConfiguration.properties.PromptBeforeUnload;
    }

    public handleKeyDown(evt: KeyboardEvent): void {
        if (this.mediaLibraryConfiguration.properties.KeysEnabled) {
            if (evt) {
                if (evt.repeat) {

                } else {
                    if (evt.key === 'ArrowLeft') {
                        this.player.loadPrevious();
                    } else if (evt.key === 'ArrowRight') {
                        this.player.loadNext();
                    } else if (evt.key === ' ') {
                        this.player.playOrPause();
                    }
                }
            }
        }
    }

    private updatePlaybackStatus(id: number, status: string): void {
        $('[data-playback-status-id="' + id + '"]').removeClass('d-none')
            .text(status);
    }
}

