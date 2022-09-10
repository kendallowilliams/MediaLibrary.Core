import bootstrap = require("bootstrap");

export function loadTooltips(parent: HTMLElement): void {
    if (parent) /*then*/ $(parent).find('*[data-bs-tooltip="tooltip"]')
        .not('[data-disabled]')
        .each((index, element) => {
            new bootstrap.Tooltip(element, { trigger: 'hover', placement: 'auto' });
        });
}

export function disposeTooltips(parent: HTMLElement): void {
    if (parent) /*then*/ $(parent).find('*[data-bs-tooltip="tooltip"]')
        .each((index, element) => {
            bootstrap.Tooltip.getInstance(element)?.dispose();
        });
}

export function loadAllTooltips(): void {
    $('*[data-bs-tooltip="tooltip"]')
        .not('[data-disabled]')
        .each((index, element) => {
            new bootstrap.Tooltip(element, { trigger: 'hover', placement: 'auto' });
        });
}

export function disposeAllTooltips(): void {
    $('*[data-bs-tooltip="tooltip"]')
        .each((index, element) => {
            bootstrap.Tooltip.getInstance(element)?.dispose();
        });
}

export function loadPopovers(parent: HTMLElement): void {
    if (parent) /*then*/ $(parent).find('*[data-bs-toggle="popover"]')
        .each((index, element) => {
            new bootstrap.Popover(element, { trigger: 'hover' });
        });

}

export function disposePopovers(parent: HTMLElement): void {
    if (parent) /*then*/ $(parent).find('*[data-bs-toggle="popover"]')
        .each((index, element) => {
            bootstrap.Popover.getInstance(element)?.dispose();
        });
}