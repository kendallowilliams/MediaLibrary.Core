import { AppWidth, MediaPages } from "../enums/enums";
import IConfiguration from "./configuration-interface";

export default interface IMediaLibraryConfiguration extends IConfiguration {
    SelectedMediaPage: MediaPages;
    AppWidth: AppWidth;
    NavBarDelay: number;
    TooltipsEnabled: boolean;
    SettingsDelay: number;
}