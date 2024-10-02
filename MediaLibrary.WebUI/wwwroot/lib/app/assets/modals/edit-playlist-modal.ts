import { Modal } from "bootstrap";
import HtmlControls from "../controls/html-controls";
import { MlCallback } from "../types/callback.type";
import { fetch_post } from "../utilities/fetch_service";
import LoadingModal from "./loading-modal";

export default class EditPlaylistModal {
    private modal: HTMLElement;

    constructor(private loadFunc: MlCallback<MlCallback> = () => null) {
        this.modal = HtmlControls.Modals().EdiPlaylistModal;
        this.initializeControls();
    }

    private initializeControls(): void {
        $(this.modal).on('show.bs.modal', function (e) {
            $('#txtPlaylistId').val($(e["relatedTarget"]).attr('data-item-id'));
            $('#txtPlaylistName').val($(e["relatedTarget"]).attr('data-item-name'));
        });

        $('[data-playlist-action="edit"]').on('click', e => {
            const formData = new FormData(),
                bsModal = Modal.getOrCreateInstance(this.modal);

            formData.set('id', $('#txtPlaylistId').val() as string);
            formData.set('name', $('#txtPlaylistName').val() as string);

            $(this.modal).on('hidden.bs.modal', () => {
                LoadingModal.showLoading();
                $('#txtPlaylistId, #txtPlaylistName').val('');
                fetch_post('Playlist/EditPlaylist', formData)
                    .then(_ => this.loadFunc(() => LoadingModal.hideLoading()));
            });
            bsModal.hide();
        });
    }
}