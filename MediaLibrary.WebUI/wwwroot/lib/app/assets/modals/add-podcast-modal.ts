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
            const formData = new FormData(),
                feed = $('#txtNewPodcast').val() as string;

            if (feed.trim()) {
                $(this.modal).modal('hide');
                LoadingModal.showLoading();
                formData.set('rssFeed', feed);
                fetch_post('Podcast/AddPodcast', formData)
                    .then(_ => this.loadFunc(() => LoadingModal.hideLoading()))
                    .catch(_ => {
                        LoadingModal.hideLoading();
                        MessageBox.showError('Error', 'Failed to load podcast feed.');
                    });
            } else {
                MessageBox.showWarning("Warning", "Missing/Invalid RSS feed. Try again.")
            }
        });
    }
}