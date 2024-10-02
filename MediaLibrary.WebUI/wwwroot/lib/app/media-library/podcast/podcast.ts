import BaseClass from "../../assets/models/base-class";
import IView from "../../assets/interfaces/view-interface";
import PodcastConfiguration from "../../assets/models/configurations/podcast-configuration";
import HtmlControls from '../../assets/controls/html-controls';
import { MessageBoxConfirmType, PodcastPages } from "../../assets/enums/enums";
import IPodcastConfiguration from "../../assets/interfaces/podcast-configuration-interface";
import LoadingModal from "../../assets/modals/loading-modal";
import { hideTooltips, loadTooltips, disposePopovers } from "../../assets/utilities/bootstrap-helper";
import { getPodcastSortEnum, getPodcastFilterEnum } from "../../assets/enums/enum-functions";
import * as MessageBox from '../../assets/utilities/message-box'
import { fetch_get, fetch_post, loadHTML } from "../../assets/utilities/fetch_service";
import BlankDismissableModal from "../../assets/modals/blank-dismissable-modal";
import { MlCallback } from "../../assets/types/callback.type";

export default class Podcast extends BaseClass implements IView {
    private readonly mediaView: HTMLElement;
    private podcastView: HTMLElement;

    constructor(private podcastConfiguration: PodcastConfiguration,
        private playFunc: (btn: HTMLButtonElement, single: boolean) => void,
        private updateActiveMediaFunc: MlCallback,
        private tooltipsEnabled: MlCallback<void, boolean> = () => false,
        private initContinuePlaybackBtns: MlCallback,
        private toggleDarkMode: (container) => void) {
        super();
        this.mediaView = HtmlControls.Views().MediaView;
    }

    loadView(callback: MlCallback = () => null): void {
        const properties: IPodcastConfiguration = this.podcastConfiguration.properties,
            success: MlCallback = () => {
                this.podcastView = HtmlControls.Views().PodcastView;
                this.initializeControls();
                if (this.tooltipsEnabled()) /*then*/ loadTooltips(this.mediaView);
                $('[data-podcast-year][data-item-index="1"]').trigger('click');
                this.initContinuePlaybackBtns();
                this.toggleDarkMode(this.mediaView);
                callback();
            };
        
        hideTooltips(this.mediaView);
        this.podcastConfiguration.refresh()
            .then(() => loadHTML(this.mediaView, 'Podcast/Index', null).then(_ => success()));
    }

    initializeControls(): void {
        $('[data-back-button="podcast"]').on('click', () => {
            LoadingModal.showLoading();
            this.podcastConfiguration.properties.SelectedPodcastId = 0;
            this.podcastConfiguration.properties.SelectedPodcastPage = PodcastPages.Index;
            this.podcastConfiguration.updateConfiguration()
                .then(() => this.loadView(() => LoadingModal.hideLoading()));
        });

        $(this.mediaView).find('*[data-podcast-id]').on('click', e => this.loadPodcast(parseInt($(e.currentTarget).attr('data-podcast-id')), () => this.loadView()));
        
        $(this.mediaView).find('*[data-podcast-year]').on('click', e => {
            const year = $(e.currentTarget).attr('data-podcast-year'),
                years = $(this.podcastView).attr('data-podcast-years').split(','),
                currentIndex = years.indexOf(this.getSelectedYear());

            if (year === '-' && currentIndex > 0) {
                $('[data-podcast-year="' + years[currentIndex - 1] + '"]').trigger('click');
            } else if (year === '+' && (currentIndex + 1) < years.length) {
                $('[data-podcast-year="' + years[currentIndex + 1] + '"]').trigger('click');
            } else if (parseInt(year) > 0) {
                $('li.page-item').removeClass('active');
                this.loadPodcastView(e.currentTarget);
            }
        });

        $(this.mediaView).find('button[data-podcast-options-id]').on('click', e => {
            const $btn = $(e.currentTarget),
                id = $btn.attr('data-podcast-options-id'),
                modal = new BlankDismissableModal(),
                error = (status) => {
                    LoadingModal.hideLoading();
                    MessageBox.showError('Error', status);
                };

            LoadingModal.showLoading();
            modal.loadBodyHTML('Podcast/GetPodcastOptions/'.concat(id))
                .then(_ => {
                    const htmlElement = modal.getHTMLElement();

                    $(htmlElement).find('*[data-podcast-action="delete"]').on('click', e => {
                        const $btn = $(e.currentTarget),
                            id = $btn.attr('data-item-id'),
                            title = 'Delete podcast',
                            message = 'Are you sure you want to remove this podcast?',
                            formData = new FormData(),
                            callback = () => {
                                LoadingModal.showLoading();
                                formData.set('id', id);
                                fetch_post('Podcast/RemovePodcast', formData)
                                    .then(_ => this.loadView(() => LoadingModal.hideLoading()));
                            };

                        modal.hide();
                        MessageBox.confirm(title, message, MessageBoxConfirmType.YesNo, callback);
                    });

                    $(htmlElement).find('*[data-podcast-action="auto-download"]').on('change', e => {
                        const $switch = $(e.currentTarget),
                            id = $switch.attr('data-item-id'),
                            enabled = $switch.is(':checked'),
                            formData = new FormData();

                        formData.set('id', id);
                        formData.set('enabled', enabled ? 'true' : 'false');
                        modal.hide();
                        LoadingModal.showLoading();

                        fetch_post('Podcast/AutoDownloadEpisodes', formData)
                            .then(_ => LoadingModal.hideLoading());
                    });

                    $(htmlElement).find('*[data-podcast-action="refresh"]').on('click', e => {
                        const $btn = $(e.currentTarget),
                            id = $btn.attr('data-item-id'),
                            formData = new FormData();

                        formData.set('id', id);
                        modal.hide();
                        LoadingModal.showLoading();

                        fetch_post('Podcast/Refresh', formData)
                            .then(_ => LoadingModal.hideLoading());
                    }); 

                    LoadingModal.hideLoading();
                    this.toggleDarkMode(htmlElement)
                    modal.show();
                }).catch((response: Response) => response.text().then(message => error(message)));
        });
    }

    loadPodcast(id: number, callback: MlCallback = () => null): void {
        if (Number.isInteger(id)) {
            this.podcastConfiguration.properties.SelectedPodcastPage = PodcastPages.Podcast;
            this.podcastConfiguration.properties.SelectedPodcastId = id;
            this.podcastConfiguration.updateConfiguration()
                .then(() => callback());
        }
    }

    private getSelectedYear(): string {
        return $('li.page-item.active a.page-link[data-podcast-year]').attr('data-podcast-year');
    }

    private loadPodcastView(item: HTMLElement): void {
        const success = () => {
            $(item).parent('li.page-item:first').addClass('active');
            this.updateMobileYears(parseInt($(item).attr('data-item-index')));
            if (this.tooltipsEnabled()) /*then*/ loadTooltips(this.podcastView);
            $(this.podcastView).find('button[data-podcast-item-id]').on('click', e => {
                const $btn = $(e.currentTarget),
                    id = $btn.attr('data-podcast-item-id'),
                    modal = new BlankDismissableModal(),
                    error = (status) => {
                        LoadingModal.hideLoading();
                        MessageBox.showError('Error', status);
                    };

                LoadingModal.showLoading();
                modal.loadBodyHTML('Podcast/GetPodcastItemOptions/'.concat(id))
                    .then(_ => {
                        const htmlElement = modal.getHTMLElement();

                        if (this.tooltipsEnabled()) /*then*/ loadTooltips(htmlElement);
                        $(htmlElement).find('[data-podcast-action="download"], [data-podcast-action="remove-download"]').on('click', e => {
                            const $btn = $(e.currentTarget),
                                id = $btn.attr('data-item-id'),
                                formData = new FormData(),
                                isDownload = $btn.attr('data-podcast-action') === 'download',
                                url = isDownload ? 'Podcast/DownloadPodcastItem' : 'Podcast/RemovePodcastItemDownload',
                                $badge = $(this.podcastView).find('.badge[data-podcast-download-id="' + id + '"]'),
                                $spinner = $('<i class="fas fa-spinner fa-spin"></i>');

                            formData.set('id', id);
                            $badge.toggleClass('d-none', !isDownload)
                                .text('DOWNLOADING ')
                                .append($spinner);
                            fetch_post(url, formData)
                                .then(_ => {
                                    $badge.toggleClass('d-none', !isDownload).text('DOWNLOADED');
                                })
                                .catch(response => $badge.addClass('d-none'));
                            modal.hide();
                        });
                        $(htmlElement).find('*[data-podcast-action="mark-played"]').on('input', e => {
                            const $switch = $(e.currentTarget),
                                id = $switch.attr('data-item-id'),
                                isChecked = $switch.is(':checked'),
                                url = isChecked ? 'Podcast/MarkPodcastItemPlayed' : 'Podcast/MarkPodcastItemUnplayed',
                                formData = new FormData(),
                                $badge = $(this.podcastView).find('.badge[data-podcast-playback-id=' + id + ']');

                            formData.set('id', id);
                            LoadingModal.showLoading();
                            fetch_post(url, formData)
                                .then(_ => {
                                    modal.hide();
                                    $badge.toggleClass('d-none', !isChecked).text('PLAYED');
                                    LoadingModal.hideLoading();
                                })
                                .catch(response => $badge.addClass('d-none'));
                        });
                        $(htmlElement).find('*[data-podcast-action="show-description"]').on('click', e => {
                            const $btn = $(e.currentTarget),
                                title = $btn.attr('data-title'),
                                message = $btn.attr('data-message');

                            modal.hide();
                            MessageBox.alert(title, message, true);
                        });

                        LoadingModal.hideLoading();
                        this.toggleDarkMode(htmlElement)
                        modal.show();
                    }).catch((response: Response) => response.text().then(message => error(message)));
            });
            $(this.mediaView).find('*[data-play-id]').on('click', e => this.playFunc(e.currentTarget as HTMLButtonElement, true));
            this.updateActiveMediaFunc();
            this.toggleDarkMode(this.mediaView);
            LoadingModal.hideLoading();
        },
            id = this.podcastConfiguration.properties.SelectedPodcastId.toString(),
            year = $(item).attr('data-podcast-year'),
            filter = this.podcastConfiguration.properties.SelectedPodcastFilter.toString();

        if (item) {
            LoadingModal.showLoading();
            hideTooltips(this.podcastView);
            loadHTML(this.podcastView, 'Podcast/GetPodcastItems', { id: id, year: year, filter: filter })
                .then(_ => success());
        }
    }

    private updateMobileYears(position: number): void {
        const minYearCount = 5,
            maxYearCount = 10,
            numItemsBefore = Math.ceil(minYearCount / 2) - 1,
            numItemsAfter = minYearCount - numItemsBefore - 1,
            cssSelector = '[data-podcast-year]:not([data-podcast-year="+"]):not([data-podcast-year="-"]',
            numYears = $(cssSelector).length,
            delta = numYears - maxYearCount;
        let first = position - numItemsBefore,
            last = position + numItemsAfter;

        $(cssSelector).addClass('d-none d-lg-block');

        if (first < 1) {
            first = 1;
            last = minYearCount;
        } else if (last > numYears) {
            first = first - (last - numYears);
            last = numYears;
        }

        if (delta > 0) {
            let maxFirst: number = position - (Math.ceil(maxYearCount / 2) - 1),
                maxLast: number = position + Math.ceil(maxYearCount / 2);

            if (maxFirst < 1) {
                maxFirst = 1;
                maxLast = maxYearCount;
            } else if (maxLast > numYears) {
                maxFirst = maxFirst - (maxLast - numYears);
                maxLast = numYears;
            }

            for (let i = 1; i <= numYears; i++) {
                if (i < maxFirst || i > maxLast) {
                    $(this.mediaView).find('*[data-podcast-year][data-item-index="' + i + '"]').removeClass('d-lg-block');
                }
            }
        }

        for (let i = first; i <= last; i++) {
            $(this.mediaView).find('*[data-podcast-year][data-item-index="' + i + '"]').removeClass('d-none d-lg-block');
        }
    }
}