import BaseClass from "../../assets/models/base-class";
import IView from "../../assets/interfaces/view-interface";
import PlayerConfiguration from "../../assets/models/configurations/player-configuration";
import HtmlControls from '../../assets/controls/html-controls'
import { MediaTypes, RepeatTypes, PlayerPages, MessageBoxConfirmType } from "../../assets/enums/enums";
import { getRandomInteger } from "../../assets/utilities/math";
import AudioVisualizer from "../audio-visualizer/audio-visualizer";
import { openFullscreen } from "../../assets/utilities/element";
import { loadTooltips, disposeTooltips } from "../../assets/utilities/bootstrap-helper";
import LoadingModal from '../../assets/modals/loading-modal';
import IPlayerLoadFunctions from "../../assets/interfaces/player-load-functions-interface";
import { getPlayerPageEnum, getMediaTypesEnum } from "../../assets/enums/enum-functions";
import * as MessageBox from '../../assets/utilities/message-box';
import IListItem from "../../assets/interfaces/list-item-interface";
import PlayerControls from "../../assets/controls/player-controls";
import IPlayerControlsFunctions from "../../assets/interfaces/player-controls-functions-interface";
import Error from "../../assets/data/error";
import * as LocalStorage from '../../assets/utilities/local_storage';
import { fetch_get, fetch_post, loadHTML } from "../../assets/utilities/fetch_service";
import MediaLibraryConfiguration from "../../assets/models/configurations/media-library-configuration";

export default class Player extends BaseClass implements IView {
    private players: { VideoPlayer: HTMLMediaElement, MusicPlayer: HTMLMediaElement };
    private unPlayedShuffleIds: number[];
    private audioVisualizer: AudioVisualizer;
    private playerView: HTMLElement;
    private playerControls: PlayerControls;
    private controlsFunctions: IPlayerControlsFunctions = {
        next: this.loadNext.bind(this),
        previous: this.loadPrevious.bind(this),
        skipForward: this.skipForward.bind(this),
        skipBackward: this.skipBackward.bind(this),
        pause: () => $(this.getPlayer()).attr('data-playing', 'false').trigger('pause'),
        play: () => { if (this.getPlayer().currentSrc) /*then*/ this.getPlayer().play().catch(() => null); },
        setUnPlayedShuffleIds: this.setUnPlayedShuffleIds.bind(this),
        canPlayNext: this.canPlayNext.bind(this),
        canPlayPrevious: this.canPlayPrevious.bind(this),
        mutePlayers: (muted) => $(this.getPlayers()).each((index, element) => { (element as HTMLMediaElement).muted = muted; }),
        setPlayerVolume: (volume) => $(this.getPlayers()).prop('volume', volume / 100.0).prop('muted', volume === 0),
        setCurrentTime: (time) => $(this.getPlayer()).prop('currentTime', time),
        getPlaybackTime: this.getPlaybackTime.bind(this),
        updatePlayerProgress: this.updatePlayerProgress.bind(this),
        nowPlayingEmpty: () => this.playerConfiguration.properties.NowPlayingList.length === 0,
        getPlayer: this.getPlayer.bind(this),
        toggleAudioVisualizer: this.toggleAudioVisualizer.bind(this)
    };

    constructor(private playerConfiguration: PlayerConfiguration, private loadFunctions: IPlayerLoadFunctions, private updateActiveMedia: () => void = () => null,
        private mediaLibraryConfiguration: MediaLibraryConfiguration, private tooltipsEnabled: () => boolean = () => false,
        private toggleDarkMode: (container) => void) {
        super();

        this.players = HtmlControls.Players();
        this.playerView = HtmlControls.Views().PlayerView;
        this.unPlayedShuffleIds = [];
        this.audioVisualizer = new AudioVisualizer(this.playerConfiguration, this.players.MusicPlayer);
        this.initPlayer();
        this.playerControls = new PlayerControls(this.controlsFunctions, this.playerConfiguration, this.mediaLibraryConfiguration);
    }

    loadView(callback: () => void = () => null): void {
        this.audioVisualizer.prepareCanvas();
        this.playerControls.showHideAudioVisualizer();
        this.toggleDarkMode(this.playerView);
        callback();
    }

    private initPlayer(): void {
        this.initMediaPlayers();
        this.initPlayerControls();
        if (this.tooltipsEnabled()) /*then*/ loadTooltips(this.playerView);
        this.reload(() => this.loadItem());
    }

    private initMediaPlayers(): void {
        $(this.getPlayers()).on('loadedmetadata', e => {
            const currentIndex = this.playerConfiguration.properties.CurrentItemIndex,
                player: HTMLMediaElement = e.currentTarget as HTMLMediaElement,
                id = $(player).attr('data-item-id'),
                mediaType = this.playerConfiguration.properties.SelectedMediaType,
                currentProgress = parseInt($('[data-play-index="' + currentIndex + '"]').attr('data-current-time')) || 0,
                localStorageKey = LocalStorage.getPlayerProgressKey(id, mediaType);

            if (mediaType === MediaTypes.Podcast || mediaType === MediaTypes.Television) {
                fetch_get('Player/GetPlayerProgress', { id: id, mediaType: mediaType.toString() })
                    .then(response => response.text().then(data => Math.max(parseInt(data), currentProgress)))
                    .catch(_ => Math.max(parseInt(LocalStorage.get(localStorageKey)) || 0, currentProgress))
                    .then(_currentProgress => player.currentTime = _currentProgress);
            }
        });
        $(this.getPlayers()).on('ended', e => {
            if (!this.canPlayNext()) /*then*/ (e.currentTarget as HTMLMediaElement).currentTime = 0;
            this.audioVisualizer.stop();
            this.updatePlayCount(e.currentTarget as HTMLMediaElement, () => this.loadNext());
            this.updatePlayerProgress(0);
        });
        $(this.getPlayers()).prop('volume', this.playerConfiguration.properties.Volume / 100.0);

        $(this.getPlayers()).on('durationchange', e => {
            const player: HTMLMediaElement = e.currentTarget as HTMLMediaElement;

            this.playerControls.durationChanged(player.duration, this.getPlaybackTime(player.currentTime, player.duration));
        });

        $(this.getPlayers()).off('timeupdate');

        $(this.getPlayers()).on('play', e => {
            const mediaType = this.playerConfiguration.properties.SelectedMediaType;

            if (this.getPlayer().duration === Infinity) /*then*/ this.getPlayer().src = this.getPlayer().src;
            $(e.currentTarget).attr('data-playing', 'true');
            this.playerControls.playingChanged(true);
            if (mediaType !== MediaTypes.Television) {
                if (!this.audioVisualizer.isInitialized()) /*then*/ this.audioVisualizer.init();
                this.audioVisualizer.start();
            }
        });

        $(this.getPlayers()).on('pause', e => {
            this.playerControls.playingChanged(false);
            this.audioVisualizer.stop();
        });

        $(this.getPlayers()).on('error', e => {
            const player = e.currentTarget as HTMLMediaElement,
                error = player.error,
                message = 'Error: ' + error.code + ', Message: ' + error.message;

            if (!Error.Ignored.includes(error.message)) {
                MessageBox.showError('Player Error', message);
            }
        });
    }

    private initPlayerControls(): void {
        const buttons = HtmlControls.Buttons(),
            containers = HtmlControls.Containers();

        $(buttons.PlayerFullscreenButton).on('click', () => openFullscreen(this.getPlayer()));
        $(buttons.PlayerPlaylistToggleButtons).each((index, element) => {
            if (this.playerConfiguration.properties.SelectedPlayerPage === PlayerPages.Index) /*then*/ $(element).addClass('active');
            else /*then*/ $(element).removeClass('active');
        });
        $(buttons.PlayerPlaylistToggleButtons).on('click', e => {
            const $player = $(this.getPlayer()),
                $playerItems = $(containers.PlayerItemsContainer);
            let page = this.playerConfiguration.properties.SelectedPlayerPage;

            $(buttons.PlayerFullscreenButton).addClass('d-none');
            if (page === PlayerPages.Index) {
                this.playerConfiguration.properties.SelectedPlayerPage = getPlayerPageEnum($player.attr('data-player-page'));
                $player.parent().removeClass('d-none');
                $playerItems.addClass('d-none');
                page = this.playerConfiguration.properties.SelectedPlayerPage;
                if (page === PlayerPages.Video) /*then*/ $(buttons.PlayerFullscreenButton).removeClass('d-none');
                else if (page === PlayerPages.Audio) /*then*/ this.audioVisualizer.prepareCanvas();
                $(buttons.PlayerPlaylistToggleButtons).removeClass('active');
            } else {
                this.playerConfiguration.properties.SelectedPlayerPage = PlayerPages.Index;
                $player.parent().addClass('d-none');
                $playerItems.removeClass('d-none');
                $(buttons.PlayerPlaylistToggleButtons).addClass('active');
            }
            this.playerConfiguration.updateConfiguration()
                .then(() => this.playerControls.playerControlsModalChanged());
        });
    }

    public toggleAudioVisualizer(): void {
        const buttons = HtmlControls.Buttons().PlayerAudioVisualizerButtons;

        if (!this.audioVisualizer.isInitialized()) /*then*/ this.audioVisualizer.init();

        if ($(buttons).hasClass('active')) {
            this.playerConfiguration.properties.AudioVisualizerEnabled = false;
            this.playerConfiguration.updateConfiguration()
                .then(() => {
                    $(buttons).removeClass('active');
                    this.audioVisualizer.disable();
                });
        } else {
            this.playerConfiguration.properties.AudioVisualizerEnabled = true;
            this.playerConfiguration.updateConfiguration()
                .then(() => {
                    $(buttons).addClass('active');
                    this.audioVisualizer.enable();

                    if (this.isPlaying()) /*then*/ this.audioVisualizer.start();
                });
        }
    }

    public clearNowPlaying(): void {
        this.playerConfiguration.properties.NowPlayingList = [];
        this.playerConfiguration.clearNowPlayingList(this.playerConfiguration.properties.SelectedMediaType);
        this.playerConfiguration.updateConfiguration()
            .then(() => this.reload(() => this.loadItem()));
        this.playerControls.showHideMainControls(false);
    }

    private loadItem(item: HTMLElement = null, triggerPlay: boolean = false): void {
        const $player = $(this.getPlayer()),
            shuffleEnabled = this.playerConfiguration.properties.Shuffle,
            fields = HtmlControls.UIFields();

        $(this.getPlayers())
            .removeAttr('data-item-id')
            .removeAttr('src')
            .off('timeupdate')
            .filter((index, element: HTMLMediaElement) => element.readyState !== 0)
            .each((index, element: HTMLMediaElement) => {
                element.pause();
                element.load();
                this.playerControls.timeUpdated(0, this.getPlaybackTime(0, 0));
            });

        if (item) {
            const $item = $(item),
                url = $item.attr('data-play-url'),
                index = parseInt($item.attr('data-play-index')),
                id = $item.attr('data-item-id'),
                title = $item.attr('data-title') || '',
                mediaType = this.playerConfiguration.properties.SelectedMediaType;

            this.playerConfiguration.properties.CurrentItemIndex = index;
            this.playerConfiguration.updateConfiguration()
                .then(() => {
                    $player.attr('data-item-id', id);
                    $(fields.NowPlayingTitle).text(title.length > 0 ? ': ' + title : title);
                    if (shuffleEnabled && $.inArray(index, this.unPlayedShuffleIds) >= 0) /*then*/ this.unPlayedShuffleIds.splice(this.unPlayedShuffleIds.indexOf(index), 1);
                    $player.prop('src', url);
                    this.updateActiveMedia();
                    this.audioVisualizer.stop();
                    if (triggerPlay) {
                        if (mediaType === MediaTypes.Television &&
                            this.playerConfiguration.properties.SelectedPlayerPage === PlayerPages.Index) {
                            $(HtmlControls.Buttons().PlayerPlaylistToggleButtons).first().trigger('click');
                        }
                        $player[0].play()
                            .then(() => null)
                            .catch(() => null);
                    }

                    this.playerControls.enableDisablePreviousNext();
            });
        } else if ($('li[data-play-index].active').length === 1) {
            this.loadItem($('li[data-play-index].active')[0], triggerPlay);
        }

        $(this.getPlayers()).on('timeupdate', this.timeUpdated.bind(this));
    }

    public loadNext(): void {
        const shuffle = this.playerConfiguration.properties.Shuffle,
            nextIndex = shuffle ? this.unPlayedShuffleIds[getRandomInteger(0, this.unPlayedShuffleIds.length - 1)] :
                this.playerConfiguration.properties.CurrentItemIndex + 1,
            repeat = this.playerConfiguration.properties.Repeat,
            shuffleEmpty = this.unPlayedShuffleIds.length == 0;
        let $item = null;

        if (repeat === RepeatTypes.RepeatOne) {
            $(this.getPlayer()).prop('currentTime', 0);
            if (this.isPlaying()) /*then*/
                this.getPlayer().play()
                    .then(() => null)
                    .catch(() => null);
        } else if (repeat === RepeatTypes.RepeatAll) {
            if (shuffle && shuffleEmpty) {
                this.setUnPlayedShuffleIds(shuffle);
                this.loadNext();
            }
            else if (nextIndex === $('li[data-play-index]').length) {
                $item = $('li[data-play-index="0"]');
                this.loadItem($item[0], this.isPlaying());
            } else {
                $item = $('li[data-play-index="' + nextIndex + '"]');
                this.loadItem($item[0], this.isPlaying());
            }
        } else {
            $item = $('li[data-play-index=' + nextIndex + ']');

            if ((shuffle && !shuffleEmpty) || (!shuffle && nextIndex < $('li[data-play-index]').length)) {
                this.loadItem($item[0], this.isPlaying());
            } else {
                this.controlsFunctions.pause();
                this.playerControls.enableDisablePreviousNext();
            }
        }
    }

    public loadPrevious(): void {
        const shuffle = this.playerConfiguration.properties.Shuffle,
            previousIndex = shuffle ? this.unPlayedShuffleIds[getRandomInteger(0, this.unPlayedShuffleIds.length - 1)] :
                this.playerConfiguration.properties.CurrentItemIndex - 1,
            $item = $('li[data-play-index="' + previousIndex + '"]'),
            player = this.getPlayer(),
            shuffleEmpty = this.unPlayedShuffleIds.length === 0,
            repeat = this.playerConfiguration.properties.Repeat;

        if (repeat === RepeatTypes.RepeatOne || player.currentTime > 5) {
            player.currentTime = 0;
        }
        else if (shuffle && shuffleEmpty) {
            this.setUnPlayedShuffleIds(shuffle);
            this.loadPrevious();
        }
        else this.loadItem($item[0], this.isPlaying());
    }

    private canPlayNext(): boolean {
        return (this.playerConfiguration.properties.Shuffle && this.unPlayedShuffleIds.length > 0) ||
            this.playerConfiguration.properties.Repeat !== RepeatTypes.None ||
            this.playerConfiguration.properties.CurrentItemIndex < ($('li[data-play-index]').length - 1);
    }

    private canPlayPrevious(): boolean {
        return this.playerConfiguration.properties.Shuffle ||
            this.playerConfiguration.properties.CurrentItemIndex > 0 ||
            this.getPlayer().currentTime > 5 ||
            this.playerConfiguration.properties.Repeat === RepeatTypes.RepeatAll;
    }

    private isPlaying(): boolean {
        return $(this.getPlayer()).attr('data-playing') === 'true';
    }

    private getPlayer(): HTMLAudioElement | HTMLVideoElement {
        return this.playerConfiguration.properties.SelectedMediaType === MediaTypes.Television ?
            this.players.VideoPlayer as HTMLVideoElement :
            this.players.MusicPlayer as HTMLAudioElement;
    }

    private getPlayers(): HTMLElement[] { return [this.players.MusicPlayer, this.players.VideoPlayer]; }

    private getPlaybackTime(time, duration): string {
        return this.getFormattedTime(time).concat('/').concat(this.getFormattedTime(duration));
    }

    private getFormattedTime(time): string {
        const adjustedTime = Number.isNaN(time) || !Number.isFinite(time) ? 0 : time,
            currentHours = Math.floor(adjustedTime / 3600),
            currentMinutes = Math.floor((adjustedTime - (currentHours * 3600)) / 60),
            currentSeconds = Math.floor((adjustedTime - (currentMinutes * 60 + currentHours * 3600)) % 60),
            currentTime = (currentHours > 0 ? currentHours.toString().concat(':') : '')
                .concat(currentMinutes.toString().padStart(2, '0').concat(':'))
                .concat(currentSeconds.toString().padStart(2, '0'));

        return currentTime;
    }

    private setUnPlayedShuffleIds(shuffle: boolean): void {
        const $items = $('li[data-play-index]');

        this.unPlayedShuffleIds = shuffle && $items.length > 0 ? $.makeArray($items.map((index, element) => parseInt($(element).attr('data-play-index')))) : [];
    }

    private updatePlayCount(player: HTMLMediaElement, callback: () => void = () => null) {
        const id = $(player).attr('data-item-id'),
            formData = new FormData();

        formData.set('mediaType', this.playerConfiguration.properties.SelectedMediaType.toString());
        formData.set('id', id);
        fetch_post('Player/UpdatePlayCount', formData)
            .then(_ => callback());
    }

    private reload(callback: () => void = () => null): void {
        const containers = HtmlControls.Containers(),
            success = () => {
                if (this.tooltipsEnabled()) /*then*/ loadTooltips(containers.PlayerItemsContainer);
                this.applyLoadFunctions();
                this.updateSelectedPlayerPage();
                $(containers.PlayerItemsContainer).find('[data-item-index]').on('click', e => {
                    const index = parseInt($(e.currentTarget).attr('data-item-index')),
                        item: HTMLElement = $(containers.PlayerItemsContainer).find('li[data-play-index="' + index + '"]')[0] as HTMLElement;

                    this.loadItem(item, true);
                });

                if (typeof callback === 'function') /*then*/ callback();
            };

        disposeTooltips(containers.PlayerItemsContainer);
        $(HtmlControls.UIFields().NowPlayingTitle).text('');
        $(containers.PlayerItemsContainer).html('');
        loadHTML(containers.PlayerItemsContainer, 'Player/GetPlayerItems', null)
            .then(_ => success());
    }

    private applyLoadFunctions(): void {
        $(this.playerView).find('*[data-artist-id]').on('click', e => this.loadFunctions.loadArtist(parseInt($(e.currentTarget).attr('data-artist-id'))));
        $(this.playerView).find('*[data-album-id]').on('click', e => this.loadFunctions.loadAlbum(parseInt($(e.currentTarget).attr('data-album-id'))));
        $(this.playerView).find('*[data-podcast-id]').on('click', e => this.loadFunctions.loadPodcast(parseInt($(e.currentTarget).attr('data-podcast-id'))));
        $(this.playerView).find('*[data-series-id]').on('click', e => this.loadFunctions.loadSeries(parseInt($(e.currentTarget).attr('data-series-id'))));
    }

    private updateSelectedPlayerPage(): void {
        const buttons = HtmlControls.Buttons(),
            selectedMediaType = this.playerConfiguration.properties.SelectedMediaType;
        let selectedPlayerPage = this.playerConfiguration.properties.SelectedPlayerPage;

        if (selectedMediaType === MediaTypes.Television && selectedPlayerPage === PlayerPages.Audio) {
            this.playerConfiguration.properties.SelectedPlayerPage = PlayerPages.Video;
        } else if (selectedMediaType !== MediaTypes.Television && selectedPlayerPage === PlayerPages.Video) {
            this.playerConfiguration.properties.SelectedPlayerPage = PlayerPages.Audio;
        }

        if (selectedPlayerPage !== this.playerConfiguration.properties.SelectedPlayerPage) {
            selectedPlayerPage = this.playerConfiguration.properties.SelectedPlayerPage;
            $(buttons.PlayerFullscreenButton).addClass('d-none');

            this.playerConfiguration.updateConfiguration()
                .then(() =>
                $(this.getPlayers()).each((index, element) => {
                    const page = $(element).attr('data-player-page');

                    if (getPlayerPageEnum(page) === selectedPlayerPage) /*then*/ $(element).parent().removeClass('d-none');
                    else $(element).parent().addClass('d-none');
                })
            );

            if (selectedPlayerPage === PlayerPages.Video) /*then*/ $(buttons.PlayerFullscreenButton).removeClass('d-none');
        }
    }

    public play(btn: HTMLButtonElement, playSingleItem: boolean = false, loadPlayer: () => void = () => null): void {
        const $continuePlaybackBtns = $(HtmlControls.Buttons().PlaybackContinueButtons),
            $playButtons = $('button[data-play-id]'),
            $playGroups = $('div[data-play-ids]'),
            success = () => this.reload(() => {
                this.loadItem(null, true);
                if (this.playerConfiguration.properties.SelectedMediaType === MediaTypes.Television) /*then*/ loadPlayer();
                this.playerControls.showHideMainControls(true);
                LoadingModal.hideLoading();
            }),
            isContinuePlayback = $continuePlaybackBtns.is(btn),
            mediaType = isContinuePlayback ?
                getMediaTypesEnum($(btn).data('page')) :
                getMediaTypesEnum($(btn).attr('data-media-type'));
        let playData: IListItem<number, number>[] = [],
            currentItem: IListItem<number, number> = null;

        LoadingModal.showLoading();

        if (isContinuePlayback) {
            const listItem = this.playerConfiguration.properties.NowPlayingLists.find((item, index) => item.Key === mediaType),
                ids = (listItem || {}).Value || [];

            playData = ids.map((id, index) => ({ Id: index, Value: id, IsSelected: index == 0 }));
        }
        else if (playSingleItem) {
            playData = [{ Id: 0, Value: parseInt($(btn).attr('data-play-id')), IsSelected: true }];
        }
        else if ($playGroups.length > 0) {
            playData = $playGroups.map((index, element) => ($(element).attr('data-play-ids').split(',')))
                .map((index, element) => ({
                    Id: index,
                    Value: parseInt(element),
                    IsSelected: $(btn).attr('data-play-id') === element
                })).toArray();
        } else {
            playData = $playButtons.map((index, _btn) => ({
                Id: index,
                Value: parseInt($(_btn).attr('data-play-id')),
                IsSelected: btn.isSameNode(_btn)
            })).toArray();
        }

        currentItem = playData.find((item, index) => item.IsSelected);
        this.playerConfiguration.properties.CurrentItemIndex = currentItem ? currentItem.Id : 0;
        this.playerConfiguration.properties.SelectedMediaType = mediaType;
        this.playerConfiguration.properties.NowPlayingList = playData;
        if (!isContinuePlayback) /*then*/ this.playerConfiguration.updateNowPlayingLists();
        this.playerConfiguration.updateConfiguration()
            .then(() => success());
    }

    public getCurrentlyLoadedId(): number {
        return parseInt($(this.getPlayer()).attr('data-item-id'));
    }

    private updatePlayerProgress(progress: number): void {
        const currentIndex: number = this.playerConfiguration.properties.CurrentItemIndex,
            id: number = parseInt($('[data-play-index="' + currentIndex + '"]').attr('data-item-id')),
            mediaType: MediaTypes = this.playerConfiguration.properties.SelectedMediaType,
            $currentItem = $('[data-play-index="' + currentIndex + '"]'),
            progressUpdateInterval = this.playerConfiguration.properties.ProgressUpdateInterval,
            localStorageKey = LocalStorage.getPlayerProgressKey(id, mediaType),
            localStorageProgress = parseInt(LocalStorage.get(localStorageKey)) || 0,
            data = {
                id: id.toString(),
                mediaType: mediaType,
                progress: progress > localStorageProgress ? progress : localStorageProgress
            },
            formData = new FormData();

        formData.set('id', data.id);
        formData.set('mediaType', data.mediaType.toString());
        formData.set('progress', data.progress.toString());
        if ($currentItem.attr('data-current-time') !== data.progress.toString() && data.progress % progressUpdateInterval === 0 && !isNaN(id)) {
            $currentItem.attr('data-current-time', data.progress);

            fetch_post('Player/UpdatePlayerProgress', formData)
                .then(_ => LocalStorage.removeItem(localStorageKey))
                .catch(_ => LocalStorage.set(localStorageKey, data.progress.toString()));
        }
    }

    private skipForward(): void {
        const player: HTMLMediaElement = this.getPlayer(),
            currentTime: number = player.currentTime,
            updatedTime: number = currentTime + this.playerConfiguration.properties.SkipForwardSeconds;

        if (updatedTime <= (player.duration - 1)) /*then*/ player.currentTime = updatedTime;
    }

    private skipBackward(): void {
        const player: HTMLMediaElement = this.getPlayer(),
            currentTime: number = player.currentTime,
            updatedTime: number = currentTime - this.playerConfiguration.properties.SkipBackwardSeconds;

        if (updatedTime < 0) /*then*/ player.currentTime = 0;
        else /*then*/ player.currentTime = updatedTime;
    }

    public getPlayerControls(): PlayerControls {
        return this.playerControls;
    }

    private timeUpdated(e: JQuery.TriggeredEvent<HTMLElement, undefined, HTMLElement, HTMLElement>): void {
        const player: HTMLMediaElement = e.currentTarget as HTMLMediaElement,
            currentTime: number = Math.floor(player.currentTime);

        if ($(player).attr('data-item-id') && !isNaN(player.duration)) {
            this.playerControls.timeUpdated(currentTime,
                this.getPlaybackTime(currentTime, player.duration),
                () => this.updatePlayerProgress(currentTime));
        }
    }

    public playOrPause(): void {
        if (this.isPlaying()) /*then*/ this.controlsFunctions.pause();
        else /*then*/ this.controlsFunctions.play();
    }
}