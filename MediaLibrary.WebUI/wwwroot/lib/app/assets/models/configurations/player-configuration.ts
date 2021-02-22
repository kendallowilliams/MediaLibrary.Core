﻿import BaseConfiguration from './base-configuration';
import IPlayerConfiguration from '../../interfaces/player-configuration-interface';

export default class PlayerConfiguration extends BaseConfiguration<IPlayerConfiguration> {
    constructor(properties: IPlayerConfiguration) {
        super('Player');
        this.properties = properties;
    }

    updateConfiguration(callback: () => void = () => null): void {
        super.update<IPlayerConfiguration>(this.properties, callback);
    }
}
