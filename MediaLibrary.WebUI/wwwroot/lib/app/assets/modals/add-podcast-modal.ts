import HtmlControls from "../controls/html-controls";
import LoadingModal from './loading-modal';
import * as MessageBox from '../utilities/message-box';
import { fetch_post } from "../utilities/fetch_service";

export default class AddNewPodcastModal {
    private modal: HTMLElement;

    constructor(private loadFunc: (callback: () => void) => void = () => null) {
        this.modal = HtmlControls.Modals().NewPodcastModal;
        this.initializeControls();
    }

    private initializeControls(): void {
        $(this.modal).on('show.bs.modal', e => {
            $('#txtNewPodcast').val('');
        });

        $(this.modal).find('*[data-podcast-action="save"]').on('click', e => {
            LoadingModal.showLoading();
            $(this.modal).modal('hide').on('hidden.bs.modal', () => {
                const formData = new FormData();

                formData.set('rssFeed', $('#txtNewPodcast').val() as string);
                fetch_post('Podcast/AddPodcast', formData)
                    .then(_ => this.loadFunc(() => LoadingModal.hideLoading()))
                    .catch(_ => {
                        LoadingModal.hideLoading();
                        MessageBox.showError('Error', 'Failed to load podcast feed.');
                    });
            });
        });
    }
}