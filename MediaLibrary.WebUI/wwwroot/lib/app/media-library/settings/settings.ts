import BaseClass from "../../assets/models/base-class";
import IView from "../../assets/interfaces/view-interface";
import HtmlControls from '../../assets/controls/html-controls';

export default class Settings extends BaseClass implements IView {
    constructor() {
        super();
    }

    loadView(callback: () => void = () => null): void {
        const settingsView: HTMLElement = HtmlControls.Views().SettingsView,
            url = $(settingsView).attr('data-action-url');

        $(settingsView).load(url, () => callback());
    }
}