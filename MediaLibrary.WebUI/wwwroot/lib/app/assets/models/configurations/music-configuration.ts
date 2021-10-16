import BaseConfiguration from './base-configuration';
import IMusicConfiguration from '../../interfaces/music-configuration-interface';
import * as MessageBox from '../../../assets/utilities/message-box';

export default class MusicConfiguration extends BaseConfiguration<IMusicConfiguration> {
    constructor(properties: IMusicConfiguration) {
        super('Music');
        this.properties = properties;
    }

    updateConfiguration(): Promise<Response> {
        return super.update<IMusicConfiguration>(this.properties)
            .catch(response => {
                response.text().then(text => MessageBox.showError('Error', text));
                return response;
            });;
    }
}
