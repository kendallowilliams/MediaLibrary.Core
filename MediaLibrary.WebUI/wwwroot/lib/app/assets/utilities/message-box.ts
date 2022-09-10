import { Modal } from 'bootstrap';
import HtmlControls from '../controls/html-controls';
import { getMessageBoxConfirmTypeEnumString } from '../enums/enum-functions';
import { MessageBoxConfirmType } from '../enums/enums';

function initialize(): void {
    const $alertModal = $(HtmlControls.Modals().AlertModal),
        $confirmModal = $(HtmlControls.Modals().ConfirmModal),
        $errorModal = $(HtmlControls.Modals().ErrorModal),
        $warningModal = $(HtmlControls.Modals().WarningModal),
        $questionModal = $(HtmlControls.Modals().QuestionModal);

    jQuery.each([$alertModal, $confirmModal, $errorModal, $warningModal, $questionModal], (index, element) => {
        const $element = $(element);

        if ($element.attr('data-initialized') !== 'true') {
            $element.on('hidden.bs.modal', e => {
                const $title = $(e.currentTarget).find('.modal-title'),
                    $body = $(e.currentTarget).find('.modal-body'),
                    $footer = $(e.currentTarget).find('.modal-footer');

                $title.html('');

                if (!$questionModal.is($element)) /*then*/ $body.html('');
                else {
                    $body.find('label').text('');
                    $body.find('input').val('');
                    $footer.find('button').off();
                }
            });

            if ($confirmModal.is($element)) /*then*/ $element.find('[data-button="callback"]').off();
            $element.attr('data-initialized', 'true');
        }
    });
}

export function alert(title: string, message: string, isHtml = false): void {
    const $modal = $(HtmlControls.Modals().AlertModal),
        bsModal = Modal.getOrCreateInstance(HtmlControls.Modals().AlertModal),
        $title = $modal.find('.modal-title'),
        $body = $modal.find('.modal-body');

    if ($modal.attr('data-initialized') !== 'true') /*then*/ initialize();

    if (isHtml) {
        $title.html(title);
        $body.html(message);
    } else {
        $title.text(title);
        $body.text(message);
    }

    bsModal.show();
}

export function showError(title: string, message: string): void {
    const $modal = $(HtmlControls.Modals().ErrorModal),
        bsModal = Modal.getOrCreateInstance(HtmlControls.Modals().ErrorModal),
        $title = $modal.find('.modal-title'),
        $body = $modal.find('.modal-body');

    if ($modal.attr('data-initialized') !== 'true') /*then*/ initialize();
    $title.text(title);
    $body.text(message);
    bsModal.show();
}

export function showWarning(title: string, message: string): void {
    const $modal = $(HtmlControls.Modals().WarningModal),
        bsModal = Modal.getOrCreateInstance(HtmlControls.Modals().WarningModal),
        $title = $modal.find('.modal-title'),
        $body = $modal.find('.modal-body');

    if ($modal.attr('data-initialized') !== 'true') /*then*/ initialize();
    $title.text(title);
    $body.text(message);
    bsModal.show();
}

export function confirm(title: string, message: string,
    type: MessageBoxConfirmType = MessageBoxConfirmType.OkCancel,
    positiveCallback: () => void,
    negativeCallback: () => void = () => null): void {
    const $modal = $(HtmlControls.Modals().ConfirmModal),
        bsModal = Modal.getOrCreateInstance(HtmlControls.Modals().ConfirmModal),
        $title = $modal.find('.modal-title'),
        $body = $modal.find('.modal-body'),
        $btnContainers = $modal.find('[data-buttons]'),
        $btnContainer = $btnContainers.filter('[data-buttons="' + getMessageBoxConfirmTypeEnumString(type) + '"]');

    if ($modal.attr('data-initialized') !== 'true') /*then*/ initialize();
    $title.text(title);
    $body.text(message);
    $btnContainer.find('[data-button="yes-callback"]').off('click').on('click', () => {
        $modal.on('hide.bs.modal', () => {
            positiveCallback();
            $modal.off('hide.bs.modal');
        });
        bsModal.hide();
    });
    $btnContainer.find('[data-button="no-callback"]').off('click').on('click', () => {
        $modal.on('hide.bs.modal', () => {
            negativeCallback();
            $modal.off('hide.bs.modal');
        });
        bsModal.hide();
    });
    $btnContainers.addClass('d-none');
    $btnContainer.removeClass('d-none');
    bsModal.show();
}

export function askQuestion(title: string, question: string, callback: (answer: string) => void = _ => null): void {
    const $modal = $(HtmlControls.Modals().QuestionModal),
        bsModal = Modal.getOrCreateInstance(HtmlControls.Modals().QuestionModal),
        $title = $modal.find('.modal-title'),
        $body = $modal.find('.modal-body'),
        $footer = $modal.find('.modal-footer'),
        $label = $body.find('label'),
        $input = $body.find('input'),
        $btn = $footer.find('[data-button="submit"]');

    if ($modal.attr('data-initialized') !== 'true') /*then*/ initialize();
    $title.text(title);
    $label.text(question);
    $btn.on('click', () => {
        callback($input.val() as string);
        bsModal.hide();
    });
    bsModal.show();
}