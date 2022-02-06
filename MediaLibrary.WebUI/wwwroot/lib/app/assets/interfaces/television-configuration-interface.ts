import { TelevisionPages, SeriesSort } from "../enums/enums";
import IConfiguration from "./configuration-interface";

export default interface ITelevisionConfiguration extends IConfiguration {
    SelectedSeriesId: number;
    SelectedSeason: number;
    SelectedTelevisionPage: TelevisionPages;
    SelectedSeriesSort: SeriesSort;
    FilePath: string;
}