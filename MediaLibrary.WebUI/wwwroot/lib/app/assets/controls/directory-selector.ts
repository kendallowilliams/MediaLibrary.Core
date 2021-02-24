import { disposeTooltips, loadTooltips } from "../utilities/bootstrap-helper";
import LoadingModal from "../modals/loading-modal";

export default class DirectorySelector {
    constructor(private container: HTMLElement, private onSelectionChanged: (value: string) => any) {
    }

    public loadMusicDirectory(path: string = null): void {
        LoadingModal.showLoading();
        disposeTooltips(this.container);
        $(this.container).load('Music/GetDirectorySelector?path=' + path, () => {
            const $container = $(this.container);

            $container.find('[data-directory-action="get"]').on('click', e => {
                const path = $(e.currentTarget).attr('data-directory-path');

                this.loadMusicDirectory(encodeURIComponent(path));
            });
            loadTooltips(this.container);
            $container.find('input[type="radio"]').on('change', e => this.selectionChanged(e.target as HTMLInputElement));
            LoadingModal.hideLoading();
        });
    }

    public selectionChanged(radio: HTMLInputElement): void {
        if (radio.checked) /*then*/ this.onSelectionChanged(radio.value);
    }
}