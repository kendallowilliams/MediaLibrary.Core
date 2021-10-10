﻿export function loadTooltips(parent: HTMLElement): void {
    if (parent) /*then*/ $(parent).find('*[data-tooltip="tooltip"]')
        .not('[data-disabled]')
        .tooltip({ trigger: 'hover', placement: 'auto' });
}

export function disposeTooltips(parent: HTMLElement): void {
    if (parent) /*then*/ $(parent).find('*[data-tooltip="tooltip"]').tooltip('dispose');
}

export function loadAllTooltips(): void {
    if (parent) /*then*/ $('*[data-tooltip="tooltip"]')
        .not('[data-disabled]')
        .tooltip({ trigger: 'hover', placement: 'auto' });
}

export function disposeAllTooltips(): void {
    if (parent) /*then*/ $('*[data-tooltip="tooltip"]').tooltip('dispose');
}

export function loadPopovers(parent: HTMLElement): void {
    if (parent) /*then*/ $(parent).find('*[data-toggle="popover"]').popover({ trigger: 'hover' });
}

export function disposePopovers(element: HTMLElement): void {
    if (element) /*then*/ $(element).find('*[data-toggle="popover"]').popover('dispose');
}