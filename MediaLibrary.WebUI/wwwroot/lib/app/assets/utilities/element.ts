﻿/* https://www.w3schools.com/howto/howto_js_fullscreen.asp */
export function openFullscreen(element: HTMLMediaElement): void {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } //else if (element.mozRequestFullScreen) { /* Firefox */
    //    element.mozRequestFullScreen();
    //} else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    //    element.webkitRequestFullscreen();
    //} else if (element.msRequestFullscreen) { /* IE/Edge */
    //    element.msRequestFullscreen();
    //}
}

/* https://www.w3schools.com/howto/howto_js_fullscreen.asp */
export function closeFullscreen(): void {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } //else if (document.mozCancelFullScreen) { /* Firefox */
    //    document.mozCancelFullScreen();
    //} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    //    document.webkitExitFullscreen();
    //} else if (document.msExitFullscreen) { /* IE/Edge */
    //    document.msExitFullscreen();
    //}
}