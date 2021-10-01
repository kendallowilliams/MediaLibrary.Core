﻿import Music from './music/music';
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
import { getMediaPagesEnum, getMediaPagesEnumString } from '../assets/enums/enum-functions';
import AddToPlaylistModal from '../assets/modals/add-to-playlist-modal';
import IPlayerLoadFunctions from '../assets/interfaces/player-load-functions-interface';
import Settings from './settings/settings';
import IConfigurations from '../assets/interfaces/configurations-interface';
import { disposeAllTooltips, loadAllTooltips } from '../assets/utilities/bootstrap-helper';
import { loadHTML } from '../assets/utilities/fetch_service';

export default class MediaLibrary extends BaseClass {
    private home: Home;
    private music: Music;
    private player: Player;
    private playlist: Playlist;
    private television: Television;
    private podcast: Podcast;
    private settings: Settings;
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
            success: () => void = () => {
                const configurations: IConfigurations = {
                    MediaLibary: this.mediaLibraryConfiguration,
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
                    this.addToPlaylistModal = new AddToPlaylistModal();
                    this.home = new Home(this.homeConfiguration);
                    this.music = new Music(this.musicConfiguration, this.playWrapper.bind(this), this.updateActiveMedia.bind(this));
                    this.playlist = new Playlist(this.playlistConfiguration, this.playWrapper.bind(this), this.updateActiveMedia.bind(this), loadFunctions);
                    this.podcast = new Podcast(this.podcastConfiguration, this.playWrapper.bind(this), this.updateActiveMedia.bind(this));
                    this.television = new Television(this.televisionConfiguration, this.playWrapper.bind(this), this.updateActiveMedia.bind(this));
                    this.player = new Player(this.playerConfiguration, loadFunctions, this.updateActiveMedia.bind(this));
                    this.settings = new Settings(configurations);
                    this.loadView(this.mediaLibraryConfiguration.properties.SelectedMediaPage);
                });
            };

        this.loadConfigurations(success);
    }

    private playWrapper(btn: HTMLButtonElement, playSingleItem?: boolean): void {
        this.player.play.call(this.player, btn, playSingleItem, this.loadView.bind(this, MediaPages.Player));
    }

    private updateActiveMedia(): void {
        const $mediaView: JQuery<HTMLElement> = $(this.mainViews.MediaView),
            currentId: number = this.player.getCurrentlyLoadedId();

        $mediaView.find('.list-group-item[data-song-id].active').removeClass('active');
        $mediaView.find('.list-group-item[data-episode-id].active').removeClass('active');

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
    }

    private loadConfigurations(callback: () => void = () => null): void {
        $.get('Home/HomeConfiguration', data => this.homeConfiguration = Configurations.Home(data))
            .done(() => $.get('MediaLibrary/MediaLibraryConfiguration', data => this.mediaLibraryConfiguration = Configurations.MediaLibrary(data))
                .done(() => $.get('Music/MusicConfiguration', data => this.musicConfiguration = Configurations.Music(data))
                    .done(() => $.get('Television/TelevisionConfiguration', data => this.televisionConfiguration = Configurations.Television(data))
                        .done(() => $.get('Podcast/PodcastConfiguration', data => this.podcastConfiguration = Configurations.Podcast(data))
                            .done(() => $.get('Player/PlayerConfiguration', data => this.playerConfiguration = Configurations.Player(data))
                                .done(() => $.get('Playlist/PlaylistConfiguration', data => this.playlistConfiguration = Configurations.Playlist(data))
                                    .done(callback)
                                )
                            )
                        )
                    )
                )
            );
    }

    private loadStaticViews(callback: () => void = () => null) {
        loadHTML(this.mainViews.PlayerView, $(this.mainViews.PlayerView).attr('data-action-url'), null, () => {
            loadHTML(this.mainViews.HomeView, $(this.mainViews.HomeView).attr('data-action-url'), null, callback);
        });
    }

    private loadView(mediaPage: MediaPages): void {
        const success = () => {
            const $tooltips = $('*[data-tooltip="tooltip"]');

            $tooltips.attr('data-disabled', 'true');
            disposeAllTooltips();

            if(this.mediaLibraryConfiguration.properties.TooltipsEnabled) {
                $tooltips.removeAttr('data-disabled');
                loadAllTooltips();
            }

            LoadingModal.hideLoading();
        };
        let showHideMainControls: boolean = true;

        LoadingModal.showLoading();
        $(HtmlControls.Containers().NavBarContainer).collapse('hide');
        this.mediaLibraryConfiguration.properties.SelectedMediaPage = mediaPage;
        this.disableNavItem(getMediaPagesEnumString(mediaPage));
        this.mediaLibraryConfiguration.updateConfiguration(() => {
            this.prepareViews();
            this.showMainView(mediaPage);

            switch (mediaPage) {
                case MediaPages.Music:
                    this.music.loadView(() => success());
                    break;
                case MediaPages.Player:
                    showHideMainControls = false;
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
                case MediaPages.Settings:
                    showHideMainControls = false;
                    this.settings.loadView(() => success());
                    break;
                case MediaPages.Home:
                default:
                    showHideMainControls = false;
                    this.home.loadView(() => success());
                    break;
            }

            this.player.getPlayerControls().showHideMainControls(showHideMainControls);
        });
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
            case MediaPages.Settings:
                $(this.mainViews.SettingsView).removeClass('d-none');
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
        const $navBar = $(HtmlControls.Containers().NavBarContainer);

        window.clearTimeout(this.navBarTimeOut);

        if (!$navBar.hasClass('collapsed')) {
            this.navBarTimeOut = window.setTimeout(() => $navBar.collapse('hide'), this.mediaLibraryConfiguration.properties.NavBarTimeOut * 1000);
        }
    }
}

