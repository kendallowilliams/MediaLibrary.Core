import { AppWidth, MediaPages } from "../enums/enums";
import IConfiguration from "./configuration-interface";

export default interface IMediaLibraryConfiguration extends IConfiguration {
    SelectedMediaPage: MediaPages;
    AppWidth: AppWidth;
    NavBarTimeOut: number;
}