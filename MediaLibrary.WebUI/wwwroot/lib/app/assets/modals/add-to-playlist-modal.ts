import { Modal } from "bootstrap";
import HtmlControls from "../controls/html-controls";
import { getMediaTypeForPlaylistTab, getPlaylistTabEnum } from "../enums/enum-functions";
import { PlaylistTabs, MediaTypes } from "../enums/enums";
import { fetch_post, loadHTML } from "../utilities/fetch_service";
import LoadingModal from "./loading-modal";

export default class AddToPlaylistModal {
    private modal: HTMLElement;

    constructor(private toggleDarkMode: (container) => void,
        private addItemToNowPlayingList: (id: number, type: MediaTypes) => void,
        private getSelectedMediaType: () => MediaTypes) {
        this.modal = HtmlControls.Modals().AddToPlaylistModal;
        this.initializeControls();
    }

    private initializeControls(): void {
        $(this.modal).on('show.bs.modal', e => {
            const $btn = $(e["relatedTarget"]),
                url = $btn.attr('data-playlist-url'),
                id = $btn.attr('data-item-id'),
                type = $btn.attr('data-playlist-type');

            loadHTML(HtmlControls.Containers().PlaylistListContainer, 'Playlist/PlaylistList', { type: type })
                .then(_ => {
                    const bsModal = Modal.getOrCreateInstance(this.modal),
                        $nowPlayingBtn = $('[data-playlist-type="now-playing"]'),
                        playlistTab = getPlaylistTabEnum(type),
                        mediaType = getMediaTypeForPlaylistTab(playlistTab),
                        mediaTypeMismatch = mediaType != this.getSelectedMediaType();

                    $('[data-playlist-item="enabled"]').attr('data-playlist-url', url)
                        .attr('data-item-id', id);
                    $nowPlayingBtn.attr('data-playlist-type', type);
                    $('[data-validate-media-type="true"]').toggleClass('d-none', mediaTypeMismatch);

                    $('[data-playlist-action="add"]').on('click', e => {
                        const $btn = $(e.currentTarget),
                            url = $btn.attr('data-playlist-url'),
                            id = $btn.attr('data-item-id'),
                            playlistId = $btn.attr('data-playlist-id'),
                            formData = new FormData();

                        formData.set('playlistId', playlistId);
                        formData.set('itemId', id);
                        LoadingModal.showLoading()
                        bsModal.hide();
                        fetch_post(url, formData)
                            .then(_ => LoadingModal.hideLoading());
                    });

                    $nowPlayingBtn.on('click', () => {
                        this.addItemToNowPlayingList(parseInt(id), mediaType);
                        bsModal.hide();
                    });

                    this.toggleDarkMode(this.modal);
                });
        });

        $(this.modal).on('hide.bs.modal', function (e) {
            $('[data-playlist-item="enabled"]').attr('data-playlist-url', '');
            $('[data-playlist-item="enabled"]').attr('data-item-id', '');
        });
    }
}