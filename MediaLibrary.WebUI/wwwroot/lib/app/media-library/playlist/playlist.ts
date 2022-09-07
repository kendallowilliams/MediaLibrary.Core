import BaseClass from "../../assets/models/base-class";
import IView from "../../assets/interfaces/view-interface";
import PlaylistConfiguration from "../../assets/models/configurations/playlist-configuration";
import HtmlControls from '../../assets/controls/html-controls';
import { MessageBoxConfirmType, PlaylistPages } from "../../assets/enums/enums";
import AddNewPlaylistModal from "../../assets/modals/add-playlist-modal";
import LoadingModal from "../../assets/modals/loading-modal";
import EditPlaylistModal from "../../assets/modals/edit-playlist-modal";
import { loadTooltips, disposeTooltips } from "../../assets/utilities/bootstrap-helper";
import { getPlaylistSortEnum, getPlaylistTabEnumString, getPlaylistTabEnum, getPlaylistSortEnumString } from "../../assets/enums/enum-functions";
import IPlayerLoadFunctions from "../../assets/interfaces/player-load-functions-interface";
import * as MessageBox from '../../assets/utilities/message-box';
import { fetch_get, fetch_post, loadHTML } from "../../assets/utilities/fetch_service";
import { Tab } from "bootstrap";

export default class Playlist extends BaseClass implements IView {
    private readonly mediaView: HTMLElement;
    private addPlaylistModal: AddNewPlaylistModal;
    private editPlaylistModal: EditPlaylistModal;
    private playlistView: HTMLElement;

    constructor(private playlistConfiguration: PlaylistConfiguration,
        private playFunc: (btn: HTMLButtonElement) => void,
        private updateActiveMediaFunc: () => void,
        private loadFunctions: IPlayerLoadFunctions,
        private tooltipsEnabled: () => boolean = () => false,
        private toggleDarkMode: (container) => void) {
        super();
        this.playlistView = HtmlControls.Views().MediaView;
        this.mediaView = HtmlControls.Views().MediaView;
    }

    loadView(callback: () => void = () => null): void {
        const success: () => void = () => {
            this.addPlaylistModal = new AddNewPlaylistModal(this.loadView.bind(this), this.playlistConfiguration);
            this.editPlaylistModal = new EditPlaylistModal(this.loadView.bind(this));
            this.initializeControls();
            this.updateActiveMediaFunc();
            this.applyLoadFunctions();
            $('[data-playlist-tab="' + getPlaylistTabEnumString(this.playlistConfiguration.properties.SelectedPlaylistTab) + '"]')
                .each((index, tab) => Tab.getOrCreateInstance(tab).show());
            this.toggleDarkMode(this.mediaView);
            callback();
            if (this.tooltipsEnabled()) /*then*/ loadTooltips(this.mediaView);
        };

        disposeTooltips(this.mediaView);
        loadHTML(this.mediaView, 'Playlist/Index', null)
            .then(_ => success());
    }

    private initializeControls(): void {
        $(this.mediaView).find('*[data-back-button="playlist"]').on('click', () => this.goBack(() => this.loadView.call(this)));
        $(this.mediaView).find('*[data-play-id]').on('click', e => this.playFunc(e.currentTarget as HTMLButtonElement));

        $(this.mediaView).find('*[data-playlist-action="sort"]').on('change', e => {
            const $target = $(e.currentTarget),
                sortType = $target.attr('data-sort-type');

            LoadingModal.showLoading();
            if (sortType === 'SelectedMusicPlaylistSort') {
                this.playlistConfiguration.properties.SelectedMusicPlaylistSort = getPlaylistSortEnum($target.val() as string);
            } else if (sortType === 'SelectedPodcastPlaylistSort') {
                this.playlistConfiguration.properties.SelectedPodcastPlaylistSort = getPlaylistSortEnum($target.val() as string);
            }else if (sortType === 'SelectedTelevisionPlaylistSort') {
                this.playlistConfiguration.properties.SelectedTelevisionPlaylistSort = getPlaylistSortEnum($target.val() as string);
            }
            this.playlistConfiguration.updateConfiguration()
                .then(() => this.loadView(() => LoadingModal.hideLoading()));
        });

        $(this.mediaView).find('*[data-playlist-id]').on('click', e => {
            LoadingModal.showLoading();
            this.playlistConfiguration.properties.SelectedPlaylistId = parseInt($(e.currentTarget).attr('data-playlist-id'));
            this.playlistConfiguration.properties.SelectedPlaylistPage = PlaylistPages.Playlist;
            this.playlistConfiguration.updateConfiguration()
                .then(() => this.loadView(() => LoadingModal.hideLoading()));
        });

        $(this.mediaView).find('*[data-playlist-action="remove-item"]').on('click', e => {
            const $btn = $(e.currentTarget),
                id = $btn.attr('data-item-id'),
                playlistType = $btn.attr('data-playlist-type'),
                title = 'Delete playlist item',
                message = 'Are you sure you want to delete this item from the playlist?',
                formData = new FormData();

            formData.set('id', id);
            formData.set('playlistType', playlistType);
            MessageBox.confirm(title, message, MessageBoxConfirmType.YesNo, () => {
                LoadingModal.showLoading();
                fetch_post('Playlist/RemovePlaylistItem', formData)
                    .then(_ => this.loadView(() => LoadingModal.hideLoading()));
            });
        });

        $(this.mediaView).find('[data-playlist-action="download"]').on('click', e => {
            const $btn = $(e.currentTarget),
                playlistId: string = $btn.attr('data-playlist-id'),
                playlistName: string = $btn.attr('data-playlist-name'),
                title = playlistName,
                message = 'Randomize '.concat(playlistName).concat('?'),
                path = 'Playlist/GetDynamicM3UPlaylist/'.concat(playlistId),
                randomPath = 'Playlist/GetDynamicM3UPlaylist/'.concat(playlistId).concat('?random=true'),
                $link = $('<a download></a>');

            MessageBox.confirm(title, message, MessageBoxConfirmType.YesNo,
                () => $link.attr('href', randomPath).each((index, link) => link.click()),
                () => $link.attr('href', path).each((index, link) => link.click())
            );
        });

        $(this.mediaView).find('*[data-playlist-action="delete"]').on('click', e => {
            const $btn = $(e.currentTarget),
                id = $btn.attr('data-item-id'),
                title = 'Delete playlist',
                message = 'Are you sure you want to delete this playlist?',
                formData = new FormData();

            MessageBox.confirm(title, message, MessageBoxConfirmType.YesNo, () => {
                LoadingModal.showLoading();
                formData.set('id', id);
                fetch_post('Playlist/RemovePlaylist', formData)
                    .then(_ => this.loadView(() => LoadingModal.hideLoading()));
            });
        });

        $(HtmlControls.UIControls().PlaylistTabList).find('*[data-bs-toggle="tab"]').on('shown.bs.tab', e => {
            const $newTab = $(e.target),
                $oldTab = $(e["relatedTarget"]);

            this.playlistConfiguration.properties.SelectedPlaylistTab = getPlaylistTabEnum($newTab.attr('data-playlist-tab'));
            this.playlistConfiguration.updateConfiguration();

            $(HtmlControls.UIControls().PlaylistTabList).find('*[data-sort-tab]').each((index, _btn) => {
                if ($(_btn).attr('data-sort-tab') === $newTab.attr('id')) {
                    $(_btn).addClass('d-inline-block').removeClass('d-none');
                } else {
                    $(_btn).removeClass('d-inline-block').addClass('d-none');
                }
            });
        });
    }

    private goBack(callback: () => void = () => null): void {
        this.playlistConfiguration.properties.SelectedPlaylistId = 0;
        this.playlistConfiguration.properties.SelectedPlaylistPage = PlaylistPages.Index;
        this.playlistConfiguration.updateConfiguration()
            .then(() => callback());
    }

    private applyLoadFunctions(): void {
        $(this.playlistView).find('*[data-artist-id]').on('click', e => this.loadFunctions.loadArtist(parseInt($(e.currentTarget).attr('data-artist-id'))));
        $(this.playlistView).find('*[data-album-id]').on('click', e => this.loadFunctions.loadAlbum(parseInt($(e.currentTarget).attr('data-album-id'))));
        $(this.playlistView).find('*[data-podcast-id]').on('click', e => this.loadFunctions.loadPodcast(parseInt($(e.currentTarget).attr('data-podcast-id'))));
        $(this.playlistView).find('*[data-series-id]').on('click', e => this.loadFunctions.loadSeries(parseInt($(e.currentTarget).attr('data-series-id'))));
    }
}