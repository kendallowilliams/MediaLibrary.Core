import bootstrap = require("bootstrap");

export function loadTooltips(parent: HTMLElement): void {
    if (parent) /*then*/ $(parent).find('*[data-bs-tooltip="tooltip"]')
        .not('[data-disabled]')
        .tooltip({ trigger: 'hover', placement: 'auto' });
}

export function disposeTooltips(parent: HTMLElement): void {
    if (parent) /*then*/ $(parent).find('*[data-bs-tooltip="tooltip"]').tooltip('dispose');
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
    if (parent) /*then*/ $(parent).find('*[data-bs-toggle="popover"]').popover({ trigger: 'hover' });
}

export function disposePopovers(element: HTMLElement): void {
    if (element) /*then*/ $(element).find('*[data-bs-toggle="popover"]').popover('dispose');
}