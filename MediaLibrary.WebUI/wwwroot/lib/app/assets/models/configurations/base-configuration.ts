import { MlCallback } from "../../types/callback.type";
import { fetch_get, fetch_post } from "../../utilities/fetch_service";
import BaseClass from "../base-class";

export default abstract class BaseConfiguration<T> extends BaseClass {
    public properties: T;

    constructor(private controller: string) {
        super();
    }

    protected update<T>(data: T): Promise<Response> {
        const url = this.controller.concat('/UpdateConfiguration');

        return fetch_post(url, JSON.stringify(data), 'application/json');
    }

    public refresh(): Promise<void> {
        const url = this.controller.concat('/').concat(this.controller).concat('Configuration'),
            success: MlCallback<T> = (data) => {
                this.properties = data;
            };

        return fetch_get(url, null)
            .then(response => response.json())
            .then(data => success(data));
    }
}