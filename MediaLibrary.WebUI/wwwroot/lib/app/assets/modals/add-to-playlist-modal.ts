﻿import { Modal } from "bootstrap";
import HtmlControls from "../controls/html-controls";
import { fetch_post, loadHTML } from "../utilities/fetch_service";
import LoadingModal from "./loading-modal";

export default class AddToPlaylistModal {
    private modal: HTMLElement;

    constructor(private toggleDarkMode: (container) => void) {
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
                    const bsModal = Modal.getOrCreateInstance(this.modal);

                    $('[data-playlist-item="enabled"]').attr('data-playlist-url', url);
                    $('[data-playlist-item="enabled"]').attr('data-item-id', id);

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

                    this.toggleDarkMode(this.modal);
                });
        });

        $(this.modal).on('hide.bs.modal', function (e) {
            $('[data-playlist-item="enabled"]').attr('data-playlist-url', '');
            $('[data-playlist-item="enabled"]').attr('data-item-id', '');
        });
    }
}