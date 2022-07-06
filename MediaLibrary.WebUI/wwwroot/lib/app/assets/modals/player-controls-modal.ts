import HtmlControls from '../controls/html-controls';
import { MediaPages } from '../enums/enums';
import MediaLibraryConfiguration from '../models/configurations/media-library-configuration';

export default class PlayerControlsModal {
    private modal: HTMLElement;
    private autoHideTimeOut: number;

    constructor(private mediaLibraryConfiguration: MediaLibraryConfiguration) {
        this.modal = HtmlControls.Modals().PlayerControlsModal;
        this.initializeControls();
    }

    private initializeControls(): void {
        const $modal = $(this.modal);

        $modal.on('show.bs.modal', e => {
            const $playlistToggleButton = $(HtmlControls.Buttons().PlayerPlaylistToggleButtons)
                .filter((index, element) => $(this.modal).find(element).length > 0);

            if (this.mediaLibraryConfiguration.properties.SelectedMediaPage === MediaPages.Player) {
                $playlistToggleButton.removeClass('d-none');
            } else {
                $playlistToggleButton.addClass('d-none');
            }

            this.autoCloseModal();
        });
    }

    private autoCloseModal(): void {
        const delay = this.mediaLibraryConfiguration.properties.SettingsDelay;

        if (delay > 0) {
            if (this.autoHideTimeOut) /*then*/ window.clearTimeout(this.autoHideTimeOut);
            this.autoHideTimeOut = window.setTimeout(this.hide.bind(this), this.mediaLibraryConfiguration.properties.SettingsDelay * 1000);
        } else {
            this.hide();
        }
    }

    public hide(): void {
        $(this.modal).modal('hide');
    }

    public playerControlsModalChanged(): void {
        this.autoCloseModal();
    }
}