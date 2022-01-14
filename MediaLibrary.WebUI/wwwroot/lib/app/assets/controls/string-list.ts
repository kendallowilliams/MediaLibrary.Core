import HtmlControls from "./html-controls";

export default class StringList {
    private $itemsContainer: JQuery<HTMLElement>;
    private $pathInput: JQuery<HTMLElement>;

    constructor(private stringListElement: HTMLElement,
        private items: string[] = [],
        private addCallback: (list: string[], hasChanged: boolean) => void = _ => null,
        private removeCallback: (list: string[], hasChanged: boolean) => void = _ => null,
        private addValidator: (item: string) => Promise<boolean> = _ => Promise.resolve(true),
        private removeValidator: (item: string) => Promise<boolean> = _ => Promise.resolve(true)) {
        this.initialize();
    }

    private initialize(): void {
        const controls = HtmlControls.UIControls().StringLists,
            $stringListElement = $(this.stringListElement);

        if ($(controls).has(this.stringListElement)) {
            const $addBtn = $(this.stringListElement).find('[data-button="add-item"]'),
                $removeBtn = $(this.stringListElement).find('[data-button="remove-item"]');

            this.$itemsContainer = $stringListElement.find('[data-container=StringListItems]');
            this.$pathInput = $stringListElement.find('input');
            $addBtn.on('click', () => this.addItem(this.addCallback));
            $removeBtn.on('click', e => this.removeItem(e.currentTarget as HTMLButtonElement, this.removeCallback));
        }
    }

    private addItem(callback: (list: string[], hasChanged: boolean) => void = _ => null): void {
        const $itemTemplate = this.$itemsContainer.find('[data-template="StringListItem"]').clone(true),
            $itemField = $itemTemplate.find('[data-field]'),
            item = this.$pathInput.val() as string;
        let items: string[] = [],
            $listItems = jQuery<HTMLElement>();

        this.addValidator(item).then(valid => {
            if (valid) {
                $itemField.text(item);
                $itemTemplate.removeClass('d-none').removeAttr('data-template')
                this.$itemsContainer.append($itemTemplate);
                items = this.$itemsContainer.find('[data-field]')
                    .map((index, element) => $(element).text())
                    .filter((index, element) => !!element)
                    .toArray()
                    .sort();
                $listItems = this.$itemsContainer.find('.input-group').not('[data-template]')
                items.forEach((item, index) => {
                    const $item = $listItems.has(':contains("' + item + '")');

                    this.$itemsContainer.append($item);
                });
                callback(items, true);
                this.$pathInput.val('');
            }
        });
    }

    private removeItem(btn: HTMLButtonElement, callback: (list: string[], hasChanged: boolean) => void = _ => null): void {
        const $item = $(btn.parentNode.parentNode),
            item: string = $item.find('[data-field]').text();
        let items: string[] = [];

        this.removeValidator(item).then(valid => {
            if (valid) {
                $(btn.parentNode.parentNode).remove();
                items = this.$itemsContainer.find('[data-field]')
                    .map((index, element) => $(element).text())
                    .filter((index, element) => !!element)
                    .toArray();
                callback(items, true);
            }
        });
    }

    public load(items: string[] = []): void {
        const $template = this.$itemsContainer.find('[data-template="StringListItem"]').clone(true);

        this.$itemsContainer.empty();
        this.$itemsContainer.append($template);

        items.forEach((item, index) => {
            const $itemTemplate = $template.clone(true),
                $itemField = $itemTemplate.find('[data-field]');

            $itemField.text(item);
            $itemTemplate.removeClass('d-none').removeAttr('data-template')
            this.$itemsContainer.append($itemTemplate);
        });
    }
}