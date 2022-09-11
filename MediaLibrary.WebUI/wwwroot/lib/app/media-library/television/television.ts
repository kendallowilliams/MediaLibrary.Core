import BaseClass from "../../assets/models/base-class";
import IView from "../../assets/interfaces/view-interface";
import TelevisionConfiguration from "../../assets/models/configurations/television-configuration";
import HtmlControls from '../../assets/controls/html-controls';
import { TelevisionPages } from "../../assets/enums/enums";
import ITelevisionConfiguration from "../../assets/interfaces/television-configuration-interface";
import LoadingModal from '../../assets/modals/loading-modal';
import { loadTooltips, hideTooltips } from "../../assets/utilities/bootstrap-helper";
import { getSeriesSortEnum } from "../../assets/enums/enum-functions";
import { loadHTML } from "../../assets/utilities/fetch_service";

export default class Television extends BaseClass implements IView {
    private readonly mediaView: HTMLElement;
    private seasonView: HTMLElement;

    constructor(private televisionConfiguration: TelevisionConfiguration,
        private playFunc: (btn: HTMLButtonElement) => void,
        private updateActiveMediaFunc: () => void,
        private tooltipsEnabled: () => boolean = () => false,
        private initContinuePlaybackBtns: () => void,
        private toggleDarkMode: (container) => void) {
        super();
        this.mediaView = HtmlControls.Views().MediaView;
    }

    loadView(callback: () => void = () => null): void {
        const properties: ITelevisionConfiguration = this.televisionConfiguration.properties,
            success: () => void = () => {
                this.seasonView = HtmlControls.Views().SeasonView;
                this.initializeControls();
                if (this.tooltipsEnabled()) /*then*/ loadTooltips(this.mediaView);
                $('[data-season-id][data-item-index="0"]').trigger('click');
                this.initContinuePlaybackBtns();
                this.toggleDarkMode(this.mediaView);
                callback();
            };

        hideTooltips(this.mediaView);
        loadHTML(this.mediaView, 'Television/Index', null)
            .then(_ => success());
    }

    initializeControls(): void {
        $('[data-back-button="television"]').on('click', () => this.goBack(() => this.loadView.call(this)));

        $(this.mediaView).find('*[data-series-id]').on('click', e => {
            LoadingModal.showLoading();
            this.televisionConfiguration.properties.SelectedSeriesId = parseInt($(e.currentTarget).attr('data-series-id'));
            this.televisionConfiguration.properties.SelectedTelevisionPage = TelevisionPages.Series;
            this.televisionConfiguration.updateConfiguration()
                .then(() => this.loadView(() => LoadingModal.hideLoading()));
        });

        $(this.mediaView).find('*[data-series-action="playlist"]').on('click', e => {
            const season = this.televisionConfiguration.properties.SelectedSeason,
                series = this.televisionConfiguration.properties.SelectedSeriesId;

            window.location.href = 'Television/GetM3UPlaylist?seriesId=' + series + '&season=' + season;
        });

        $(this.mediaView).find('*[data-season-id]').on('click', e => {
            const item = e.currentTarget,
                success = () => {
                    $(item).parent('li.page-item:first').addClass('active');
                    this.updateMobileSeasons(parseInt(id));
                    if (this.tooltipsEnabled()) /*then*/ loadTooltips(this.seasonView);
                    $(this.seasonView).find('*[data-play-id]').on('click', e => this.playFunc(e.currentTarget as HTMLButtonElement));
                    this.updateActiveMediaFunc();
                    this.toggleDarkMode(this.mediaView);
                    LoadingModal.hideLoading();
                },
                series = this.televisionConfiguration.properties.SelectedSeriesId.toString(),
                id = $(item).attr('data-season-id'),
                selectedSeason = this.televisionConfiguration.properties.SelectedSeason;

            if (id === '-' && (selectedSeason - 1) > 0) {
                $(this.mediaView).find('[data-season-id="' + (selectedSeason - 1) + '"]').trigger('click');
            } else if (id === '+' && (selectedSeason + 1) > 0) {
                $(this.mediaView).find('[data-season-id="' + (selectedSeason + 1) + '"]').trigger('click');
            } else if (parseInt(id) > 0) {
                $(this.mediaView).find('li.page-item').removeClass('active');
                LoadingModal.showLoading();
                this.televisionConfiguration.properties.SelectedSeason = parseInt(id);
                hideTooltips(this.seasonView);
                loadHTML(this.seasonView, 'Television/GetSeason', { series: series, season: id })
                    .then(_ => success());
            }
        });
    }

    loadSeries(id: number, callback: () => void = () => null): void {
        if (Number.isInteger(id)) {
            this.televisionConfiguration.properties.SelectedTelevisionPage = TelevisionPages.Series;
            this.televisionConfiguration.properties.SelectedSeriesId = id;
            this.televisionConfiguration.updateConfiguration()
                .then(() => callback());
        }
    }

    private updateMobileSeasons(season: number): void {
        const minSeasonCount = 5,
            numItemsBefore = Math.ceil(minSeasonCount / 2) - 1,
            numItemsAfter = minSeasonCount - numItemsBefore - 1,
            cssSelector = '[data-season-id]:not([data-season-id="+"]):not([data-season-id="-"]',
            numSeasons = $(cssSelector).length;
        let first = season - numItemsBefore,
            last = season + numItemsAfter;

        $(cssSelector).addClass('d-none d-lg-block');

        if (first < 1) {
            first = 1;
            last = minSeasonCount;
        } else if (last > numSeasons) {
            first = first - (last - numSeasons);
            last = numSeasons;
        }

        for (let i = first; i <= last; i++) {
            $(this.mediaView).find('*[data-season-id="' + i + '"]').removeClass('d-none d-lg-block');
        }
    }

    private goBack(callback: () => void = () => null): void {
        this.televisionConfiguration.properties.SelectedSeriesId = 0;
        this.televisionConfiguration.properties.SelectedTelevisionPage = TelevisionPages.Index;
        this.televisionConfiguration.updateConfiguration()
            .then(() => callback());
    }
}