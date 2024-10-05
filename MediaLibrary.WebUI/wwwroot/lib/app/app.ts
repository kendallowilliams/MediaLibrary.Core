import MediaLibrary from './media-library/media-library';
import HtmlControls from './assets/controls/html-controls';
import * as MessageBox from './assets/utilities/message-box';
import Error from './assets/data/error';
import * as signalR from '@microsoft/signalr';

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
                const formattedMessage = `
                    Message: ${JSON.stringify(message)}
                    Source: ${source}
                    Line No: ${lineno}
                    Col No: ${colno}
                    Error: ${JSON.stringify(error)}
                `;

                MessageBox.showError('Error', formattedMessage);
            }
        };
        window.onbeforeunload = (evt: Event) => {
            if (this.mediaLibrary.getPromptBeforeUnload()) {
                evt.preventDefault();
                evt.returnValue = false;
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