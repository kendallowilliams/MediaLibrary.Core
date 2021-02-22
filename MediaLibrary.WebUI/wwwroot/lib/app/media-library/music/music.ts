﻿import BaseClass from "../../assets/models/base-class";
import IView from "../../assets/interfaces/view-interface";
import MusicConfiguration from "../../assets/models/configurations/music-configuration";
import { MusicPages, MusicTabs } from "../../assets/enums/enums";
import HtmlControls from '../../assets/controls/html-controls';
import Artist from "./artist";
import Album from "./album";
import LoadingModal from "../../assets/modals/loading-modal";
import IMusicConfiguration from "../../assets/interfaces/music-configuration-interface";
import { loadTooltips, disposeTooltips } from '../../assets/utilities/bootstrap-helper';
import AddNewSongModal from "../../assets/modals/add-song-modal";
import { getMusicTabEnumString, getMusicTabEnum, getSongSortEnum, getArtistSortEnum, getAlbumSortEnum } from "../../assets/enums/enum-functions";
import Search from "./search";
import ManageDirectoriesModal from "../../assets/modals/manage-directories-modal";

export default class Music extends BaseClass implements IView {
    private readonly mediaView: HTMLElement;
    private artist: Artist;
    private album: Album;
    private search: Search;
    private addNewSongModal: AddNewSongModal;
    private manageDirectoriesModal: ManageDirectoriesModal;

    constructor(private musicConfiguration: MusicConfiguration,
        private playFunc: (btn: HTMLButtonElement, single: boolean) => void,
        private updateActiveMediaFunc: () => void) {
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
            this.addNewSongModal = new AddNewSongModal(this.loadView.bind(this));
            this.manageDirectoriesModal = new ManageDirectoriesModal(this.loadView.bind(this));
            this.initializeControls();
            loadTooltips(this.mediaView);
            $('[data-music-tab="' + getMusicTabEnumString(this.musicConfiguration.properties.SelectedMusicTab) + '"]').tab('show');
            this.updateActiveMediaFunc();
            if (this.musicConfiguration.properties.SelectedMusicPage === MusicPages.Search) /*then*/ this.search.search();
            callback();
        }; 

        disposeTooltips(this.mediaView);
        $(this.mediaView).load('Music/Index', success);
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
        $('[data-album-id]').on('click', _e => this.album.loadAlbum(parseInt($(_e.currentTarget).attr('data-album-id')), () => this.loadView()));
        $('[data-artist-id]').on('click', _e => this.artist.loadArtist(parseInt($(_e.currentTarget).attr('data-artist-id')), () => this.loadView()));

        $(HtmlControls.UIControls().MusicTabList).find('*[data-toggle="tab"]').on('shown.bs.tab', e => {
            const $newTab = $(e.target),
                $oldTab = $(e.relatedTarget),
                $newView = $($newTab.attr('href')),
                $oldView = $($oldTab.attr('href')),
                url = $newView.attr('data-load-url'),
                success = () => {
                    LoadingModal.hideLoading();
                    loadTooltips($newView[0]);

                    $('[data-group-url]').on('click', _e => {
                        const $btn = $(_e.currentTarget),
                            url = $btn.attr('data-group-url');
                        if (url) {
                            LoadingModal.showLoading();
                            disposeTooltips($($btn.attr('data-target'))[0]);
                            $($btn.attr('data-target')).load(url, () => {
                                loadTooltips($($btn.attr('data-target'))[0]);
                                $($btn.attr('data-target')).find('*[data-play-id]').on('click', __e => this.playFunc(__e.currentTarget as HTMLButtonElement, true));
                                LoadingModal.hideLoading();
                                $btn.attr('data-group-url', '');
                                this.updateActiveMediaFunc();
                            });
                        }
                    });
                    $('[data-album-id]').on('click', _e => this.album.loadAlbum(parseInt($(_e.currentTarget).attr('data-album-id')), () => this.loadView()));
                    $('[data-artist-id]').on('click', _e => this.artist.loadArtist(parseInt($(_e.currentTarget).attr('data-artist-id')), () => this.loadView()));
                    $('[data-group-url][data-target="#collapse-songs-0"]').trigger('click');
                    this.updateActiveMediaFunc();
                };
            $(HtmlControls.UIControls().MusicTabList).find('*[data-sort-tab]').each((index, _btn) => {
                if ($(_btn).attr('data-sort-tab') === $newTab.attr('id')) {
                    $(_btn).removeClass('d-none').addClass('d-inline-block');
                } else {
                    $(_btn).removeClass('d-inline-block').addClass('d-none');
                }
            });
            LoadingModal.showLoading();
            this.musicConfiguration.properties.SelectedMusicTab = getMusicTabEnum($newTab.attr('data-music-tab'));
            disposeTooltips($newView[0]);
            this.musicConfiguration.updateConfiguration(() => $newView.load(url, success));
        });

        $(this.mediaView).find('*[data-sort-type]').on('change', e => {
            const select = e.currentTarget,
                sortType: string = $(select).attr('data-sort-type');

            if (sortType === 'SelectedAlbumSort') {
                this.musicConfiguration.properties.SelectedAlbumSort = getAlbumSortEnum($(select).val() as string);
            } else if (sortType === 'SelectedArtistSort') {
                this.musicConfiguration.properties.SelectedArtistSort = getArtistSortEnum($(select).val() as string);
            } else if (sortType === 'SelectedSongSort') {
                this.musicConfiguration.properties.SelectedSongSort = getSongSortEnum($(select).val() as string);
            }

            this.musicConfiguration.updateConfiguration(() => this.loadView());
        });

        $('[data-music-action="refresh"]').on('click', e => {
            LoadingModal.showLoading();
            $.post('Music/Refresh', () => this.loadView(() => LoadingModal.hideLoading()));
        });

        $('[data-music-action="search"]').on('click', e => {
            this.search.loadSearch(() => this.loadView());
        });

        this.search.initializeControls();
        this.album.initializeControls();
        this.artist.initializeControls();
    }
}