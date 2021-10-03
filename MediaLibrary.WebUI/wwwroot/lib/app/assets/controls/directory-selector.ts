import { disposeTooltips, loadTooltips } from "../utilities/bootstrap-helper";
import LoadingModal from "../modals/loading-modal";
import { loadHTML } from "../utilities/fetch_service";

export default class DirectorySelector {
    constructor(private container: HTMLElement, private onSelectionChanged: (value: string) => any) {
    }

    public loadMusicDirectory(_path: string = null): void {
        LoadingModal.showLoading();
        disposeTooltips(this.container);
        loadHTML(this.container, 'Music/GetDirectorySelector', { path: _path })
            .then(_ => {
                const $container = $(this.container);

                $container.find('[data-directory-action="get"]').on('click', e => {
                    const path = $(e.currentTarget).attr('data-directory-path');

                this.loadMusicDirectory(path);
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