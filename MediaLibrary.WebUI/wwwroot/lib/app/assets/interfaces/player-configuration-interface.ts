import { MediaTypes, RepeatTypes, PlayerPages } from "../enums/enums";
import IConfiguration from "./configuration-interface";
import IListItem from "./list-item-interface";

export default interface IPlayerConfiguration extends IConfiguration {
    SelectedMediaType: MediaTypes;
    CurrentItemIndex: number;
    AutoPlay: boolean;
    Repeat: RepeatTypes;
    Shuffle: boolean;
    SelectedPlayerPage: PlayerPages;
    Volume: number;
    Muted: boolean;
    AudioVisualizerEnabled: boolean;
    SkipForwardSeconds: number;
    SkipBackwardSeconds: number;
    NowPlayingList: IListItem<number, number>[];
    ProgressUpdateInterval: number;
    AudioVisualizerBarCount: number;
}