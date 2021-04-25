import BaseConfiguration from './base-configuration';
import IMediaLibraryConfiguration from '../../interfaces/media-library-configuration-interface';
import { AppWidth } from '../../enums/enums';

export default class MediaLibraryConfiguration extends BaseConfiguration<IMediaLibraryConfiguration> {
    constructor(public properties: IMediaLibraryConfiguration) {
        super('MediaLibrary');
    }

    updateConfiguration(callback: () => void = () => null): void {
        super.update<IMediaLibraryConfiguration>(this.properties, () => {
            this.applyConfiguration();
            callback();
        });
    }

    private applyConfiguration(): void {
        const $container = $(document.body).find('div').first();

        $container.removeClass('container-fluid container');
        $container.addClass(this.properties.AppWidth === AppWidth.Normal ? 'container' : 'container-fluid');
    }
}
