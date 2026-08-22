import HtmlControls from '../../assets/controls/html-controls';

export function toggleGlobalDarkMode(darkModeEnabled: boolean): void {
    const body = document.body,
        controls = HtmlControls.UIControls(),
        playerTimes = Array.from(controls.PlayerTimes),
        playerShortTimes = Array.from(controls.PlayerShortTimes),
        views = HtmlControls.Views();

    $(body).toggleClass('bg-black text-white', darkModeEnabled);
    $(views.HomeView).find('[data-container="HomeContent"]')
        .toggleClass('bg-dark text-light', darkModeEnabled)
        .toggleClass('bg-light', !darkModeEnabled);
    $(body).find('.navbar')
        .toggleClass('border rounded navbar-dark', darkModeEnabled)
        .toggleClass('navbar-light bg-light', !darkModeEnabled)
        .find('.nav-link')
        .toggleClass('text-light', darkModeEnabled)
        .filter('.disabled')
        .toggleClass('text-dark', !darkModeEnabled);
    $(body).find('.navbar-brand').toggleClass('border rounded', darkModeEnabled);
    $(HtmlControls.Containers().MainControlsContainers)
            .children('[data-section="controls"]')
        .toggleClass('bg-transparent', darkModeEnabled)
        .toggleClass('bg-light', !darkModeEnabled);
    $(playerTimes.concat(playerShortTimes))
            .toggleClass('text-light', darkModeEnabled)
        .toggleClass('text-secondary', !darkModeEnabled);
    toggleDarkMode(body, darkModeEnabled);
}

export function toggleDarkMode(container: HTMLElement | JQuery, darkModeEnabled: boolean): void {
    const $container = $(container);

    $container.find('.card').toggleClass('bg-transparent border', darkModeEnabled);
    $container.find('.accordion-item, .accordion-button')
        .toggleClass('bg-transparent', darkModeEnabled)
        .find('.accordion-button')
        .toggleClass('text-dark', !darkModeEnabled)
        .toggleClass('text-light', darkModeEnabled);
    $container.find('.list-group-item')
        .toggleClass('bg-transparent border-top text-white', darkModeEnabled)
        .filter('.active')
        .removeClass('bg-transparent');
    $container.find('.modal-content').toggleClass('bg-dark text-white', darkModeEnabled);
    $container.find('.page-link, .btn-link')
        .toggleClass('bg-transparent text-white', darkModeEnabled)
        $container.find('hr').toggleClass('bg-white', darkModeEnabled);
    $container.find('.btn-outline-secondary, .btn-outline-light')
        .not('[data-podcast-item-options] .btn')
        .toggleClass('btn-outline-light', darkModeEnabled)
        .toggleClass('btn-outline-secondary', !darkModeEnabled);
    $container.find('input:not([type="checkbox"]), .input-group-text, select')
        .toggleClass('bg-transparent text-light', darkModeEnabled);
    $container.find('option').toggleClass('bg-dark', darkModeEnabled);
}