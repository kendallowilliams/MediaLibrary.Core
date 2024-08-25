import HtmlControls from "../controls/html-controls";
import PlaylistConfiguration from "../models/configurations/playlist-configuration";
import LoadingModal from "./loading-modal";
import { loadHTML } from "../utilities/fetch_service";
import { Modal } from "bootstrap";

export default class BlankDismissableModal {
    private modal: HTMLElement;
    private modalBody: HTMLElement;
    private bsModal: Modal;

    constructor() {
        this.modal = HtmlControls.Modals().BlankDismissableModal;
        this.modal = this.modal.cloneNode(true) as HTMLElement
        this.modal.id = null;
        this.modalBody = $(this.modal).find('.modal-body').get(0);
        this.bsModal = new Modal(this.modal);
        $(this.modal).on('hidden.bs.modal', () => this.dispose());
    }

    public loadBodyHTML(url: string): Promise<string> {
        return loadHTML(this.modalBody, url);
    }

    public getHTMLElement(): HTMLElement {
        return this.modal;
    }

    public show(): void {
        this.bsModal.show();
    
    }

    public hide(): void {
        this.bsModal.hide();
        this.dispose();
    }

    private dispose(): void {
        this.bsModal.dispose();
        $(this.modal).remove();
    }
}