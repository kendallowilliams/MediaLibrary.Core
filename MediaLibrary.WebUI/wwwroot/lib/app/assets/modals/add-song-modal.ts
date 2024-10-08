﻿import HtmlControls from "../controls/html-controls";
import LoadingModal from "./loading-modal";
import * as MessageBox from '../utilities/message-box';
import DirectorySelector from "../controls/directory-selector";
import { fetch_post } from "../utilities/fetch_service";
import { Modal } from "bootstrap";
import { MlCallback } from "../types/callback.type";

export default class AddNewSongModal {
    private modal: HTMLElement;
    private directorySelector: DirectorySelector;

    constructor(private loadFunc: MlCallback<MlCallback> = () => null,
        private tooltipsEnabled: MlCallback<void, boolean> = () => false,
        private showCallback: MlCallback = () => null) {
        this.modal = HtmlControls.Modals().NewSongModal;
        this.initializeControls();
    }

    private initializeControls(): void {
        const $modal = $(this.modal),
            $directorySelectorContainer = $modal.find('[data-container="NewSongDirectorySelector"]'),
            $musicPath = $modal.find('input[data-field="MusicPath"]'),
            $file = $modal.find('input[type="file"]');

        $file.on('change', e => {
            const $fileLabel = $modal.find('label[for="' + $file.attr('id') + '"]'),
                selectedFile = $(e.target).prop('files')[0] as File;

            $fileLabel.text(selectedFile?.name || 'Choose file...');
        });
        this.directorySelector = new DirectorySelector($directorySelectorContainer.get(0), value => $musicPath.val(value), this.tooltipsEnabled);
        $(this.modal).on('show.bs.modal', e => {
            const $modal = $(e.currentTarget),
                $file = $modal.find('input[type="file"]');

            this.showCallback();
            $file.val('');
            $modal.find('input[data-field="MusicPath"]').val('');
            this.directorySelector.loadMusicDirectory();
        });

        $('[data-song-action="upload"]').on('click', e => {
            const $btn = $(e.target),
                $form = $btn.parents('form'),
                formData = new FormData($form.get(0)),
                success = () => this.loadFunc(() => LoadingModal.hideLoading()),
                error = (status) => {
                    LoadingModal.hideLoading();
                    MessageBox.showError('Error', status);
                };

            this.hide();
            if ($form.get(0).checkValidity()) {
                LoadingModal.showLoading();
                fetch_post('Music/Upload', formData)
                    .then(_ => success())
                    .catch((response: Response) => response.text().then(message => error(message)));
            }
        });
    }

    public hide(): void {
        Modal.getOrCreateInstance(this.modal).hide();
    }
}