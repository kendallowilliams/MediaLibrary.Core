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

        if (this.properties.AppWidth === AppWidth.Normal) {
            $container.removeClass('container-fluid').addClass('container');
        } else {
            $container.removeClass('container').addClass('container-fluid');
        }
    }
}
