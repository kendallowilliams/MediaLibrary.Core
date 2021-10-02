export function fetch_get(url: string, data: string[][] | Record<string, string> | string | URLSearchParams = new URLSearchParams()): Promise<Response> {
    const requestInit: RequestInit = {
        method: 'GET'
    },
        queryString = data ? '?' + (new URLSearchParams(data)).toString() : '';

    return fetch(url + queryString, requestInit)
        .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
        .catch(reason => Promise.reject(reason));
}

export function fetch_post(url: string, data: BodyInit = null, contentType: string = null): Promise<Response> {
    const requestInit: RequestInit = {
        method: 'POST',
        body: data
    },
        headers = new Headers();

    if (contentType) /*then*/ headers.append('Content-Type', contentType);
    requestInit.headers = headers;

    return fetch(url, requestInit)
        .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
        .catch(reason => Promise.reject(reason));
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
        .then(response => response.ok ? Promise.resolve(response) : Promise.reject(response))
        .catch(reason => Promise.reject(reason))
        .then(response => response.text())
        .then(content => element.innerHTML = content)
        .then(_ => callback());
}