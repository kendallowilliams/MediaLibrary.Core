import MediaLibrary from './media-library/media-library';
import HtmlControls from './assets/controls/html-controls';
import * as MessageBox from './assets/utilities/message-box';
import Error from './assets/data/error';
import * as signalR from '@microsoft/signalr';
import { isFullScreen } from './assets/utilities/element';

export default class App {
    private mediaLibrary: MediaLibrary;

    constructor() {
        this.initialize();
        this.mediaLibrary = new MediaLibrary();
    }

    private initialize(): void {
        document.onfullscreenchange = () => {
            const players = HtmlControls.Players();

            $([players.MusicPlayer, players.VideoPlayer]).prop('controls', isFullScreen());
        };
        window.onerror = (message: Event | string, source?: string, lineno?: number, colno?: number, error?: Error) => {
            if (!Error.Ignored.includes(message as string)) {
                MessageBox.showError('Error', error ? error.message : message as string);
            }
        };
        window.onbeforeunload = (evt: Event) => {
            if (this.mediaLibrary.getPromptBeforeUnload()) {
                evt.preventDefault();
            }
        };
        window.onkeydown = (evt: KeyboardEvent) => this.mediaLibrary.handleKeyDown(evt);
    }

    private testSignalR(): void {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('/medialibraryhub')
            .build();

        connection.on('testCalled', (message) => {
            MessageBox.alert('SignalR', message);
            connection.stop();
        });

        connection.start()
            .then(() => connection.send('test'))
            .catch((err) => MessageBox.showError('Error', err));
    }
}