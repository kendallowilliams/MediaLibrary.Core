import BaseConfiguration from './base-configuration';
import IPlayerConfiguration from '../../interfaces/player-configuration-interface';
import { MediaTypes } from '../../enums/enums';
import IKeyValuePair from '../../interfaces/keyvaluepair-interface';

export default class PlayerConfiguration extends BaseConfiguration<IPlayerConfiguration> {
    constructor(properties: IPlayerConfiguration) {
        super('Player');
        this.properties = properties;
    }

    updateConfiguration(): Promise<Response> {
        return super.update<IPlayerConfiguration>(this.properties);
    }

    public updateNowPlayingLists(): void {
        const mediaType = this.properties.SelectedMediaType,
            ids = this.properties.NowPlayingList.map((item, index) => item.Value),
            newItem: IKeyValuePair<MediaTypes, number[]> = { Key: mediaType, Value: ids };

        if (ids) {
            if (this.properties.NowPlayingLists.findIndex((item, index) => item.Key === mediaType) !== -1) {
                const itemToUpdate = this.properties.NowPlayingLists.find((item, index) => item.Key === mediaType);

                itemToUpdate.Value = ids;
            } else {
                this.properties.NowPlayingLists.push(newItem);
            }
        }
    }

    public clearNowPlayingList(mediaType: MediaTypes): void {
        if (this.properties.NowPlayingLists.findIndex((item, index) => item.Key === mediaType) !== -1) {
            const itemToUpdate = this.properties.NowPlayingLists.find((item, index) => item.Key === mediaType);

            itemToUpdate.Value = [];
        }
    }
}
