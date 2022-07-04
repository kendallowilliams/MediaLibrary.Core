import HtmlControls from '../controls/html-controls';
import { getRepeatTypesEnumString } from '../enums/enum-functions';
import { MediaTypes, RepeatTypes } from '../enums/enums';
import IPlayerControlsFunctions from '../interfaces/player-controls-functions-interface';
import PlayerConfiguration from '../models/configurations/player-configuration';
import * as LocalStorage from '../../assets/utilities/local_storage';
import { fetch_get } from '../utilities/fetch_service';

export default class PlayerControls {
    private volumeSliders: HTMLElement[];

    constructor(private controlsFunctions: IPlayerControlsFunctions, private playerConfiguration: PlayerConfiguration) {
        this.volumeSliders = [];
        this.initialize();
    }

    private initialize(): void {
        this.initializeControls();
    }

    private initializeControls(): void {
        const buttons = HtmlControls.Buttons(),
            controls = HtmlControls.UIControls(),
            containers = HtmlControls.Containers(),
            $muteVolumeButtons = $(Array.from(buttons.PlayerMuteButtons).concat(Array.from(buttons.PlayerVolumeButtons)));

        $('button[data-repeat-type="' + getRepeatTypesEnumString(this.playerConfiguration.properties.Repeat) + '"]').removeClass('d-none');
        $muteVolumeButtons.attr('data-volume', this.playerConfiguration.properties.Volume);
        if (this.playerConfiguration.properties.Muted) /*then*/ $(buttons.PlayerMuteButtons).removeClass('d-none');
        else $(buttons.PlayerVolumeButtons).removeClass('d-none');

        $(controls.PlayerSliders).slider({ min: 0, max: 100 });
        $(containers.PlayerVolumeContainers).each((index: number, element: HTMLElement) => {
            const $container = $(element),
                $volumeSlider = $('<div class="m-1 volume-slider" data-orientation="vertical"></div>');

            this.volumeSliders.push($volumeSlider.get(0));
            $container.popover({
                trigger: 'hover',
                content: $volumeSlider.get(0),
                placement: 'top',
                html: true,
                container: element
            });
        });
        $(controls.VolumeSliders).add(this.volumeSliders).each((index: number, element: HTMLElement) => {
            const $volumeSlider = $(element);

            if (!this.volumeSliders.includes(element)) /*then*/ this.volumeSliders.push(element);
            $volumeSlider.slider({
                min: 0,
                max: 100,
                orientation: $volumeSlider.attr('data-orientation') || 'horizontal',
                value: this.playerConfiguration.properties.Muted ? 0 : this.playerConfiguration.properties.Volume
            });
            $volumeSlider.on('slide', (e, ui) => {
                const volume = ui.value;

                $muteVolumeButtons.attr('data-volume', volume).addClass('d-none');
                $(volume === 0 ? buttons.PlayerMuteButtons : buttons.PlayerVolumeButtons).removeClass('d-none');
                this.playerConfiguration.properties.Volume = volume;
                this.playerConfiguration.properties.Muted = volume === 0;
                this.controlsFunctions.setPlayerVolume(volume);
            });
            $volumeSlider.on('slidestop', (e, ui) => {
                this.playerConfiguration.updateConfiguration();
                $(this.volumeSliders).slider('value', this.playerConfiguration.properties.Volume);
            });
        });
        $(controls.PlayerSliders).on('slide', (e, ui) => {
            if ($(e.currentTarget).attr('data-slide-started') === 'true') {
                const player = this.controlsFunctions.getPlayer(),
                    id = $(player).attr('data-item-id'),
                    progressKey = LocalStorage.getPlayerProgressKey(id, this.playerConfiguration.properties.SelectedMediaType);

                if (LocalStorage.containsKey(progressKey)) /*then*/ LocalStorage.removeItem(progressKey);
                this.controlsFunctions.setCurrentTime(ui.value);
                $(controls.PlayerTimes).text(this.controlsFunctions.getPlaybackTime(ui.value, $(e.currentTarget).slider('option', 'max')));
            }
        });
        $(controls.PlayerSliders).on('slidestart', (e, ui) => $(e.currentTarget).attr('data-slide-started', 'true'));
        $(controls.PlayerSliders).on('slidestop', (e, ui) => $(e.currentTarget).attr('data-slide-started', 'false'));
        $(buttons.PlayerShuffleButtons).addClass(this.playerConfiguration.properties.Shuffle ? 'active' : '');
        $(buttons.PlayerBackwardButtons).on('click', e => this.controlsFunctions.skipBackward());
        $(buttons.PlayerForwardButtons).on('click', e => this.controlsFunctions.skipForward());
        $(buttons.PlayerNextButtons).on('click', e => this.controlsFunctions.next());
        $(buttons.PlayerPreviousButtons).on('click', e => this.controlsFunctions.previous());
        $(buttons.PlayerPlayButtons).on('click', e => this.playClicked(e));
        $(buttons.PlayerPauseButtons).on('click', e => this.controlsFunctions.pause());
        $(buttons.PlayerShuffleButtons).on('click', e => {
            const shuffle = this.playerConfiguration.properties.Shuffle,
                $btns = $(buttons.PlayerShuffleButtons);

            this.controlsFunctions.setUnPlayedShuffleIds(!shuffle);
            this.playerConfiguration.properties.Shuffle = !shuffle;
            this.playerConfiguration.updateConfiguration().
                then(() => {
                if (!shuffle) {
                    $btns.addClass('active');
                } else {
                    $btns.removeClass('active');
                }

                this.enableDisablePreviousNext();
            });
        });
        $muteVolumeButtons.on('click', e => {
            const previousVolume = parseInt($(buttons.PlayerVolumeButtons).first().attr('data-volume'));
            let muted = false;

            $muteVolumeButtons.addClass('d-none');

            if ($.inArray(e.currentTarget, Array.from(buttons.PlayerVolumeButtons)) > -1) {
                $(Array.from(buttons.PlayerMuteButtons)).removeClass('d-none');
                $(this.volumeSliders).slider('value', 0);
                muted = true;
            } else if ($.inArray(e.currentTarget, Array.from(buttons.PlayerMuteButtons)) > -1) {
                $(Array.from(buttons.PlayerVolumeButtons)).removeClass('d-none');
                $(this.volumeSliders).slider('value', previousVolume);
            }

            this.playerConfiguration.properties.Muted = muted;
            this.playerConfiguration.updateConfiguration()
                .then(() => this.controlsFunctions.mutePlayers(muted));
        });
        $('button[data-repeat-type]').on('click', () => {
            let repeat = this.playerConfiguration.properties.Repeat;

            $('button[data-repeat-type]').addClass('d-none');

            if (repeat === RepeatTypes.None) {
                repeat = RepeatTypes.RepeatOne;
            } else if (repeat === RepeatTypes.RepeatOne) {
                repeat = RepeatTypes.RepeatAll;
            } else if (repeat === RepeatTypes.RepeatAll) {
                repeat = RepeatTypes.None;
            }

            $('button[data-repeat-type="' + getRepeatTypesEnumString(repeat) + '"]').removeClass('d-none');
            this.playerConfiguration.properties.Repeat = repeat;
            this.playerConfiguration.updateConfiguration()
                .then(() => this.enableDisablePreviousNext());
        });
    }

    public playingChanged(isPlaying: boolean): void {
        const buttons = HtmlControls.Buttons();

        if (isPlaying) {
            $(buttons.PlayerPlayButtons).addClass('d-none');
            $(buttons.PlayerPauseButtons).removeClass('d-none');
        } else {
            $(buttons.PlayerPauseButtons).addClass('d-none');
            $(buttons.PlayerPlayButtons).removeClass('d-none');
        }
    }

    public enableDisablePreviousNext(): void {
        const buttons = HtmlControls.Buttons();

        $(buttons.PlayerNextButtons).prop('disabled', !this.controlsFunctions.canPlayNext());
        $(buttons.PlayerPreviousButtons).prop('disabled', !this.controlsFunctions.canPlayPrevious());
    }

    public durationChanged(duration: number, playbackTime: string): void {
        const controls = HtmlControls.UIControls();

        $(controls.PlayerSliders).slider('option', 'max', duration);
        $(controls.PlayerTimes).text(playbackTime);
    }

    public timeUpdated(currentTime: number, playbackTime: string, callback: () => void = () => null): void {
        const controls = HtmlControls.UIControls();

        this.enableDisablePreviousNext();
        if ($(controls.PlayerSliders).attr('data-slide-started') !== 'true') {
            $(controls.PlayerSliders).slider('value', currentTime);
            $(controls.PlayerTimes).text(playbackTime);
            $(controls.PlayerShortTimes).text(playbackTime.substring(0, playbackTime.indexOf('/')));
            callback();
        }
    }

    public showHideMainControls(show: boolean): void {
        if (show && !this.controlsFunctions.nowPlayingEmpty()) /*then*/ $(HtmlControls.Containers().MainControlsContainers).removeClass('d-none').addClass('d-flex');
        else $(HtmlControls.Containers().MainControlsContainers).removeClass('d-flex').addClass('d-none');
    }

    private playClicked(evt: JQuery.ClickEvent): void {
        const player = this.controlsFunctions.getPlayer(),
            id = $(player).attr('data-item-id'),
            type = this.playerConfiguration.properties.SelectedMediaType,
            localStorageKey = LocalStorage.getPlayerProgressKey(id, type),
            localStorageProgress = parseInt(LocalStorage.get(localStorageKey)) || 0,
            currentProgress = player.currentTime || 0;

        if (id) {
            if (this.playerConfiguration.properties.SelectedMediaType === MediaTypes.Podcast ||
                this.playerConfiguration.properties.SelectedMediaType === MediaTypes.Television) {
                fetch_get('Player/GetPlayerProgress', { id: id, mediaType: type.toString() })
                    .then(response => {
                        LocalStorage.removeItem(localStorageKey);

                        return response.text()
                            .then(_progress => Math.max(currentProgress, parseInt(_progress), localStorageProgress))
                    })
                    .catch(_ => Math.max(currentProgress, localStorageProgress))
                    .then(_updatedProgress => {
                        if (this.playerConfiguration.properties.ProgressUpdateInterval < Math.abs(_updatedProgress - currentProgress)) {
                            this.controlsFunctions.setCurrentTime(_updatedProgress);
                        }

                        this.controlsFunctions.play();
                    });
            } else {
                this.controlsFunctions.play();
            }
        }
    }
}