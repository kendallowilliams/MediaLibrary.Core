import { getMediaTypesEnumString } from "../enums/enum-functions";
import { MediaTypes } from "../enums/enums";

export function set(key: string, value: string): void {
    window.localStorage.setItem(key, value);
}

export function get(key: string): string {
    return window.localStorage.getItem(key);
}

export function clear(): void {
    window.localStorage.clear();
}

export function removeItem(key: string): void {
    window.localStorage.removeItem(key);
}

export function getKeys() : string[] {
    let keys: Array<string> = [];

    for (let i = 0; i < window.localStorage.length; i++) /*then*/ { keys.push(window.localStorage.key(i)); }

    return keys;
}

export function containsKey(key: string): boolean {
    return getKeys().includes(key);
}

/* KEY GENERATORS */

export function getPlayerProgressKey(id: number | string, mediaType: MediaTypes): string {
    return id ? 'Player_Progress_' + getMediaTypesEnumString(mediaType) + '_' + id.toString() : null;
}