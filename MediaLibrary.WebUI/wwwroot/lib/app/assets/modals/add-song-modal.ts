import HtmlControls from "../controls/html-controls";
import LoadingModal from "./loading-modal";
import * as MessageBox from '../utilities/message-box';
import loadingModal from "./loading-modal";
import DirectorySelector from "../controls/directory-selector";

export default class AddNewSongModal {
    private modal: HTMLElement;
    private directorySelector: DirectorySelector;

    constructor(private loadFunc: (callback: () => void) => void = () => null) {
        this.modal = HtmlControls.Modals().NewSongModal;
        this.initializeControls();
    }

    private initializeControls(): void {
        const $modal = $(this.modal),
            $directorySelectorContainer = $modal.find('[data-container="NewSongDirectorySelector"]'),
            $musicPath = $modal.find('input[data-field="MusicPath"]');

        this.directorySelector = new DirectorySelector($directorySelectorContainer.get(0), value => $musicPath.val(value));
        $(this.modal).on('show.bs.modal', e => {
            const $modal = $(e.currentTarget);

            $modal.find('input[data-field="MusicPath"]').val('');
            $modal.find('input[type="file"]').val('');
            this.directorySelector.loadMusicDirectory();
        });

        $('[data-song-action="upload"]').on('click', e => {
            const $btn = $(e.target),
                $form = $btn.parents('form'),
                data = new FormData($form.get(0)),
                success = () => this.loadFunc(() => LoadingModal.hideLoading()),
                error = (xhr, status, error) => {
                    loadingModal.hideLoading();
                    MessageBox.showError('Error', (xhr as XMLHttpRequest).responseText);
                };

            $(this.modal).modal('hide');
            if ($form.get(0).checkValidity()) {
                LoadingModal.showLoading();
                $.ajax({
                    url: 'Music/Upload',
                    data: data,
                    processData: false,
                    contentType: false,
                    type: 'POST',
                    success: success,
                    error: error
                });
            }
        });
    }
}