import BaseConfiguration from './base-configuration';
import IPodcastConfiguration from '../../interfaces/podcast-configuration-interface';

export default class PodcastConfiguration extends BaseConfiguration<IPodcastConfiguration> {
    constructor(properties: IPodcastConfiguration) {
        super('Podcast');
        this.properties = properties;
    }

    updateConfiguration(): Promise<Response> {
        return super.update<IPodcastConfiguration>(this.properties);
    }
}
