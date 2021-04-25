import BaseClass from "../../assets/models/base-class";
import IView from "../../assets/interfaces/view-interface";
import HtmlControls from '../../assets/controls/html-controls';
import IConfigurations from "../../assets/interfaces/configurations-interface";
import { getAppWidthEnum } from "../../assets/enums/enum-functions";

export default class Settings extends BaseClass implements IView {
    private settingsView: HTMLElement;

    constructor(private configurations: IConfigurations) {
        super();
        this.settingsView = HtmlControls.Views().SettingsView;
    }

    loadView(callback: () => void = () => null): void {
        const url = $(this.settingsView).attr('data-action-url');

        $(this.settingsView).load(url, () => {
            this.initializeControls();
            callback();
        });
    }

    private initializeControls(): void {
        $(this.settingsView).find('select[name="AppWidth"]').on('change', e => {
            const width = $(e.currentTarget).val() as string;

            this.configurations.MediaLibary.properties.AppWidth = getAppWidthEnum(width);
            this.configurations.MediaLibary.updateConfiguration();
        });
    }
}