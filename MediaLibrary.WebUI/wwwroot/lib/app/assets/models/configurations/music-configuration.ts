import BaseConfiguration from './base-configuration';
import IMusicConfiguration from '../../interfaces/music-configuration-interface';

export default class MusicConfiguration extends BaseConfiguration<IMusicConfiguration> {
    constructor(properties: IMusicConfiguration) {
        super('Music');
        this.properties = properties;
    }

    updateConfiguration(): Promise<Response> {
        return super.update<IMusicConfiguration>(this.properties);
    }
}
