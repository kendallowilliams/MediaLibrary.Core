import HtmlControls from '../controls/html-controls';
import { getRepeatTypesEnumString } from '../enums/enum-functions';
import { MediaTypes, RepeatTypes } from '../enums/enums';
import IPlayerControlsFunctions from '../interfaces/player-controls-functions-interface';
import PlayerConfiguration from '../models/configurations/player-configuration';

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
        $(containers.PlayerVolumeContainers).each((index, element) => {
            const $container = $(element),
                $volumeSlider = $('<div id="volume-slider" class="m-1"></div>');

            this.volumeSliders.push($volumeSlider.get(0));
            $container.popover({
                trigger: 'hover',
                content: $volumeSlider.get(0),
                placement: 'top',
                html: true,
                container: element
            });

            $volumeSlider.slider({
                min: 0,
                max: 100,
                orientation: 'vertical',
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

            $volumeSlider.on('slidechange', (e, ui) => {
                this.playerConfiguration.updateConfiguration();
            });
        });
        $(controls.PlayerSliders).on('slide', (e, ui) => {
            if ($(e.currentTarget).attr('data-slide-started') === 'true') {
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
            this.playerConfiguration.updateConfiguration(() => {
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
            this.playerConfiguration.updateConfiguration(() => this.controlsFunctions.mutePlayers(muted));
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
            this.playerConfiguration.updateConfiguration(() => this.enableDisablePreviousNext());
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

    public timeUpdated(currentTime: number, playbackTime: string): void {
        const controls = HtmlControls.UIControls();

        this.enableDisablePreviousNext();
        if ($(controls.PlayerSliders).attr('data-slide-started') !== 'true') {
            $(controls.PlayerSliders).slider('value', currentTime);
            $(controls.PlayerTimes).text(playbackTime);
            $(controls.PlayerShortTimes).text(playbackTime.substring(0, playbackTime.indexOf('/')));
            this.controlsFunctions.updatePlayerProgress(currentTime);
        }
    }

    public showHideMainControls(show: boolean): void {
        if (show && !this.controlsFunctions.nowPlayingEmpty()) /*then*/ $(HtmlControls.Containers().MainControlsContainer).removeClass('d-none').addClass('d-flex');
        else $(HtmlControls.Containers().MainControlsContainer).removeClass('d-flex').addClass('d-none');
    }

    private playClicked(evt: JQuery.ClickEvent): void {
        const player = this.controlsFunctions.getPlayer(),
            id = $(player).attr('data-item-id'),
            type = this.playerConfiguration.properties.SelectedMediaType,
            progress = player.currentTime || 0;

        if (id) {
            if (this.playerConfiguration.properties.SelectedMediaType === MediaTypes.Podcast ||
                this.playerConfiguration.properties.SelectedMediaType === MediaTypes.Television) {
                $.get('Player/GetPlayerProgress?id=' + id + '&mediaType=' + type, (data: number) => {
                    const savedProgress = data || 0;

                    if (this.playerConfiguration.properties.ProgressUpdateInterval < Math.abs(savedProgress - progress)) {
                        this.controlsFunctions.setCurrentTime(savedProgress);
                    }

                    this.controlsFunctions.play();
                });
            } else {
                this.controlsFunctions.play();
            }
        }
    }
}