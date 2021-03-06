﻿import MediaLibrary from './media-library/media-library';
import HtmlControls from './assets/controls/html-controls';
import * as MessageBox from './assets/utilities/message-box';
import Error from './assets/data/error';

export default class App {
    private mediaLibrary: MediaLibrary;

    constructor() {
        this.initialize();
        this.mediaLibrary = new MediaLibrary();
    }

    private initialize(): void {
        document.onfullscreenchange = () => {
            const players = HtmlControls.Players();

            $([players.MusicPlayer, players.VideoPlayer]).prop('controls', document.fullscreen);
        };
        window.onerror = (message: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
            if (!Error.Ignored.includes(message as string)) {
                MessageBox.showError('Error', error ? error.message : message as string);
            }
        };
    }
}