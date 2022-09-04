import htmlControls from "../controls/html-controls";
import PlaylistConfiguration from "../models/configurations/playlist-configuration";
import LoadingModal from "./loading-modal";
import { getPlaylistTabEnumString } from "../enums/enum-functions";
import { fetch_post } from "../utilities/fetch_service";
import { Modal } from "bootstrap";

export default class AddNewPlaylistModal {
    private modal: HTMLElement;

    constructor(private loadFunc: (callback: () => void) => void = () => null, private playlistConfiguration: PlaylistConfiguration) {
        this.modal = htmlControls.Modals().NewPlaylistModal;
        this.initializeControls();
    }

    private initializeControls(): void {
        $(this.modal).on('show.bs.modal', e => {
            $('#txtNewPlaylist').val('');
            $('#ddlPlaylistType').val(getPlaylistTabEnumString(this.playlistConfiguration.properties.SelectedPlaylistTab)).prop('disabled', true);
        });

        $(this.modal).find('*[data-playlist-action="save"]').on('click', e => {
            const formData = new FormData(),
                bsModal = Modal.getOrCreateInstance(this.modal);

            formData.set('playlistName', $('#txtNewPlaylist').val() as string);
            formData.set('playlistType', $('#ddlPlaylistType').val() as string);

            LoadingModal.showLoading();
            $(this.modal).on('hidden.bs.modal', () => fetch_post('Playlist/AddPlaylist', formData)
                .then(_ => this.loadFunc(() => LoadingModal.hideLoading())));
            bsModal.hide();
        });
    }
}