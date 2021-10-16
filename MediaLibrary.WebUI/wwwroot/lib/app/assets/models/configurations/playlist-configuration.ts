import BaseConfiguration from './base-configuration';
import IPlaylistConfiguration from '../../interfaces/playlist-configuration-interface';

export default class PlaylistConfiguration extends BaseConfiguration<IPlaylistConfiguration> {
    constructor(properties: IPlaylistConfiguration) {
        super('Playlist');
        this.properties = properties;
    }

    updateConfiguration(): Promise<Response> {
        return super.update<IPlaylistConfiguration>(this.properties);
    }
}
