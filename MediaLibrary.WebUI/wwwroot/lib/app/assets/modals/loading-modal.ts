import { Modal } from 'bootstrap';
import HtmlControls from '../controls/html-controls';

export default {
    showLoading: function (): void {
        const bsModal = Modal.getOrCreateInstance(HtmlControls.Modals().LoadingModal),
            $modal = $(HtmlControls.Modals().LoadingModal);
        let processCount = parseInt($modal.attr('data-process-count'));

        if (!isNaN(processCount)) {
            $modal.attr('data-process-count', processCount++);
        } else {
            $modal.attr('data-process-count', 1);
        }

        bsModal.show();
    },
    hideLoading: function (): void {
        const bsModal = Modal.getOrCreateInstance(HtmlControls.Modals().LoadingModal),
            $modal = $(HtmlControls.Modals().LoadingModal);
        let processCount = parseInt($modal.attr('data-process-count'));

        if (!isNaN(processCount)) {
            $modal.attr('data-process-count', processCount--);

            if (processCount == 0) /*then*/ bsModal.hide();
        } else {
            $modal.attr('data-process-count', 0);
        }
    }
};