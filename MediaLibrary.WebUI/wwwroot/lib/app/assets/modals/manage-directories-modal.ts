import HtmlControls from '../controls/html-controls';
import MediaLibraryConfiguration from '../models/configurations/media-library-configuration';
import LoadingModal from './loading-modal';
import { loadTooltips, hideTooltips } from "../../assets/utilities/bootstrap-helper";
import * as MessageBox from '../../assets/utilities/message-box';
import { MessageBoxConfirmType } from '../enums/enums';
import { fetch_get, fetch_post, loadHTML } from '../utilities/fetch_service';
import { Modal } from 'bootstrap';
import { MlCallback } from '../types/callback.type';

export default class ManageDirectoriesModal {
    private modal: HTMLElement;

    constructor(private loadFunc: (callback: MlCallback) => void = () => null,
        private tooltipsEnabled: MlCallback<void, boolean> = () => false,
        private showCallback: MlCallback = () => null) {
        this.modal = HtmlControls.Modals().ManageDirectoriesModal;
        this.initializeControls();
    }

    private initializeControls(): void {
        $(this.modal).on('show.bs.modal', e => {
            this.showCallback();
        });

        $(this.modal).on('hide.bs.modal', e => {
            hideTooltips(this.modal);
            $(this.modal).find('.modal-body').html('');
        });
        
        $('[data-settings-action="manage-directories"]').on('click', e => {
            const bsModal = Modal.getOrCreateInstance(this.modal);

            this.loadMusicDirectory(null, () => bsModal.show());
        });
    }

    private loadMusicDirectory(_path: string = null, callback: MlCallback = () => null): void {
        const $modal = $(this.modal);

        LoadingModal.showLoading();
        hideTooltips(this.modal);
        loadHTML($modal.find('.modal-body').get(0), 'Music/GetMusicDirectory', { path: (_path || '') })
            .then(_ => {
                const $modal = $(this.modal);

                $modal.find('[data-directory-action="get"]').on('click', e => {
                    const path = $(e.currentTarget).attr('data-directory-path');

                this.loadMusicDirectory(path);
            });
            $modal.find('[data-directory-action-type="remove"]').on('click', e => {
                this.removeMusicDirectory(e.currentTarget);
            });
            $modal.find('[data-directory-action-type="add"]').on('click', e => {
                this.addMusicDirectory(e.currentTarget);
            });
            if (this.tooltipsEnabled()) /*then*/ loadTooltips(this.modal);
            callback();
            LoadingModal.hideLoading();
            this.refreshDirectories();
        });
    }

    private addMusicDirectory(btn: HTMLElement): void {
        const $btn = $(btn),
            action = $btn.attr('data-directory-action'),
            path = $btn.attr('data-directory-path'),
            title = 'Add directory',
            message = 'Are you sure you want to add '.concat(path).concat('?'),
            formData = new FormData();

        formData.set('path', path);
        MessageBox.confirm(title, message, MessageBoxConfirmType.YesNo, () => {
            LoadingModal.showLoading();
            this.hide();
            fetch_post(action, formData)
                .then(_ => LoadingModal.hideLoading());
        });
    }

    private removeMusicDirectory(btn: HTMLElement): void {
        const $btn = $(btn),
            action = $btn.attr('data-directory-action'),
            id = $btn.attr('data-path-id'),
            title = 'Remove directory',
            message = 'Are you sure you want to remove this directory?',
            formData = new FormData();

        formData.set('id', id);
        MessageBox.confirm(title, message, MessageBoxConfirmType.YesNo, () => {
            LoadingModal.showLoading();
            this.hide();
            fetch_post(action, formData)
                .then(_ => this.loadFunc(() => LoadingModal.hideLoading()));
        });
    }

    private refreshDirectories(id: string = null): void {
        const $items = !id ? $('[data-directory-status="loading"]') :
                             $('[data-directory-status="monitoring"][data-transaction-id="' + id + '"]');

        if ($items.length > 0) /*then*/ window.setTimeout(() => {
            $items.each((index, element) => {
                const itemId = $(element).attr('data-transaction-id');

                $(element).attr('data-directory-status', 'monitoring');
                fetch_get('Music/IsScanCompleted', { id: itemId })
                    .then(response => response.text())
                    .then(data => {
                        if (data && (data as string).toLowerCase() === 'false') {
                            this.refreshDirectories(itemId);
                        } else {
                            $(element).find('i').replaceWith('<i class="fa fa-check"></i>');
                        }
                    });
            });
        }, 5000);
    }

    public hide(): void {
        Modal.getOrCreateInstance(this.modal).hide();
    }
}