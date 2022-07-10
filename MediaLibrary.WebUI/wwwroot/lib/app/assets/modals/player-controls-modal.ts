import HtmlControls from '../controls/html-controls';
import PlayerControls from '../controls/player-controls';
import { MediaPages, MediaTypes } from '../enums/enums';
import MediaLibraryConfiguration from '../models/configurations/media-library-configuration';
import PlayerConfiguration from '../models/configurations/player-configuration';

export default class PlayerControlsModal {
    private modal: HTMLElement;
    private autoHideTimeOut: number;

    constructor(private mediaLibraryConfiguration: MediaLibraryConfiguration, private playerControls: PlayerControls) {
        this.modal = HtmlControls.Modals().PlayerControlsModal;
        this.initializeControls();
    }

    private initializeControls(): void {
        const $modal = $(this.modal),
            buttons = HtmlControls.Buttons();

        $modal.on('show.bs.modal', e => {
            const $playlistToggleButton = $(buttons.PlayerPlaylistToggleButtons)
                .filter((index, element) => $(this.modal).find(element).length > 0);

            if (this.mediaLibraryConfiguration.properties.SelectedMediaPage === MediaPages.Player) {
                $playlistToggleButton.removeClass('d-none');
            } else {
                $playlistToggleButton.addClass('d-none');
            }

            this.playerControls.showHideAudioVisualizer();
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