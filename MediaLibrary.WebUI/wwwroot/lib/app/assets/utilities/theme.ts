export function setSystemTheme(autoUpdate: boolean = false): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const setDarkMode = () => $(document.documentElement).attr('data-bs-theme', mediaQuery.matches ? 'dark' : 'light');

    setDarkMode();
    if (autoUpdate) {
        $(mediaQuery).on('change', () => setDarkMode());
    }
}