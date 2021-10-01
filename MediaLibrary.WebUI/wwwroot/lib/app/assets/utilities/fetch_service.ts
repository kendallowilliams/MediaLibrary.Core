export function get(url: string, params: [{ Key: string, Value: string }], callback: () => void = () => null) {
    const requestInit: RequestInit = {
        method: 'GET'
    },
        queryString = params && params.length > 0 ? '?' + params.toString() : '';

    fetch(url + queryString, requestInit)
        .then(_ => callback());
}

export function post(url: string, body: BodyInit, callback: () => void = () => null) {
    const requestInit: RequestInit = {
        method: 'POST',
        body: body
    };

    fetch(url, requestInit)
        .then(_ => callback());
}

export function loadHTML(element: HTMLElement, url: string, params: Array<{ Key: string, Value: any }>, callback: () => void = () => null) {
    const requestInit: RequestInit = {
        method: 'GET'
    },
        queryString = params && params.length > 0 ? '?' + params.toString() : '';

    fetch(url + queryString, requestInit)
        .then(response => response.text())
        .then(content => element.innerHTML = content)
        .then(_ => callback());
}