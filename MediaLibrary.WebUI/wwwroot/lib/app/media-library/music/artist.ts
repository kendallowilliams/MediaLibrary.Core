﻿import BaseClass from "../../assets/models/base-class";
import MusicConfiguration from "../../assets/models/configurations/music-configuration";
import { MusicPages } from "../../assets/enums/enums";
import { MlCallback } from "../../assets/types/callback.type";

export default class Artist extends BaseClass {
    constructor(private musicConfiguration: MusicConfiguration, private reload: MlCallback) {
        super();
    }

    initializeControls(): void {
        $('[data-back-button="artist"]').on('click', () => this.goBack(this.reload));
    }

    loadArtist(id: number, callback: MlCallback = () => null): void {
        this.musicConfiguration.properties.SelectedArtistId = id;
        this.musicConfiguration.properties.SelectedMusicPage = MusicPages.Artist;
        this.musicConfiguration.updateConfiguration()
            .then(() => callback());
    }

    private goBack(callback: MlCallback = () => null): void {
        this.musicConfiguration.properties.SelectedArtistId = 0;
        this.musicConfiguration.properties.SelectedMusicPage = MusicPages.Index;
        this.musicConfiguration.updateConfiguration()
            .then(() => callback());
    }
}