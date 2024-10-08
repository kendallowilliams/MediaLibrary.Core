﻿import BaseClass from "../../assets/models/base-class";
import MusicConfiguration from "../../assets/models/configurations/music-configuration";
import { MusicPages } from "../../assets/enums/enums";
import HtmlControls from "../../assets/controls/html-controls";
import LoadingModal from "../../assets/modals/loading-modal";
import { loadHTML } from "../../assets/utilities/fetch_service";
import { MlCallback } from "../../assets/types/callback.type";

export default class Search extends BaseClass {
    private searchTimeout: number;
    private searchDelay: number;

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
        this.searchDelay = 1; 
    }

    initializeControls(): void {
        $('[data-back-button="search"]').on('click', () => {
            this.musicConfiguration.properties.PreviousSearchQuery = '';
            this.musicConfiguration.updateConfiguration()
                .then(() => this.goBack(this.reload));
        });
        $('[data-music-action="search-music"]').on('click', this.search.bind(this));
        $(HtmlControls.UIControls().SearchQuery).on('input', () => {
            if (this.searchTimeout) {
                clearTimeout(this.searchTimeout);
                this.searchTimeout = null;
            }

            this.searchTimeout = window.setTimeout(this.search.bind(this), this.searchDelay * 1000);
        });
        $(HtmlControls.UIControls().SearchQuery).val(this.musicConfiguration.properties.PreviousSearchQuery);
    }

    loadSearch(callback: MlCallback = () => null): void {
        this.musicConfiguration.properties.SelectedMusicPage = MusicPages.Search;
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

    public search() : void {
        const input = HtmlControls.UIControls().SearchQuery,
            query = $(input).val() as string,
            $btn = $('[data-music-action="search-music"]'),
            showHideLoading = searching => {
                if (searching) {
                    $btn.find('[data-searching-visible="false"]').addClass('d-none');
                    $btn.find('[data-searching-visible="true"]').removeClass('d-none');
                } else {
                    $btn.find('[data-searching-visible="true"]').addClass('d-none');
                    $btn.find('[data-searching-visible="false"]').removeClass('d-none');
                }
                $btn.prop('disabled', searching);
            },
            containers = HtmlControls.Containers();

        if (query && query.length >= input.minLength) {
            showHideLoading(true);
            LoadingModal.showLoading();

            this.musicConfiguration.properties.PreviousSearchQuery = query;
            this.musicConfiguration.updateConfiguration()
                .then(() => {
                Promise.all([
                    loadHTML(containers.SearchAlbumsContainer, 'Music/SearchAlbums', { query: query }),
                    loadHTML(containers.SearchArtistsContainer, 'Music/SearchArtists', { query: query }),
                    loadHTML(containers.SearchSongsContainer, 'Music/SearchSongs', { query: query })
                ]).then(_ => {
                        $(containers.SearchSongsContainer).find('[data-play-id]').on('click', e => {
                            this.playFunc(e.currentTarget as HTMLButtonElement, true);
                        });

                        $('[data-artist-id]').on('click', _e => this._loadArtist(parseInt($(_e.currentTarget).attr('data-artist-id'))));
                        $('[data-album-id]').on('click', _e => this._loadAlbum(parseInt($(_e.currentTarget).attr('data-album-id'))));
                        this.initializeArtistOptions(containers.SearchArtistsContainer);
                        this.initializeAlbumOptions(containers.SearchAlbumsContainer);
                        this.initializeSongOptions(containers.SearchSongsContainer)
                        this.updateActiveMediaFunc();
                        this.toggleDarkMode();
                        showHideLoading(false);
                        LoadingModal.hideLoading();
                        $(HtmlControls.UIControls().SearchQuery).trigger('focus');
                });
            });
        } else {
            LoadingModal.showLoading();
            this.musicConfiguration.properties.PreviousSearchQuery = '';
            this.musicConfiguration.updateConfiguration()
                .then(() => {
                    $(containers.SearchAlbumsContainer).html('<div>No albums.</div>');
                    $(containers.SearchArtistsContainer).html('<div>No artists.</div>');
                    $(containers.SearchSongsContainer).html('<div>No songs.</div>');
                    showHideLoading(false);
                    LoadingModal.hideLoading();
                    $(HtmlControls.UIControls().SearchQuery).trigger('focus');
            });
        }
    }
};