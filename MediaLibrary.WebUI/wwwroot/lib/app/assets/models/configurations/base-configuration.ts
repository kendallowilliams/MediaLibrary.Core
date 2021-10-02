import { fetch_get, fetch_post } from "../../utilities/fetch_service";
import BaseClass from "../base-class";

export default abstract class BaseConfiguration<T> extends BaseClass {
    public properties: T;

    constructor(private controller: string) {
        super();
    }

    protected update<T>(data: T, callback: () => void = () => null): void {
        const url = this.controller.concat('/UpdateConfiguration');

        fetch_post(url, JSON.stringify(data), 'application/json')
            .then(_ => callback());
    }

    refresh(callback: () => void = () => null): void {
        const url = this.controller.concat('/').concat(this.controller).concat('Configuration'),
             success: (data) => void = (data) => {
                 this.properties = data;
                 callback();
             };

        fetch_get(url, null)
            .then(response => response.json())
            .then(data => success(data));
    }
}