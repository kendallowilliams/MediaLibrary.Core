export function fetch_get(url: string, data: string[][] | Record<string, string> | string | URLSearchParams = new URLSearchParams()) : Promise<Response> {
    const requestInit: RequestInit = {
        method: 'GET'
    },
        queryString = data ? '?' + (new URLSearchParams(data)).toString() : '';

    return fetch(url + queryString, requestInit);
}

export function fetch_post(url: string, body: BodyInit, callback: () => void = () => null) {
    const requestInit: RequestInit = {
        method: 'POST',
        body: body
    };

    fetch(url, requestInit)
        .then(_ => callback());
}

export function loadHTML(element: HTMLElement,
    url: string, 
    data: string[][] | Record<string, string> | string | URLSearchParams = new URLSearchParams(),
    callback: () => void = () => null) {
    const requestInit: RequestInit = {
        method: 'GET'
    },
        queryString = data ? '?' + (new URLSearchParams(data)).toString() : '';

    fetch(url + queryString, requestInit)
        .then(response => response.text())
        .then(content => element.innerHTML = content)
        .then(_ => callback());
}