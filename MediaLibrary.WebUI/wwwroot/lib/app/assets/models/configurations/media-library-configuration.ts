import BaseConfiguration from './base-configuration';
import IMediaLibraryConfiguration from '../../interfaces/media-library-configuration-interface';
import { AppWidth } from '../../enums/enums';
import { loadAllTooltips, disposeAllTooltips } from '../../utilities/bootstrap-helper';

export default class MediaLibraryConfiguration extends BaseConfiguration<IMediaLibraryConfiguration> {
    constructor(public properties: IMediaLibraryConfiguration) {
        super('MediaLibrary');
        this.applyConfiguration();
    }

    updateConfiguration(): Promise<Response> {
        return super.update<IMediaLibraryConfiguration>(this.properties)
            .then(response => {
                this.applyConfiguration();
                return response;
            });
    }

    private applyConfiguration(): void {
        const $container = $(document.body).find('div').first(),
            $tooltips = $('*[data-bs-tooltip="tooltip"]');

        $container.removeClass('container-fluid container');
        $container.addClass(this.properties.AppWidth === AppWidth.Normal ? 'container' : 'container-fluid');
        $tooltips.attr('data-disabled', 'true');
        disposeAllTooltips();

        if (this.properties.TooltipsEnabled) {
            $tooltips.removeAttr('data-disabled');
            loadAllTooltips();
        }
    }
}
