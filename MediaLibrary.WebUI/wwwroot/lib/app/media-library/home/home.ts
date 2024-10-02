import BaseClass from "../../assets/models/base-class";
import IView from "../../assets/interfaces/view-interface";
import HomeConfiguration from "../../assets/models/configurations/home-configuration";
import { MlCallback } from "../../assets/types/callback.type";

export default class Home extends BaseClass implements IView {
    constructor(private homeConfiguration: HomeConfiguration) {
        super();
    }

    loadView(callback: MlCallback = () => null): void {
        callback();
    }
}