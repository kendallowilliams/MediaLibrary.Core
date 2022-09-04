﻿import BaseClass from "../../assets/models/base-class";
import IView from "../../assets/interfaces/view-interface";
import MusicConfiguration from "../../assets/models/configurations/music-configuration";
import { MessageBoxConfirmType, MusicPages, MusicTabs } from "../../assets/enums/enums";
import HtmlControls from '../../assets/controls/html-controls';
import Artist from "./artist";
import Album from "./album";
import LoadingModal from "../../assets/modals/loading-modal";
import IMusicConfiguration from "../../assets/interfaces/music-configuration-interface";
import { loadTooltips, disposeTooltips } from '../../assets/utilities/bootstrap-helper';
import AddNewSongModal from "../../assets/modals/add-song-modal";
import { getMusicTabEnumString, getMusicTabEnum } from "../../assets/enums/enum-functions";
import Search from "./search";
import * as MessageBox from "../../assets/utilities/message-box";
import { loadHTML } from "../../assets/utilities/fetch_service";
import { Tab } from "bootstrap";

export default class Music extends BaseClass implements IView {
    private readonly mediaView: HTMLElement;
    private artist: Artist;
    private album: Album;
    private search: Search;

    constructor(private musicConfiguration: MusicConfiguration,
        private playFunc: (btn: HTMLButtonElement, single: boolean) => void,
        private updateActiveMediaFunc: () => void,
        private tooltipsEnabled: () => boolean = () => false,
        private initContinuePlaybackBtns: () => void,
        private toggleDarkMode: (container) => void) {
        super();
        this.mediaView = HtmlControls.Views().MediaView;
        this.artist = new Artist(musicConfiguration, this.loadView.bind(this));
        this.album = new Album(musicConfiguration, this.loadView.bind(this));
        this.search = new Search(musicConfiguration,
            this.loadView.bind(this),
            this.playFunc.bind(this),
            this.loadAlbum.bind(this),
            this.loadArtist.bind(this),
            this.updateActiveMediaFunc.bind(this)
        );
    }

    loadView(callback: () => void = () => null): void {
        const success: () => void = () => {
            this.initializeControls();
            if (this.tooltipsEnabled()) /*then*/ loadTooltips(this.mediaView);
            $('[data-music-tab="' + getMusicTabEnumString(this.musicConfiguration.properties.SelectedMusicTab) + '"]')
                .each((index, tab) => Tab.getOrCreateInstance(tab).show());
            if (this.musicConfiguration.properties.SelectedMusicPage === MusicPages.Search) /*then*/ this.search.search();
            this.initContinuePlaybackBtns();
            this.toggleDarkMode(this.mediaView);
            this.updateActiveMediaFunc();
            callback();
        }; 

        disposeTooltips(this.mediaView);
        loadHTML(this.mediaView, 'Music/Index', null).then(_ => success());
    }

    loadArtist(id: number, callback: () => void): void {
        if (Number.isInteger(id)) {
            this.artist.loadArtist.call(this.artist, id, callback);
        }
    }

    loadAlbum(id: number, callback: () => void): void {
        if (Number.isInteger(id)) {
            this.album.loadAlbum.call(this.album, id, callback);
        }
    }

    private initializeControls(): void {
        const properties: IMusicConfiguration = this.musicConfiguration.properties,
            playSingle: boolean = properties.SelectedMusicTab === MusicTabs.Songs && properties.SelectedMusicPage === MusicPages.Index;

        $('[data-play-id]').on('click', e => this.playFunc(e.currentTarget as HTMLButtonElement, playSingle));
        this.initializeAlbumAndArtistControls(this.mediaView);

        $(HtmlControls.UIControls().MusicTabList).find('*[data-bs-toggle="tab"]').on('shown.bs.tab', e => {
            const $newTab = $(e.target),
                $oldTab = $(e["relatedTarget"]),
                $newView = $($newTab.attr('href')),
                $oldView = $($oldTab.attr('href')),
                url = $newView.attr('data-load-url'),
                success = () => {
                    LoadingModal.hideLoading();
                    if (this.tooltipsEnabled()) /*then*/ loadTooltips($newView[0]);

                    $('[data-group-url]').on('click', _e => {
                        const $btn = $(_e.currentTarget),
                            url = $btn.attr('data-group-url'),
                            $container = $($btn.attr('data-bs-target'));
                        if (url) {
                            LoadingModal.showLoading();
                            disposeTooltips($container[0]);
                            loadHTML($container[0], url, null)
                                .then(_ => {
                                    if (this.tooltipsEnabled()) /*then*/ loadTooltips($container[0]);
                                    $container.find('*[data-play-id]')
                                        .on('click', __e => this.playFunc(__e.currentTarget as HTMLButtonElement, true));
                                    this.initializeAlbumAndArtistControls($container[0]);
                                    LoadingModal.hideLoading();
                                    $btn.attr('data-group-url', '');
                                    this.toggleDarkMode(this.mediaView);
                                    this.updateActiveMediaFunc();
                                });
                        }
                    });
                    this.initializeAlbumAndArtistControls($newView[0]);
                    $('[data-group-url][data-bs-target="#collapse-songs-0"]').trigger('click');
                    this.updateActiveMediaFunc();
                    this.toggleDarkMode(this.mediaView);
                };
            LoadingModal.showLoading();
            this.musicConfiguration.properties.SelectedMusicTab = getMusicTabEnum($newTab.attr('data-music-tab'));
            disposeTooltips($newView[0]);
            this.musicConfiguration.updateConfiguration()
                .then(() => loadHTML($newView[0], url, null)
                    .then(_ => success()));
        });

        $('[data-music-action="search"]').on('click', e => {
            this.search.loadSearch(() => this.loadView());
        });

        this.search.initializeControls();
        this.album.initializeControls();
        this.artist.initializeControls();
    }

    private initializeAlbumAndArtistControls(container: HTMLElement): void {
        const getAlbumId = btn => parseInt($(btn).attr('data-album-id')),
            getArtistId = btn => parseInt($(btn).attr('data-artist-id'))

        $(container).find('[data-album-id]').on('click', _e => this.album.loadAlbum(getAlbumId(_e.currentTarget), () => this.loadView()));
        $(container).find('[data-artist-id]').on('click', _e => this.artist.loadArtist(getArtistId(_e.currentTarget), () => this.loadView()));
    }
}