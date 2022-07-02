import * as MessageBox from '../utilities/message-box';

export function fetch_get(url: string, data: string[][] | Record<string, string> | string | URLSearchParams = new URLSearchParams()): Promise<Response> {
    const requestInit: RequestInit = {
        method: 'GET'
    },
        queryString = data ? '?' + (new URLSearchParams(data)).toString() : '';

    return fetch(url + queryString, requestInit)
        .then(response => validateResponse(response))
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
        .then(response => validateResponse(response))
        .catch(reason => Promise.reject(reason));
}

export function loadHTML(element: HTMLElement, url: string, data: string[][] | Record<string, string> | string | URLSearchParams = new URLSearchParams()): Promise<string> {
    const requestInit: RequestInit = {
        method: 'GET'
    },
        queryString = data ? '?' + (new URLSearchParams(data)).toString() : '';

    return fetch(url + queryString, requestInit)
        .then(response => validateResponse(response))
        .catch(reason => Promise.reject(reason))
        .then(response => response.text())
        .then(content => element.innerHTML = content);
}

function validateResponse(response: Response): Promise<Response> {
    const result = response && response.ok ?
        Promise.resolve(response) :
        Promise.reject(response);

    if (response && !response.ok) {
        const title = 'Fetch Error',
            message = JSON.stringify(response);

        MessageBox.showError(title, message);
    }

    return result;
}