import BaseConfiguration from './base-configuration';
import IPlayerConfiguration from '../../interfaces/player-configuration-interface';
import { MediaTypes } from '../../enums/enums';
import IKeyValuePair from '../../interfaces/keyvaluepair-interface';
import { getMediaTypesEnum } from '../../enums/enum-functions';
import IListItem from '../../interfaces/list-item-interface';

export default class PlayerConfiguration extends BaseConfiguration<IPlayerConfiguration> {
    constructor(properties: IPlayerConfiguration) {
        super('Player');
        this.properties = properties;
    }

    public updateConfiguration(): Promise<Response> {
        return super.update<IPlayerConfiguration>(this.properties);
    }

    public updateNowPlayingLists(): void {
        const mediaType = this.properties.SelectedMediaType,
            isSelected = index => index === this.properties.CurrentItemIndex,
            ids = this.properties.NowPlayingList.map((item, index) => item.Value)
                .map((id, index) => ({ Id: index, Value: id, IsSelected: isSelected(index) })),
            newItem: IKeyValuePair<MediaTypes, IListItem<number, number>[]> = { Key: mediaType, Value: ids };

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

    public hasNowPlayingListItems(mediaType: MediaTypes | string): boolean {
        let hasItems: boolean = false;

        if (typeof mediaType === 'string') /*then*/ mediaType = getMediaTypesEnum(mediaType);

        if (this.properties.NowPlayingLists.findIndex((item, index) => item.Key === mediaType) !== -1) {
            const item = this.properties.NowPlayingLists.find((item, index) => item.Key === mediaType);

            hasItems = item.Value.length > 0;
        }

        return hasItems;
    }
}
