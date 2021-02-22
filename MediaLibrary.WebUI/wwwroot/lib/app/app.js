define("assets/models/base-class", ["require", "exports", "jquery"], function (require, exports, jQuery) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseClass {
        constructor() {
            this.$ = jQuery;
        }
    }
    exports.default = BaseClass;
});
define("assets/interfaces/view-interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("assets/models/configurations/base-configuration", ["require", "exports", "assets/models/base-class"], function (require, exports, base_class_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaseConfiguration extends base_class_1.default {
        constructor(controller) {
            super();
            this.controller = controller;
        }
        update(data, callback = () => null) {
            const url = this.controller.concat('/UpdateConfiguration');
            $.post(url, data, () => callback());
        }
        refresh(callback = () => null) {
            const url = this.controller.concat('/').concat(this.controller).concat('Configuration'), success = (data) => {
                this.properties = data;
                callback();
            };
            $.get(url, success);
        }
    }
    exports.default = BaseConfiguration;
});
define("assets/enums/enums", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("assets/interfaces/configuration-interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("assets/interfaces/music-configuration-interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("assets/models/configurations/music-configuration", ["require", "exports", "assets/models/configurations/base-configuration"], function (require, exports, base_configuration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MusicConfiguration extends base_configuration_1.default {
        constructor(properties) {
            super('Music');
            this.properties = properties;
        }
        updateConfiguration(callback = () => null) {
            super.update(this.properties, callback);
        }
    }
    exports.default = MusicConfiguration;
});
define("assets/controls/html-controls", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        Views: () => ({
            HomeView: document.getElementById('home-view'),
            PlayerView: document.getElementById('player-view'),
            MediaView: document.getElementById('media-view'),
            PodcastView: document.getElementById('podcast-view'),
            SeasonView: document.getElementById('season-view')
        }),
        Players: () => ({
            MusicPlayer: document.getElementById('music-player'),
            VideoPlayer: document.getElementById('video-player')
        }),
        Buttons: () => ({
            HeaderPlayButton: document.getElementById('btn-header-play'),
            HeaderPreviousButton: document.getElementById('btn-header-previous'),
            HeaderBackwardButton: document.getElementById('btn-header-backward'),
            HeaderForwardButton: document.getElementById('btn-header-forward'),
            HeaderNextButton: document.getElementById('btn-header-next'),
            HeaderPauseButton: document.getElementById('btn-header-pause'),
            HeaderShuffleButton: document.getElementById('btn-header-shuffle'),
            HeaderRepeatButton: document.getElementById('btn-header-repeat'),
            HeaderRepeatOneButton: document.getElementById('btn-header-repeat-one'),
            HeaderRepeatAllButton: document.getElementById('btn-header-repeat-all'),
            PlayerPlayButton: document.getElementById('btn-player-play'),
            PlayerPreviousButton: document.getElementById('btn-player-previous'),
            PlayerBackwardButton: document.getElementById('btn-player-backward'),
            PlayerForwardButton: document.getElementById('btn-player-forward'),
            PlayerNextButton: document.getElementById('btn-player-next'),
            PlayerPauseButton: document.getElementById('btn-player-pause'),
            PlayerShuffleButton: document.getElementById('btn-player-shuffle'),
            PlayerRepeatButton: document.getElementById('btn-player-repeat'),
            PlayerRepeatOneButton: document.getElementById('btn-player-repeat-one'),
            PlayerRepeatAllButton: document.getElementById('btn-player-repeat-all'),
            PlayerPlaylistToggleButton: document.getElementById('btn-player-playlist-toggle'),
            PlayerVolumeButton: document.getElementById('btn-player-volume'),
            PlayerMuteButton: document.getElementById('btn-player-mute'),
            PlayerFullscreenButton: document.getElementById('btn-player-fullscreen'),
            PlayerClearButton: document.getElementById('btn-player-clear'),
            PlayerAudioVisualizerButton: document.getElementById('btn-audio-visualizer')
        }),
        Containers: () => ({
            HeaderControlsContainer: document.getElementById('header-controls-container'),
            PlayerVideoContainer: document.getElementById('video-container'),
            PlayerAudioContainer: document.getElementById('audio-container'),
            PlayerItemsContainer: document.getElementById('player-items-container'),
            PlayerVolumeContainer: document.getElementById('player-volume-container'),
            SongsContainer: document.getElementById('songs-container'),
            ArtistsContainer: document.getElementById('artists-container'),
            AlbumsContainer: document.getElementById('albums-container'),
            MusicPlaylistContainer: document.getElementById('music-playlist-container'),
            PodcastPlaylistContainer: document.getElementById('podcast-playlist-container'),
            EpisodePlaylistContainer: document.getElementById('episode-playlist-container'),
            SearchSongsContainer: document.getElementById('search-songs-container'),
            SearchArtistsContainer: document.getElementById('search-artists-container'),
            SearchAlbumsContainer: document.getElementById('search-albums-container')
        }),
        UIControls: () => ({
            PlayerSlider: document.getElementById('player-slider'),
            VolumeSlider: document.getElementById('volume-slider'),
            PlayerTime: document.getElementById('player-time'),
            AudioVisualizer: document.getElementById('audio-visualizer'),
            MusicTabList: document.getElementById('music-tab-list'),
            PlaylistTabList: document.getElementById('playlist-tab-list'),
            SearchQuery: document.getElementById('search-query')
        }),
        UIFields: () => ({
            NowPlayingTitle: document.getElementById('player-title')
        }),
        Modals: () => ({
            NewPlaylistModal: document.getElementById('new-playlist-modal'),
            NewSongModal: document.getElementById('new-song-modal'),
            NewPodcastModal: document.getElementById('new-podcast-modal'),
            AddToPlaylistModal: document.getElementById('add-to-playlist-modal'),
            EdiPlaylistModal: document.getElementById('edit-playlist-modal'),
            EditSongModal: document.getElementById('edit-song-modal'),
            LoadingModal: document.getElementById('loading-modal'),
            DownloadM3UPlaylistModal: document.getElementById('download-m3u-playlist-modal'),
            ManageDirectoriesModal: document.getElementById('manage-directories-modal'),
            AlertModal: document.getElementById('alert-modal'),
            ErrorModal: document.getElementById('error-modal'),
            ConfirmModal: document.getElementById('confirm-modal'),
            WarningModal: document.getElementById('warning-modal')
        })
    };
});
define("media-library/music/artist", ["require", "exports", "assets/models/base-class"], function (require, exports, base_class_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Artist extends base_class_2.default {
        constructor(musicConfiguration, reload) {
            super();
            this.musicConfiguration = musicConfiguration;
            this.reload = reload;
        }
        initializeControls() {
            $('[data-back-button="artist"]').on('click', () => this.goBack(this.reload));
        }
        loadArtist(id, callback = () => null) {
            this.musicConfiguration.properties.SelectedArtistId = id;
            this.musicConfiguration.properties.SelectedMusicPage = 2 /* Artist */;
            this.musicConfiguration.updateConfiguration(callback);
        }
        goBack(callback = () => null) {
            this.musicConfiguration.properties.SelectedArtistId = 0;
            this.musicConfiguration.properties.SelectedMusicPage = 0 /* Index */;
            this.musicConfiguration.updateConfiguration(callback);
        }
    }
    exports.default = Artist;
});
define("media-library/music/album", ["require", "exports", "assets/models/base-class"], function (require, exports, base_class_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Album extends base_class_3.default {
        constructor(musicConfiguration, reload) {
            super();
            this.musicConfiguration = musicConfiguration;
            this.reload = reload;
        }
        initializeControls() {
            $('[data-back-button="album"]').on('click', () => this.goBack(this.reload));
        }
        loadAlbum(id, callback = () => null) {
            this.musicConfiguration.properties.SelectedAlbumId = id;
            this.musicConfiguration.properties.SelectedMusicPage = 1 /* Album */;
            this.musicConfiguration.updateConfiguration(callback);
        }
        goBack(callback = () => null) {
            this.musicConfiguration.properties.SelectedAlbumId = 0;
            this.musicConfiguration.properties.SelectedMusicPage = 0 /* Index */;
            this.musicConfiguration.updateConfiguration(callback);
        }
    }
    exports.default = Album;
});
define("assets/modals/loading-modal", ["require", "exports", "assets/controls/html-controls"], function (require, exports, html_controls_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        showLoading: function () {
            var $modal = $(html_controls_1.default.Modals().LoadingModal), processCount = parseInt($modal.attr('data-process-count'));
            if (!isNaN(processCount)) {
                $modal.attr('data-process-count', processCount++);
            }
            else {
                $modal.attr('data-process-count', 1);
            }
            $modal.modal('show');
        },
        hideLoading: function () {
            var $modal = $(html_controls_1.default.Modals().LoadingModal), processCount = parseInt($modal.attr('data-process-count'));
            if (!isNaN(processCount)) {
                $modal.attr('data-process-count', processCount--);
                if (processCount == 0) /*then*/
                    $modal.modal('hide');
            }
            else {
                $modal.attr('data-process-count', 0);
            }
        }
    };
});
define("assets/utilities/bootstrap-helper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.disposePopovers = exports.loadPopovers = exports.disposeTooltips = exports.loadTooltips = void 0;
    function loadTooltips(parent) {
        if (parent) /*then*/
            $(parent).find('*[data-tooltip="tooltip"]').tooltip({ trigger: 'hover', placement: 'auto' });
    }
    exports.loadTooltips = loadTooltips;
    function disposeTooltips(parent) {
        if (parent) /*then*/
            $(parent).find('*[data-tooltip="tooltip"]').tooltip('dispose');
    }
    exports.disposeTooltips = disposeTooltips;
    function loadPopovers(parent) {
        if (parent) /*then*/
            $(parent).find('*[data-toggle="popover"]').popover({ trigger: 'hover' });
    }
    exports.loadPopovers = loadPopovers;
    function disposePopovers(element) {
        if (element) /*then*/
            $(element).find('*[data-toggle="popover"]').popover('dispose');
    }
    exports.disposePopovers = disposePopovers;
});
define("assets/modals/add-song-modal", ["require", "exports", "assets/controls/html-controls", "assets/modals/loading-modal"], function (require, exports, html_controls_2, loading_modal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AddNewSongModal {
        constructor(loadFunc = () => null) {
            this.loadFunc = loadFunc;
            this.modal = html_controls_2.default.Modals().NewSongModal;
            this.initializeControls();
        }
        initializeControls() {
            $(this.modal).on('show.bs.modal', function (e) {
                $('#inpNewSong').val('');
            });
            $('[data-song-action="upload"]').on('click', e => {
                const data = new FormData(), success = () => this.loadFunc(() => loading_modal_1.default.hideLoading());
                $(this.modal).modal('hide');
                if ($('#inpNewSong').prop('files').length > 0) {
                    loading_modal_1.default.showLoading();
                    data.append("file", $('#inpNewSong').prop('files')[0]);
                    $.ajax({
                        url: 'Music/Upload',
                        data: data,
                        processData: false,
                        contentType: false,
                        type: 'POST',
                        success: success
                    });
                }
            });
        }
    }
    exports.default = AddNewSongModal;
});
define("assets/enums/enum-functions", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getPlaylistTabEnum = exports.getPlaylistTabEnumString = exports.getPodcastFilterEnum = exports.getPodcastSortEnum = exports.getPlaylistSortEnumString = exports.getPlaylistSortEnum = exports.getMediaTypesEnumString = exports.getMediaTypesEnum = exports.getRepeatTypesEnumString = exports.getPlayerPageEnum = exports.getSongSortEnum = exports.getMusicTabEnumString = exports.getMusicTabEnum = exports.getArtistSortEnum = exports.getAlbumSortEnum = exports.getSeriesSortEnum = exports.getMediaPagesEnumString = exports.getMediaPagesEnum = void 0;
    function getMediaPagesEnum(page) {
        let mediaPage;
        switch (page) {
            case 'Music':
                mediaPage = 1 /* Music */;
                break;
            case 'Playlist':
                mediaPage = 2 /* Playlist */;
                break;
            case 'Player':
                mediaPage = 4 /* Player */;
                break;
            case 'Podcast':
                mediaPage = 3 /* Podcast */;
                break;
            case 'Television':
                mediaPage = 5 /* Television */;
                break;
            case 'Home':
            default:
                mediaPage = 0 /* Home */;
                break;
        }
        return mediaPage;
    }
    exports.getMediaPagesEnum = getMediaPagesEnum;
    ;
    function getMediaPagesEnumString(page) {
        let mediaPage;
        switch (page) {
            case 1 /* Music */:
                mediaPage = 'Music';
                break;
            case 2 /* Playlist */:
                mediaPage = 'Playlist';
                break;
            case 4 /* Player */:
                mediaPage = 'Player';
                break;
            case 3 /* Podcast */:
                mediaPage = 'Podcast';
                break;
            case 5 /* Television */:
                mediaPage = 'Television';
                break;
            case 0 /* Home */:
            default:
                mediaPage = 'Home';
                break;
        }
        return mediaPage;
    }
    exports.getMediaPagesEnumString = getMediaPagesEnumString;
    ;
    function getSeriesSortEnum(sort) {
        let seriesSort;
        switch (sort) {
            case 'AtoZ':
            default:
                seriesSort = 0 /* AtoZ */;
                break;
        }
        return seriesSort;
    }
    exports.getSeriesSortEnum = getSeriesSortEnum;
    ;
    function getAlbumSortEnum(sort) {
        let albumSort;
        switch (sort) {
            case 'AtoZ':
            default:
                albumSort = 0 /* AtoZ */;
                break;
        }
        return albumSort;
    }
    exports.getAlbumSortEnum = getAlbumSortEnum;
    ;
    function getArtistSortEnum(sort) {
        let artistSort;
        switch (sort) {
            case 'AtoZ':
            default:
                artistSort = 0 /* AtoZ */;
                break;
        }
        return artistSort;
    }
    exports.getArtistSortEnum = getArtistSortEnum;
    ;
    function getMusicTabEnum(tab) {
        let musicTab;
        switch (tab) {
            case 'Artists':
                musicTab = 1 /* Artists */;
                break;
            case 'Albums':
                musicTab = 0 /* Albums */;
                break;
            case 'Songs':
            default:
                musicTab = 2 /* Songs */;
                break;
        }
        return musicTab;
    }
    exports.getMusicTabEnum = getMusicTabEnum;
    ;
    function getMusicTabEnumString(tab) {
        let musicTab;
        switch (tab) {
            case 1 /* Artists */:
                musicTab = 'Artists';
                break;
            case 0 /* Albums */:
                musicTab = 'Albums';
                break;
            case 2 /* Songs */:
            default:
                musicTab = 'Songs';
                break;
        }
        return musicTab;
    }
    exports.getMusicTabEnumString = getMusicTabEnumString;
    ;
    function getSongSortEnum(sort) {
        let songSort;
        switch (sort) {
            case 'Album':
                songSort = 1 /* Album */;
                break;
            case 'Artist':
                songSort = 2 /* Artist */;
                break;
            case 'DateAdded':
                songSort = 3 /* DateAdded */;
                break;
            case 'Genre':
                songSort = 4 /* Genre */;
                break;
            case 'AtoZ':
            default:
                songSort = 0 /* AtoZ */;
                break;
        }
        return songSort;
    }
    exports.getSongSortEnum = getSongSortEnum;
    ;
    function getPlayerPageEnum(page) {
        let playerPage = 0 /* Index */;
        switch (page) {
            case 'Audio':
                playerPage = 1 /* Audio */;
                break;
            case 'Video':
                playerPage = 2 /* Video */;
                break;
            case 'Index':
            default:
                playerPage = 0 /* Index */;
                break;
        }
        return playerPage;
    }
    exports.getPlayerPageEnum = getPlayerPageEnum;
    ;
    function getRepeatTypesEnumString(page) {
        let repeatType;
        switch (page) {
            case 0 /* None */:
                repeatType = 'None';
                break;
            case 2 /* RepeatAll */:
                repeatType = 'RepeatAll';
                break;
            case 1 /* RepeatOne */:
                repeatType = 'RepeatOne';
                break;
            default:
                repeatType = '';
                break;
        }
        return repeatType;
    }
    exports.getRepeatTypesEnumString = getRepeatTypesEnumString;
    ;
    function getMediaTypesEnum(type) {
        let mediaType;
        switch (type) {
            case 'Television':
                mediaType = 2 /* Television */;
                break;
            case 'Podcast':
                mediaType = 1 /* Podcast */;
                break;
            case 'Song':
            default:
                mediaType = 0 /* Song */;
                break;
        }
        return mediaType;
    }
    exports.getMediaTypesEnum = getMediaTypesEnum;
    ;
    function getMediaTypesEnumString(type) {
        let mediaType;
        switch (type) {
            case 2 /* Television */:
                mediaType = 'Television';
                break;
            case 1 /* Podcast */:
                mediaType = 'Podcast';
                break;
            case 0 /* Song */:
            default:
                mediaType = 'Song';
                break;
        }
        return mediaType;
    }
    exports.getMediaTypesEnumString = getMediaTypesEnumString;
    ;
    function getPlaylistSortEnum(sort) {
        let playlistSort;
        switch (sort) {
            case 'DateAdded':
                playlistSort = 1 /* DateAdded */;
                break;
            case 'AtoZ':
            default:
                playlistSort = 0 /* AtoZ */;
                break;
        }
        return playlistSort;
    }
    exports.getPlaylistSortEnum = getPlaylistSortEnum;
    ;
    function getPlaylistSortEnumString(sort) {
        let playlistSort;
        switch (sort) {
            case 1 /* DateAdded */:
                playlistSort = 'DateAdded';
                break;
            case 0 /* AtoZ */:
            default:
                playlistSort = 'AtoZ';
                break;
        }
        return playlistSort;
    }
    exports.getPlaylistSortEnumString = getPlaylistSortEnumString;
    ;
    function getPodcastSortEnum(sort) {
        let podcastSort;
        switch (sort) {
            case 'LastUpdateDate':
                podcastSort = 0 /* LastUpdateDate */;
                break;
            case 'DateAdded':
                podcastSort = 2 /* DateAdded */;
                break;
            case 'AtoZ':
            default:
                podcastSort = 1 /* AtoZ */;
                break;
        }
        return podcastSort;
    }
    exports.getPodcastSortEnum = getPodcastSortEnum;
    ;
    function getPodcastFilterEnum(filter) {
        let podcastFilter;
        switch (filter) {
            case 'Downloaded':
                podcastFilter = 1 /* Downloaded */;
                break;
            case 'Unplayed':
                podcastFilter = 2 /* Unplayed */;
                break;
            case 'All':
            default:
                podcastFilter = 0 /* All */;
                break;
        }
        return podcastFilter;
    }
    exports.getPodcastFilterEnum = getPodcastFilterEnum;
    ;
    function getPlaylistTabEnumString(tab) {
        let playlistTab;
        switch (tab) {
            case 1 /* Podcast */:
                playlistTab = 'Podcast';
                break;
            case 2 /* Television */:
                playlistTab = 'Television';
                break;
            case 0 /* Music */:
            default:
                playlistTab = 'Music';
                break;
        }
        return playlistTab;
    }
    exports.getPlaylistTabEnumString = getPlaylistTabEnumString;
    ;
    function getPlaylistTabEnum(tab) {
        let playlistTab;
        switch (tab) {
            case 'Podcast':
                playlistTab = 1 /* Podcast */;
                break;
            case 'Television':
                playlistTab = 2 /* Television */;
                break;
            case 'Music':
            default:
                playlistTab = 0 /* Music */;
                break;
        }
        return playlistTab;
    }
    exports.getPlaylistTabEnum = getPlaylistTabEnum;
    ;
});
define("media-library/music/search", ["require", "exports", "assets/models/base-class", "assets/controls/html-controls", "assets/modals/loading-modal"], function (require, exports, base_class_4, html_controls_3, loading_modal_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Search extends base_class_4.default {
        constructor(musicConfiguration, reload, playFunc, loadAlbum, loadArtist, updateActiveMediaFunc = () => null) {
            super();
            this.musicConfiguration = musicConfiguration;
            this.reload = reload;
            this.playFunc = playFunc;
            this.loadAlbum = loadAlbum;
            this.loadArtist = loadArtist;
            this.updateActiveMediaFunc = updateActiveMediaFunc;
            this.searchDelay = 1;
        }
        initializeControls() {
            $('[data-back-button="search"]').on('click', () => {
                this.musicConfiguration.properties.PreviousSearchQuery = '';
                this.musicConfiguration.updateConfiguration(() => this.goBack(this.reload));
            });
            $('[data-music-action="search-music"]').on('click', this.search.bind(this));
            $(html_controls_3.default.UIControls().SearchQuery).on('input', () => {
                if (this.searchTimeout) {
                    clearTimeout(this.searchTimeout);
                    this.searchTimeout = null;
                }
                this.searchTimeout = setTimeout(this.search.bind(this), this.searchDelay * 1000);
            });
            $(html_controls_3.default.UIControls().SearchQuery).val(this.musicConfiguration.properties.PreviousSearchQuery);
        }
        loadSearch(callback = () => null) {
            this.musicConfiguration.properties.SelectedMusicPage = 3 /* Search */;
            this.musicConfiguration.updateConfiguration(callback);
        }
        goBack(callback = () => null) {
            this.musicConfiguration.properties.SelectedMusicPage = 0 /* Index */;
            this.musicConfiguration.updateConfiguration(callback);
        }
        _loadAlbum(id) {
            loading_modal_2.default.showLoading();
            this.musicConfiguration.properties.PreviousSearchQuery = '';
            this.musicConfiguration.updateConfiguration(() => {
                this.loadAlbum(id, this.reload);
                loading_modal_2.default.hideLoading();
            });
        }
        _loadArtist(id) {
            loading_modal_2.default.showLoading();
            this.musicConfiguration.properties.PreviousSearchQuery = '';
            this.musicConfiguration.updateConfiguration(() => {
                this.loadArtist(id, this.reload);
                loading_modal_2.default.hideLoading();
            });
        }
        search() {
            const input = html_controls_3.default.UIControls().SearchQuery, query = $(input).val(), $btn = $('[data-music-action="search-music"]'), showHideLoading = searching => {
                if (searching) {
                    $btn.find('[data-searching-visible="false"]').addClass('d-none');
                    $btn.find('[data-searching-visible="true"]').removeClass('d-none');
                }
                else {
                    $btn.find('[data-searching-visible="true"]').addClass('d-none');
                    $btn.find('[data-searching-visible="false"]').removeClass('d-none');
                }
                $btn.prop('disabled', searching);
            }, containers = html_controls_3.default.Containers();
            if (query && query.length >= input.minLength) {
                showHideLoading(true);
                loading_modal_2.default.showLoading();
                this.musicConfiguration.properties.PreviousSearchQuery = query;
                this.musicConfiguration.updateConfiguration(() => {
                    $(containers.SearchAlbumsContainer).load('Music/SearchAlbums', { query: query }, () => {
                        $(containers.SearchArtistsContainer).load('Music/SearchArtists', { query: query }, () => {
                            $(containers.SearchSongsContainer).load('Music/SearchSongs', { query: query }, () => {
                                $(containers.SearchSongsContainer).find('[data-play-id]').on('click', e => {
                                    this.playFunc(e.currentTarget, true);
                                });
                                $('[data-artist-id]').on('click', _e => this._loadArtist(parseInt($(_e.currentTarget).attr('data-artist-id'))));
                                $('[data-album-id]').on('click', _e => this._loadAlbum(parseInt($(_e.currentTarget).attr('data-album-id'))));
                                this.updateActiveMediaFunc();
                                showHideLoading(false);
                                loading_modal_2.default.hideLoading();
                                $(html_controls_3.default.UIControls().SearchQuery).focus();
                            });
                        });
                    });
                });
            }
            else {
                loading_modal_2.default.showLoading();
                this.musicConfiguration.properties.PreviousSearchQuery = '';
                this.musicConfiguration.updateConfiguration(() => {
                    $(containers.SearchAlbumsContainer).html('<div>No albums.</div>');
                    $(containers.SearchArtistsContainer).html('<div>No artists.</div>');
                    $(containers.SearchSongsContainer).html('<div>No songs.</div>');
                    showHideLoading(false);
                    loading_modal_2.default.hideLoading();
                });
            }
        }
    }
    exports.default = Search;
    ;
});
define("assets/interfaces/media-library-configuration-interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("assets/models/configurations/media-library-configuration", ["require", "exports", "assets/models/configurations/base-configuration"], function (require, exports, base_configuration_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MediaLibraryConfiguration extends base_configuration_2.default {
        constructor(properties) {
            super('MediaLibrary');
            this.properties = properties;
        }
        updateConfiguration(callback = () => null) {
            super.update(this.properties, callback);
        }
    }
    exports.default = MediaLibraryConfiguration;
});
define("assets/utilities/message-box", ["require", "exports", "assets/controls/html-controls"], function (require, exports, html_controls_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.confirm = exports.showWarning = exports.showError = exports.alert = void 0;
    function initialize() {
        const $alertModal = $(html_controls_4.default.Modals().AlertModal), $confirmModal = $(html_controls_4.default.Modals().ConfirmModal), $errorModal = $(html_controls_4.default.Modals().ErrorModal), $warningModal = $(html_controls_4.default.Modals().WarningModal);
        $([$alertModal, $confirmModal, $errorModal, $warningModal]).each((index, element) => {
            if ($(element).attr('data-initialized') !== 'true') {
                $(element).on('hidden.bs.modal', e => {
                    const $title = $(e.currentTarget).find('.modal-title'), $body = $(e.currentTarget).find('.modal-body');
                    $title.html('');
                    $body.html('');
                });
            }
        });
        if ($alertModal.attr('data-initialized') !== 'true') {
            $alertModal.attr('data-initialized', 'true');
        }
        if ($confirmModal.attr('data-initialized') !== 'true') {
            $confirmModal.find('[data-button="callback"]').off();
            $confirmModal.attr('data-initialized', 'true');
        }
        if ($errorModal.attr('data-initialized') !== 'true') {
            $errorModal.attr('data-initialized', 'true');
        }
        if ($warningModal.attr('data-initialized') !== 'true') {
            $warningModal.attr('data-initialized', 'true');
        }
    }
    function alert(title, message, isHtml = false) {
        const $modal = $(html_controls_4.default.Modals().AlertModal), $title = $modal.find('.modal-title'), $body = $modal.find('.modal-body');
        if ($modal.attr('data-initialized') !== 'true') /*then*/
            initialize();
        if (isHtml) {
            $title.html(title);
            $body.html(message);
        }
        else {
            $title.text(title);
            $body.text(message);
        }
        $modal.modal('show');
    }
    exports.alert = alert;
    function showError(title, message) {
        const $modal = $(html_controls_4.default.Modals().ErrorModal), $title = $modal.find('.modal-title'), $body = $modal.find('.modal-body');
        if ($modal.attr('data-initialized') !== 'true') /*then*/
            initialize();
        $title.text(title);
        $body.text(message);
        $modal.modal('show');
    }
    exports.showError = showError;
    function showWarning(title, message) {
        const $modal = $(html_controls_4.default.Modals().WarningModal), $title = $modal.find('.modal-title'), $body = $modal.find('.modal-body');
        if ($modal.attr('data-initialized') !== 'true') /*then*/
            initialize();
        $title.text(title);
        $body.text(message);
        $modal.modal('show');
    }
    exports.showWarning = showWarning;
    function confirm(title, message, showYesNo, callback) {
        const $modal = $(html_controls_4.default.Modals().ConfirmModal), $title = $modal.find('.modal-title'), $body = $modal.find('.modal-body'), $okCancelContainer = $modal.find('[data-buttons="OK/Cancel"]'), $yesNoContainer = $modal.find('[data-buttons="Yes/No"]'), $btnContainer = showYesNo ? $yesNoContainer : $okCancelContainer;
        if ($modal.attr('data-initialized') !== 'true') /*then*/
            initialize();
        $title.text(title);
        $body.text(message);
        $btnContainer.find('[data-button="callback"]').off('click').on('click', () => {
            $modal.on('hide.bs.modal', () => {
                callback();
                $modal.off('hide.bs.modal');
            });
            $modal.modal('hide');
        });
        $([$okCancelContainer, $yesNoContainer]).addClass('d-none');
        if (showYesNo) /*then*/
            $yesNoContainer.removeClass('d-none');
        else /*then*/
            $okCancelContainer.removeClass('d-none');
        $modal.modal('show');
    }
    exports.confirm = confirm;
});
define("assets/modals/manage-directories-modal", ["require", "exports", "assets/controls/html-controls", "assets/modals/loading-modal", "assets/utilities/bootstrap-helper", "assets/utilities/message-box"], function (require, exports, html_controls_5, loading_modal_3, bootstrap_helper_1, MessageBox) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ManageDirectoriesModal {
        constructor(loadFunc = () => null) {
            this.loadFunc = loadFunc;
            this.modal = html_controls_5.default.Modals().ManageDirectoriesModal;
            this.initializeControls();
        }
        initializeControls() {
            $(this.modal).on('show.bs.modal', e => {
            });
            $(this.modal).on('hide.bs.modal', e => {
                bootstrap_helper_1.disposeTooltips(this.modal);
                $(this.modal).find('.modal-body').html('');
            });
            $('[data-music-action="manage-directories"]').on('click', e => {
                this.loadMusicDirectory(null, () => $(this.modal).modal('show'));
            });
        }
        loadMusicDirectory(path = null, callback = () => null) {
            const $modal = $(this.modal);
            loading_modal_3.default.showLoading();
            bootstrap_helper_1.disposeTooltips(this.modal);
            $modal.find('.modal-body').load('Music/GetMusicDirectory?path=' + path, () => {
                const $modal = $(this.modal);
                $modal.find('[data-directory-action="get"]').on('click', e => {
                    const path = $(e.currentTarget).attr('data-directory-path');
                    this.loadMusicDirectory(encodeURIComponent(path));
                });
                $modal.find('[data-directory-action-type="remove"]').on('click', e => {
                    this.removeMusicDirectory(e.currentTarget);
                });
                $modal.find('[data-directory-action-type="add"]').on('click', e => {
                    this.addMusicDirectory(e.currentTarget);
                });
                bootstrap_helper_1.loadTooltips(this.modal);
                callback();
                loading_modal_3.default.hideLoading();
                this.refreshDirectories();
            });
        }
        addMusicDirectory(btn) {
            const $btn = $(btn), action = $btn.attr('data-directory-action'), path = $btn.attr('data-directory-path'), title = 'Add directory', message = 'Are you sure you want to add '.concat(path).concat('?');
            MessageBox.confirm(title, message, true, () => {
                loading_modal_3.default.showLoading();
                $(this.modal).modal('hide');
                $.post(action, { path: path }, () => {
                    loading_modal_3.default.hideLoading();
                });
            });
        }
        removeMusicDirectory(btn) {
            const $btn = $(btn), action = $btn.attr('data-directory-action'), id = $btn.attr('data-path-id'), title = 'Remove directory', message = 'Are you sure you want to remove this directory?';
            MessageBox.confirm(title, message, true, () => {
                loading_modal_3.default.showLoading();
                $(this.modal).modal('hide');
                $.post(action, { id: id }, () => this.loadFunc(() => loading_modal_3.default.hideLoading()));
            });
        }
        refreshDirectories(id = null) {
            const $items = !id ? $('[data-directory-status="loading"]') :
                $('[data-directory-status="monitoring"][data-transaction-id="' + id + '"]');
            if ($items.length > 0) /*then*/
                window.setTimeout(() => {
                    $items.each((index, element) => {
                        const itemId = $(element).attr('data-transaction-id');
                        $(element).attr('data-directory-status', 'monitoring');
                        $.get('Music/IsScanCompleted?id=' + itemId, data => {
                            if (data && data.toLowerCase() === 'false') {
                                this.refreshDirectories(itemId);
                            }
                            else {
                                $(element).find('i').replaceWith('<i class="fa fa-check"></i>');
                            }
                        });
                    });
                }, 5000);
        }
    }
    exports.default = ManageDirectoriesModal;
});
define("media-library/music/music", ["require", "exports", "assets/models/base-class", "assets/controls/html-controls", "media-library/music/artist", "media-library/music/album", "assets/modals/loading-modal", "assets/utilities/bootstrap-helper", "assets/modals/add-song-modal", "assets/enums/enum-functions", "media-library/music/search", "assets/modals/manage-directories-modal"], function (require, exports, base_class_5, html_controls_6, artist_1, album_1, loading_modal_4, bootstrap_helper_2, add_song_modal_1, enum_functions_1, search_1, manage_directories_modal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Music extends base_class_5.default {
        constructor(musicConfiguration, playFunc, updateActiveMediaFunc) {
            super();
            this.musicConfiguration = musicConfiguration;
            this.playFunc = playFunc;
            this.updateActiveMediaFunc = updateActiveMediaFunc;
            this.mediaView = html_controls_6.default.Views().MediaView;
            this.artist = new artist_1.default(musicConfiguration, this.loadView.bind(this));
            this.album = new album_1.default(musicConfiguration, this.loadView.bind(this));
            this.search = new search_1.default(musicConfiguration, this.loadView.bind(this), this.playFunc.bind(this), this.loadAlbum.bind(this), this.loadArtist.bind(this), this.updateActiveMediaFunc.bind(this));
        }
        loadView(callback = () => null) {
            const success = () => {
                this.addNewSongModal = new add_song_modal_1.default(this.loadView.bind(this));
                this.manageDirectoriesModal = new manage_directories_modal_1.default(this.loadView.bind(this));
                this.initializeControls();
                bootstrap_helper_2.loadTooltips(this.mediaView);
                $('[data-music-tab="' + enum_functions_1.getMusicTabEnumString(this.musicConfiguration.properties.SelectedMusicTab) + '"]').tab('show');
                this.updateActiveMediaFunc();
                if (this.musicConfiguration.properties.SelectedMusicPage === 3 /* Search */) /*then*/
                    this.search.search();
                callback();
            };
            bootstrap_helper_2.disposeTooltips(this.mediaView);
            $(this.mediaView).load('Music/Index', success);
        }
        loadArtist(id, callback) {
            if (Number.isInteger(id)) {
                this.artist.loadArtist.call(this.artist, id, callback);
            }
        }
        loadAlbum(id, callback) {
            if (Number.isInteger(id)) {
                this.album.loadAlbum.call(this.album, id, callback);
            }
        }
        initializeControls() {
            const properties = this.musicConfiguration.properties, playSingle = properties.SelectedMusicTab === 2 /* Songs */ && properties.SelectedMusicPage === 0 /* Index */;
            $('[data-play-id]').on('click', e => this.playFunc(e.currentTarget, playSingle));
            $('[data-album-id]').on('click', _e => this.album.loadAlbum(parseInt($(_e.currentTarget).attr('data-album-id')), () => this.loadView()));
            $('[data-artist-id]').on('click', _e => this.artist.loadArtist(parseInt($(_e.currentTarget).attr('data-artist-id')), () => this.loadView()));
            $(html_controls_6.default.UIControls().MusicTabList).find('*[data-toggle="tab"]').on('shown.bs.tab', e => {
                const $newTab = $(e.target), $oldTab = $(e.relatedTarget), $newView = $($newTab.attr('href')), $oldView = $($oldTab.attr('href')), url = $newView.attr('data-load-url'), success = () => {
                    loading_modal_4.default.hideLoading();
                    bootstrap_helper_2.loadTooltips($newView[0]);
                    $('[data-group-url]').on('click', _e => {
                        const $btn = $(_e.currentTarget), url = $btn.attr('data-group-url');
                        if (url) {
                            loading_modal_4.default.showLoading();
                            bootstrap_helper_2.disposeTooltips($($btn.attr('data-target'))[0]);
                            $($btn.attr('data-target')).load(url, () => {
                                bootstrap_helper_2.loadTooltips($($btn.attr('data-target'))[0]);
                                $($btn.attr('data-target')).find('*[data-play-id]').on('click', __e => this.playFunc(__e.currentTarget, true));
                                loading_modal_4.default.hideLoading();
                                $btn.attr('data-group-url', '');
                                this.updateActiveMediaFunc();
                            });
                        }
                    });
                    $('[data-album-id]').on('click', _e => this.album.loadAlbum(parseInt($(_e.currentTarget).attr('data-album-id')), () => this.loadView()));
                    $('[data-artist-id]').on('click', _e => this.artist.loadArtist(parseInt($(_e.currentTarget).attr('data-artist-id')), () => this.loadView()));
                    $('[data-group-url][data-target="#collapse-songs-0"]').trigger('click');
                    this.updateActiveMediaFunc();
                };
                $(html_controls_6.default.UIControls().MusicTabList).find('*[data-sort-tab]').each((index, _btn) => {
                    if ($(_btn).attr('data-sort-tab') === $newTab.attr('id')) {
                        $(_btn).removeClass('d-none').addClass('d-inline-block');
                    }
                    else {
                        $(_btn).removeClass('d-inline-block').addClass('d-none');
                    }
                });
                loading_modal_4.default.showLoading();
                this.musicConfiguration.properties.SelectedMusicTab = enum_functions_1.getMusicTabEnum($newTab.attr('data-music-tab'));
                bootstrap_helper_2.disposeTooltips($newView[0]);
                this.musicConfiguration.updateConfiguration(() => $newView.load(url, success));
            });
            $(this.mediaView).find('*[data-sort-type]').on('change', e => {
                const select = e.currentTarget, sortType = $(select).attr('data-sort-type');
                if (sortType === 'SelectedAlbumSort') {
                    this.musicConfiguration.properties.SelectedAlbumSort = enum_functions_1.getAlbumSortEnum($(select).val());
                }
                else if (sortType === 'SelectedArtistSort') {
                    this.musicConfiguration.properties.SelectedArtistSort = enum_functions_1.getArtistSortEnum($(select).val());
                }
                else if (sortType === 'SelectedSongSort') {
                    this.musicConfiguration.properties.SelectedSongSort = enum_functions_1.getSongSortEnum($(select).val());
                }
                this.musicConfiguration.updateConfiguration(() => this.loadView());
            });
            $('[data-music-action="refresh"]').on('click', e => {
                loading_modal_4.default.showLoading();
                $.post('Music/Refresh', () => this.loadView(() => loading_modal_4.default.hideLoading()));
            });
            $('[data-music-action="search"]').on('click', e => {
                this.search.loadSearch(() => this.loadView());
            });
            this.search.initializeControls();
            this.album.initializeControls();
            this.artist.initializeControls();
        }
    }
    exports.default = Music;
});
define("assets/interfaces/player-configuration-interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("assets/models/configurations/player-configuration", ["require", "exports", "assets/models/configurations/base-configuration"], function (require, exports, base_configuration_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PlayerConfiguration extends base_configuration_3.default {
        constructor(properties) {
            super('Player');
            this.properties = properties;
        }
        updateConfiguration(callback = () => null) {
            super.update(this.properties, callback);
        }
    }
    exports.default = PlayerConfiguration;
});
define("assets/utilities/math", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRandomInteger = void 0;
    /*
     * https://www.w3schools.com/js/js_random.asp
     * @param {number} min
     * @param {number} max
     */
    function getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    exports.getRandomInteger = getRandomInteger;
});
define("media-library/audio-visualizer/audio-visualizer", ["require", "exports", "assets/models/base-class", "assets/controls/html-controls"], function (require, exports, base_class_6, html_controls_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AudioVisualizer extends base_class_6.default {
        constructor(playerConfiguration, audioElement) {
            super();
            this.playerConfiguration = playerConfiguration;
            this.audioElement = audioElement;
            this.canvas = html_controls_7.default.UIControls().AudioVisualizer;
            this.getHeight = () => $(this.canvas).parent().height();
            this.getWidth = () => $(this.canvas).parent().width();
            this.canvasContext = this.canvas.getContext('2d');
            this.fftSize = 256;
            this.drawId = 0;
            this.initialized = false;
            this.enabled = false;
        }
        init() {
            if (this.playerConfiguration.properties.AudioVisualizerEnabled) {
                // eslint-disable-next-line
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                this.analyser = this.audioContext.createAnalyser();
                this.audioSourceNode = this.audioContext.createMediaElementSource(this.audioElement);
                this.analyser.fftSize = this.fftSize;
                this.bufferLength = this.analyser.frequencyBinCount;
                this.dataArray = new Uint8Array(this.bufferLength);
                this.previousDataArray = new Uint8Array(this.bufferLength);
                this.audioSourceNode.connect(this.audioContext.destination);
                this.prepareCanvas();
                this.initialized = true;
                this.enable();
            }
        }
        isInitialized() {
            return this.initialized;
        }
        clear(width, height) {
            this.canvasContext.clearRect(0, 0, width, height);
        }
        prepareCanvas() {
            this.canvas.width = this.getWidth();
            this.canvas.height = this.getHeight();
            this.canvasContext.fillStyle = 'rgb(200, 200, 200)';
            this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        draw(id) {
            let width = this.getWidth(), height = this.getHeight(), numberOfBars = 128, barWidth = this.canvas.width / numberOfBars, barHeight = 0, discY = 0, discHeight = 5, x = 0, step = Math.floor(this.bufferLength / numberOfBars), canContinue = this.enabled && this.drawId === id;
            this.clear(this.canvas.width, this.canvas.height);
            if (this.analyser) /*then*/
                this.analyser.getByteFrequencyData(this.dataArray);
            this.prepareCanvas();
            for (var i = 0; i < this.previousDataArray.length && canContinue; i++) {
                if (this.dataArray[i] > this.previousDataArray[i]) {
                    this.previousDataArray[i] = this.dataArray[i];
                }
                else if (this.previousDataArray[i] > 0) {
                    this.previousDataArray[i] -= 1;
                }
            }
            for (var i = 0; i < numberOfBars && canContinue; i++) {
                barHeight = this.dataArray[i * step] * Math.floor(height / 255);
                discY = (this.previousDataArray[i * step] * Math.floor(height / 255)) + discHeight;
                this.canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
                this.canvasContext.fillRect(x, height - barHeight, barWidth - 1, barHeight);
                this.canvasContext.fillStyle = 'white';
                this.canvasContext.fillRect(x, height - discY - 1, barWidth - 1, discHeight);
                x += barWidth;
            }
            if (!canContinue) /*then*/
                this.reset.call(this);
            else
                window.requestAnimationFrame(this.draw.bind(this, id));
        }
        reset() {
            let width = this.getWidth(), height = this.getHeight(), numberOfBars = 128, barWidth = this.canvas.width / numberOfBars, barHeight = 0, discY = 0, discHeight = 5, x = 0, step = Math.floor(this.bufferLength / numberOfBars), canContinue = this.drawId == 0 || !this.enabled;
            this.clear(this.canvas.width, this.canvas.height);
            this.prepareCanvas();
            for (var i = 0; i < numberOfBars; i++) {
                barHeight = this.dataArray[i * step] * Math.floor(height / 255);
                discY = (this.previousDataArray[i * step] * Math.floor(height / 255)) + discHeight;
                if (this.dataArray[i * step] > 0) /*then*/
                    this.dataArray[i * step] -= 1;
                if (this.previousDataArray[i * step] > 0) /*then*/
                    this.previousDataArray[i * step] -= 1;
                if (barHeight > 0) {
                    this.canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
                    this.canvasContext.fillRect(x, height - barHeight, barWidth - 1, barHeight);
                }
                if (discY >= discHeight) {
                    this.canvasContext.fillStyle = 'white';
                    this.canvasContext.fillRect(x, height - discY - 1, barWidth - 1, discHeight);
                }
                x += barWidth;
            }
            if ((this.dataArray.find((value, index) => value > 0) ||
                this.previousDataArray.find((value, index) => value > 0)) &&
                canContinue) /*then*/
                window.requestAnimationFrame(this.reset.bind(this));
        }
        start() {
            const id = Date.now();
            this.drawId = id;
            if (this.enabled) /*then*/
                this.draw(id);
        }
        stop() {
            this.drawId = 0;
        }
        enable() {
            if (!this.initialized) /*then*/
                this.init();
            this.audioSourceNode.connect(this.analyser);
            this.enabled = true;
        }
        disable() {
            if (!this.isInitialized) /*then*/
                this.init();
            this.audioSourceNode.disconnect(this.analyser);
            this.enabled = false;
        }
    }
    exports.default = AudioVisualizer;
});
define("assets/utilities/element", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.closeFullscreen = exports.openFullscreen = void 0;
    /* https://www.w3schools.com/howto/howto_js_fullscreen.asp */
    function openFullscreen(element) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } //else if (element.mozRequestFullScreen) { /* Firefox */
        //    element.mozRequestFullScreen();
        //} else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        //    element.webkitRequestFullscreen();
        //} else if (element.msRequestFullscreen) { /* IE/Edge */
        //    element.msRequestFullscreen();
        //}
    }
    exports.openFullscreen = openFullscreen;
    /* https://www.w3schools.com/howto/howto_js_fullscreen.asp */
    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } //else if (document.mozCancelFullScreen) { /* Firefox */
        //    document.mozCancelFullScreen();
        //} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        //    document.webkitExitFullscreen();
        //} else if (document.msExitFullscreen) { /* IE/Edge */
        //    document.msExitFullscreen();
        //}
    }
    exports.closeFullscreen = closeFullscreen;
});
define("assets/interfaces/player-load-functions-interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("media-library/player/player", ["require", "exports", "assets/models/base-class", "assets/controls/html-controls", "assets/utilities/math", "media-library/audio-visualizer/audio-visualizer", "assets/utilities/element", "assets/utilities/bootstrap-helper", "assets/modals/loading-modal", "assets/enums/enum-functions", "assets/utilities/message-box"], function (require, exports, base_class_7, html_controls_8, math_1, audio_visualizer_1, element_1, bootstrap_helper_3, loading_modal_5, enum_functions_2, MessageBox) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Player extends base_class_7.default {
        constructor(playerConfiguration, loadFunctions, updateActiveMedia = () => null) {
            super();
            this.playerConfiguration = playerConfiguration;
            this.loadFunctions = loadFunctions;
            this.updateActiveMedia = updateActiveMedia;
            this.players = html_controls_8.default.Players();
            this.playerView = html_controls_8.default.Views().PlayerView;
            this.unPlayedShuffleIds = [];
            this.audioVisualizer = new audio_visualizer_1.default(this.playerConfiguration, this.players.MusicPlayer);
            this.initPlayer();
            this.currentlyLoadedId = 0;
        }
        loadView(callback = () => null) {
            this.audioVisualizer.prepareCanvas();
            this.updateScrollTop();
            callback();
        }
        initPlayer() {
            this.initMediaPlayers();
            this.initPlayerControls();
            bootstrap_helper_3.loadTooltips(this.playerView);
            this.reload(() => this.loadItem());
        }
        initMediaPlayers() {
            const buttons = html_controls_8.default.Buttons(), controls = html_controls_8.default.UIControls();
            $(this.getPlayers()).on('loadedmetadata', e => {
                const currentIndex = this.playerConfiguration.properties.CurrentItemIndex, player = e.currentTarget;
                if (this.playerConfiguration.properties.SelectedMediaType === 1 /* Podcast */ ||
                    this.playerConfiguration.properties.SelectedMediaType === 2 /* Television */) {
                    player.currentTime = parseInt($('[data-play-index="' + currentIndex + '"]').attr('data-current-time'));
                }
            });
            $(this.getPlayers()).on('ended', e => {
                if (!this.canPlayNext()) /*then*/
                    e.currentTarget.currentTime = 0;
                this.audioVisualizer.stop();
                this.updatePlayCount(e.currentTarget, () => this.loadNext());
                this.updatePlayerProgress(0);
            });
            $(this.getPlayers()).prop('volume', this.playerConfiguration.properties.Volume / 100.0);
            $(this.getPlayers()).on('durationchange', e => {
                const player = e.currentTarget;
                $(controls.PlayerSlider).slider('option', 'max', player.duration);
                $(controls.PlayerTime).text(this.getPlaybackTime(player.currentTime, player.duration));
            });
            $(this.getPlayers()).on('timeupdate', e => {
                const player = e.currentTarget, currentTime = Math.floor(player.currentTime);
                this.enableDisablePreviousNext();
                if ($(controls.PlayerSlider).attr('data-slide-started') !== 'true') {
                    $(controls.PlayerSlider).slider('value', currentTime);
                    $(controls.PlayerTime).text(this.getPlaybackTime(currentTime, player.duration));
                    if (currentTime > 0) /*then*/
                        this.updatePlayerProgress(currentTime);
                }
            });
            $(this.getPlayers()).on('play', e => {
                const mediaType = this.playerConfiguration.properties.SelectedMediaType;
                if (this.getPlayer().duration === Infinity) /*then*/
                    this.getPlayer().src = this.getPlayer().src;
                $(e.currentTarget).attr('data-playing', 'true');
                $([buttons.PlayerPlayButton, buttons.HeaderPlayButton]).addClass('d-none');
                $([buttons.PlayerPauseButton, buttons.HeaderPauseButton]).removeClass('d-none');
                if (mediaType !== 2 /* Television */) {
                    if (!this.audioVisualizer.isInitialized()) /*then*/
                        this.audioVisualizer.init();
                    this.audioVisualizer.start();
                }
            });
            $(this.getPlayers()).on('pause', e => {
                $([buttons.PlayerPauseButton, buttons.HeaderPauseButton]).addClass('d-none');
                $([buttons.PlayerPlayButton, buttons.HeaderPlayButton]).removeClass('d-none');
                this.audioVisualizer.stop();
            });
            $(this.getPlayers()).on('error', e => null);
        }
        initPlayerControls() {
            const $volumeSlider = $('<div id="volume-slider" class="m-1"></div>'), buttons = html_controls_8.default.Buttons(), containers = html_controls_8.default.Containers(), controls = html_controls_8.default.UIControls();
            $(controls.PlayerSlider).slider({ min: 0, max: 100 });
            $volumeSlider.slider({
                min: 0,
                max: 100,
                orientation: 'vertical',
                value: this.playerConfiguration.properties.Muted ? 0 : this.playerConfiguration.properties.Volume
            });
            $(containers.PlayerVolumeContainer).popover({
                trigger: 'hover',
                content: $volumeSlider[0],
                placement: 'top',
                html: true,
                container: containers.PlayerVolumeContainer
            });
            $volumeSlider.on('slide', (e, ui) => {
                const volume = ui.value;
                $([buttons.PlayerVolumeButton, buttons.PlayerMuteButton]).attr('data-volume', volume).addClass('d-none');
                $(volume === 0 ? buttons.PlayerMuteButton : buttons.PlayerVolumeButton).removeClass('d-none');
                this.playerConfiguration.properties.Volume = volume;
                this.playerConfiguration.properties.Muted = volume === 0;
                $(this.getPlayers()).prop('volume', volume / 100.0).prop('muted', volume === 0);
            });
            $volumeSlider.on('slidechange', (e, ui) => {
                this.playerConfiguration.updateConfiguration();
            });
            $(controls.PlayerSlider).on('slide', (e, ui) => {
                if ($(e.currentTarget).attr('data-slide-started') === 'true') {
                    $(this.getPlayer()).prop('currentTime', ui.value);
                    $(controls.PlayerTime).text(this.getPlaybackTime(ui.value, $(e.currentTarget).slider('option', 'max')));
                }
            });
            $(controls.PlayerSlider).on('slidestart', (e, ui) => $(e.currentTarget).attr('data-slide-started', 'true'));
            $(controls.PlayerSlider).on('slidestop', (e, ui) => $(e.currentTarget).attr('data-slide-started', 'false'));
            $([buttons.HeaderNextButton, buttons.PlayerNextButton]).on('click', () => this.loadNext());
            $([buttons.HeaderPreviousButton, buttons.PlayerPreviousButton]).on('click', () => this.loadPrevious());
            $([buttons.HeaderBackwardButton, buttons.PlayerBackwardButton]).on('click', () => this.skipBackward());
            $([buttons.HeaderForwardButton, buttons.PlayerForwardButton]).on('click', () => this.skipForward());
            $([buttons.HeaderPauseButton, buttons.PlayerPauseButton]).on('click', () => $(this.getPlayer()).attr('data-playing', 'false').trigger('pause'));
            $([buttons.HeaderPlayButton, buttons.PlayerPlayButton]).on('click', () => {
                if (this.getPlayer().currentSrc) /*then*/
                    $(this.getPlayer()).trigger('play');
            });
            $([buttons.HeaderShuffleButton, buttons.PlayerShuffleButton]).addClass(this.playerConfiguration.properties.Shuffle ? 'active' : '');
            $('button[data-repeat-type]').on('click', () => {
                let repeat = this.playerConfiguration.properties.Repeat;
                $('button[data-repeat-type]').addClass('d-none');
                if (repeat === 0 /* None */) {
                    repeat = 1 /* RepeatOne */;
                }
                else if (repeat === 1 /* RepeatOne */) {
                    repeat = 2 /* RepeatAll */;
                }
                else if (repeat === 2 /* RepeatAll */) {
                    repeat = 0 /* None */;
                }
                $('button[data-repeat-type="' + enum_functions_2.getRepeatTypesEnumString(repeat) + '"]').removeClass('d-none');
                this.playerConfiguration.properties.Repeat = repeat;
                this.playerConfiguration.updateConfiguration(() => this.enableDisablePreviousNext());
            });
            $([buttons.HeaderShuffleButton, buttons.PlayerShuffleButton]).on('click', () => {
                const shuffle = this.playerConfiguration.properties.Shuffle, $btns = $([buttons.HeaderShuffleButton, buttons.PlayerShuffleButton]);
                this.setUnPlayedShuffleIds(!shuffle);
                this.playerConfiguration.properties.Shuffle = !shuffle;
                this.playerConfiguration.updateConfiguration(() => {
                    if (!shuffle) {
                        $btns.addClass('active');
                    }
                    else {
                        $btns.removeClass('active');
                    }
                    this.enableDisablePreviousNext();
                });
            });
            $([buttons.PlayerMuteButton, buttons.PlayerVolumeButton]).on('click', e => {
                const previousVolume = parseInt($(buttons.PlayerVolumeButton).attr('data-volume')), $btn = $(e.currentTarget);
                let muted = false;
                $([buttons.PlayerMuteButton, buttons.PlayerVolumeButton]).addClass('d-none');
                if ($btn.attr('id') === buttons.PlayerVolumeButton.id) {
                    $(buttons.PlayerMuteButton).removeClass('d-none');
                    $volumeSlider.slider('value', 0);
                    muted = true;
                }
                else if ($btn.attr('id') === buttons.PlayerMuteButton.id) {
                    $(buttons.PlayerVolumeButton).removeClass('d-none');
                    $volumeSlider.slider('value', previousVolume);
                }
                this.playerConfiguration.properties.Muted = muted;
                this.playerConfiguration.updateConfiguration(() => $(this.getPlayers()).each((index, element) => { element.muted = muted; }));
            });
            $(buttons.PlayerFullscreenButton).on('click', () => element_1.openFullscreen(this.getPlayer()));
            $('button[data-repeat-type="' + enum_functions_2.getRepeatTypesEnumString(this.playerConfiguration.properties.Repeat) + '"]').removeClass('d-none');
            $(buttons.PlayerPlaylistToggleButton).on('click', e => {
                const $player = $(this.getPlayer()), $playerItems = $(containers.PlayerItemsContainer), $btn = $(e.currentTarget);
                let page = this.playerConfiguration.properties.SelectedPlayerPage;
                $(buttons.PlayerFullscreenButton).addClass('d-none');
                if (page === 0 /* Index */) {
                    this.playerConfiguration.properties.SelectedPlayerPage = enum_functions_2.getPlayerPageEnum($player.attr('data-player-page'));
                    $player.parent().removeClass('d-none');
                    $playerItems.addClass('d-none');
                    $btn.removeClass('active');
                    page = this.playerConfiguration.properties.SelectedPlayerPage;
                    if (page === 2 /* Video */) /*then*/
                        $(buttons.PlayerFullscreenButton).removeClass('d-none');
                    else if (page === 1 /* Audio */) /*then*/
                        this.audioVisualizer.prepareCanvas();
                }
                else {
                    this.playerConfiguration.properties.SelectedPlayerPage = 0 /* Index */;
                    $player.parent().addClass('d-none');
                    $playerItems.removeClass('d-none');
                    $btn.addClass('active');
                }
                this.playerConfiguration.updateConfiguration();
            });
            $(buttons.PlayerAudioVisualizerButton).on('click', e => {
                const button = e.currentTarget;
                if (!this.audioVisualizer.isInitialized()) /*then*/
                    this.audioVisualizer.init();
                if ($(button).hasClass('active')) {
                    this.playerConfiguration.properties.AudioVisualizerEnabled = false;
                    this.playerConfiguration.updateConfiguration(() => {
                        $(button).removeClass('active');
                        this.audioVisualizer.disable();
                    });
                }
                else {
                    this.playerConfiguration.properties.AudioVisualizerEnabled = true;
                    this.playerConfiguration.updateConfiguration(() => {
                        $(button).addClass('active');
                        this.audioVisualizer.enable();
                        if (this.isPlaying()) /*then*/
                            this.audioVisualizer.start();
                    });
                }
            });
            $(buttons.PlayerClearButton).on('click', e => {
                const title = 'Clear now playing', message = 'Are you sure you want to clear now playing?';
                MessageBox.confirm(title, message, true, () => {
                    $.post('Player/ClearNowPlaying', null, () => this.reload(() => this.loadItem()));
                });
            });
        }
        loadItem(item = null, triggerPlay = false) {
            const $player = $(this.getPlayer()), shuffleEnabled = this.playerConfiguration.properties.Shuffle, fields = html_controls_8.default.UIFields();
            $(this.getPlayers()).prop('src', '').attr('data-item-id', '');
            if (item) {
                const $item = $(item), url = $item.attr('data-play-url'), index = parseInt($item.attr('data-play-index')), id = $item.attr('data-item-id'), title = $item.attr('data-title') || '';
                $('li[data-play-index].list-group-item').removeClass('active');
                this.playerConfiguration.properties.CurrentItemIndex = index;
                this.playerConfiguration.updateConfiguration(() => {
                    $item.addClass('active');
                    $player.attr('data-item-id', id);
                    this.currentlyLoadedId = parseInt(id);
                    $(fields.NowPlayingTitle).text(title.length > 0 ? ': ' + title : title);
                    if (shuffleEnabled && $.inArray(index, this.unPlayedShuffleIds) >= 0) /*then*/
                        this.unPlayedShuffleIds.splice(this.unPlayedShuffleIds.indexOf(index), 1);
                    this.updateScrollTop();
                    $player.prop('src', url);
                    this.updateActiveMedia();
                    this.audioVisualizer.stop();
                    if (triggerPlay) {
                        if (this.playerConfiguration.properties.SelectedMediaType === 2 /* Television */ &&
                            this.playerConfiguration.properties.SelectedPlayerPage === 0 /* Index */) {
                            $(html_controls_8.default.Buttons().PlayerPlaylistToggleButton).trigger('click');
                        }
                        $player.trigger('play');
                    }
                    this.enableDisablePreviousNext();
                });
            }
            else if ($('li[data-play-index].active').length === 1) {
                this.loadItem($('li[data-play-index].active')[0], triggerPlay);
            }
        }
        loadNext() {
            const shuffle = this.playerConfiguration.properties.Shuffle, nextIndex = shuffle ? this.unPlayedShuffleIds[math_1.getRandomInteger(0, this.unPlayedShuffleIds.length - 1)] :
                this.playerConfiguration.properties.CurrentItemIndex + 1, repeat = this.playerConfiguration.properties.Repeat, shuffleEmpty = this.unPlayedShuffleIds.length == 0;
            let $item = null;
            if (repeat === 1 /* RepeatOne */) {
                $(this.getPlayer()).prop('currentTime', 0);
                if (this.isPlaying()) /*then*/
                    this.getPlayer().play();
            }
            else if (repeat === 2 /* RepeatAll */) {
                if (shuffle && shuffleEmpty) {
                    this.setUnPlayedShuffleIds(shuffle);
                    this.loadNext();
                }
                else if (nextIndex === $('li[data-play-index]').length) {
                    $item = $('li[data-play-index="0"]');
                    this.loadItem($item[0], this.isPlaying());
                }
                else {
                    $item = $('li[data-play-index="' + nextIndex + '"]');
                    this.loadItem($item[0], this.isPlaying());
                }
            }
            else {
                $item = $('li[data-play-index=' + nextIndex + ']');
                if ((shuffle && !shuffleEmpty) || (!shuffle && nextIndex < $('li[data-play-index]').length)) {
                    this.loadItem($item[0], this.isPlaying());
                }
                else {
                    $(html_controls_8.default.Buttons().PlayerPauseButton).trigger('click');
                    this.enableDisablePreviousNext();
                }
            }
        }
        loadPrevious() {
            const shuffle = this.playerConfiguration.properties.Shuffle, previousIndex = shuffle ? this.unPlayedShuffleIds[math_1.getRandomInteger(0, this.unPlayedShuffleIds.length - 1)] :
                this.playerConfiguration.properties.CurrentItemIndex - 1, $item = $('li[data-play-index="' + previousIndex + '"]'), player = this.getPlayer(), shuffleEmpty = this.unPlayedShuffleIds.length === 0, repeat = this.playerConfiguration.properties.Repeat;
            if (repeat === 1 /* RepeatOne */ || player.currentTime > 5) {
                player.currentTime = 0;
            }
            else if (shuffle && shuffleEmpty) {
                this.setUnPlayedShuffleIds(shuffle);
                this.loadPrevious();
            }
            else
                this.loadItem($item[0], this.isPlaying());
        }
        canPlayNext() {
            return (this.playerConfiguration.properties.Shuffle && this.unPlayedShuffleIds.length > 0) ||
                this.playerConfiguration.properties.Repeat !== 0 /* None */ ||
                this.playerConfiguration.properties.CurrentItemIndex < ($('li[data-play-index]').length - 1);
        }
        canPlayPrevious() {
            return this.playerConfiguration.properties.Shuffle ||
                this.playerConfiguration.properties.CurrentItemIndex > 0 ||
                this.getPlayer().currentTime > 5 ||
                this.playerConfiguration.properties.Repeat === 2 /* RepeatAll */;
        }
        isPlaying() {
            return $(this.getPlayer()).attr('data-playing') === 'true';
        }
        getPlayer() {
            return this.playerConfiguration.properties.SelectedMediaType === 2 /* Television */ ?
                this.players.VideoPlayer :
                this.players.MusicPlayer;
        }
        getPlayers() { return [this.players.MusicPlayer, this.players.VideoPlayer]; }
        updateScrollTop() {
            const $item = $('li[data-play-index].active');
            if ($item.length > 0) {
                const container = html_controls_8.default.Containers().PlayerItemsContainer;
                $(container).scrollTop($(container).scrollTop() - $item.position().top * -1);
            }
        }
        getPlaybackTime(time, duration) {
            return this.getFormattedTime(time).concat('/').concat(this.getFormattedTime(duration));
        }
        getFormattedTime(time) {
            const adjustedTime = Number.isNaN(time) || !Number.isFinite(time) ? 0 : time, currentHours = Math.floor(adjustedTime / 3600), currentMinutes = Math.floor((adjustedTime - (currentHours * 3600)) / 60), currentSeconds = Math.floor((adjustedTime - (currentMinutes * 60 + currentHours * 3600)) % 60), currentTime = (currentHours > 0 ? currentHours.toString().padStart(2, '0').concat(':') : '')
                .concat(currentMinutes.toString().padStart(2, '0').concat(':'))
                .concat(currentSeconds.toString().padStart(2, '0'));
            return currentTime;
        }
        setUnPlayedShuffleIds(shuffle) {
            const $items = $('li[data-play-index]');
            this.unPlayedShuffleIds = shuffle && $items.length > 0 ? $.makeArray($items.map((index, element) => parseInt($(element).attr('data-play-index')))) : [];
        }
        enableDisablePreviousNext() {
            const buttons = html_controls_8.default.Buttons(), nextButtons = [buttons.HeaderNextButton, buttons.PlayerNextButton], previousButtons = [buttons.HeaderPreviousButton, buttons.PlayerPreviousButton];
            $(nextButtons).prop('disabled', !this.canPlayNext());
            $(previousButtons).prop('disabled', !this.canPlayPrevious());
        }
        updatePlayCount(player, callback = () => null) {
            const id = $(player).attr('data-item-id');
            $.post('Player/UpdatePlayCount', { mediaType: this.playerConfiguration.properties.SelectedMediaType, id: id }, callback);
        }
        reload(callback = () => null) {
            const containers = html_controls_8.default.Containers(), success = () => {
                bootstrap_helper_3.loadTooltips(containers.PlayerItemsContainer);
                this.applyLoadFunctions();
                this.updateSelectedPlayerPage();
                $(containers.PlayerItemsContainer).find('[data-item-index]').on('click', e => {
                    const index = parseInt($(e.currentTarget).attr('data-item-index')), item = $(containers.PlayerItemsContainer).find('li[data-play-index="' + index + '"]')[0];
                    this.loadItem(item, true);
                });
                if (typeof callback === 'function') /*then*/
                    callback();
            };
            bootstrap_helper_3.disposeTooltips(containers.PlayerItemsContainer);
            $(html_controls_8.default.UIFields().NowPlayingTitle).text('');
            $(containers.PlayerItemsContainer).html('');
            $(containers.PlayerItemsContainer).load('Player/GetPlayerItems', success);
        }
        applyLoadFunctions() {
            $(this.playerView).find('*[data-artist-id]').on('click', e => this.loadFunctions.loadArtist(parseInt($(e.currentTarget).attr('data-artist-id'))));
            $(this.playerView).find('*[data-album-id]').on('click', e => this.loadFunctions.loadAlbum(parseInt($(e.currentTarget).attr('data-album-id'))));
            $(this.playerView).find('*[data-podcast-id]').on('click', e => this.loadFunctions.loadPodcast(parseInt($(e.currentTarget).attr('data-podcast-id'))));
            $(this.playerView).find('*[data-series-id]').on('click', e => this.loadFunctions.loadSeries(parseInt($(e.currentTarget).attr('data-series-id'))));
        }
        updateSelectedPlayerPage() {
            const buttons = html_controls_8.default.Buttons(), selectedMediaType = this.playerConfiguration.properties.SelectedMediaType;
            let selectedPlayerPage = this.playerConfiguration.properties.SelectedPlayerPage;
            if (selectedMediaType === 2 /* Television */ && selectedPlayerPage === 1 /* Audio */) {
                this.playerConfiguration.properties.SelectedPlayerPage = 2 /* Video */;
            }
            else if (selectedMediaType !== 2 /* Television */ && selectedPlayerPage === 2 /* Video */) {
                this.playerConfiguration.properties.SelectedPlayerPage = 1 /* Audio */;
            }
            if (selectedPlayerPage !== this.playerConfiguration.properties.SelectedPlayerPage) {
                selectedPlayerPage = this.playerConfiguration.properties.SelectedPlayerPage;
                $(buttons.PlayerFullscreenButton).addClass('d-none');
                this.playerConfiguration.updateConfiguration(() => $(this.getPlayers()).each((index, element) => {
                    const page = $(element).attr('data-player-page');
                    if (enum_functions_2.getPlayerPageEnum(page) === selectedPlayerPage) /*then*/
                        $(element).parent().removeClass('d-none');
                    else
                        $(element).parent().addClass('d-none');
                }));
                if (selectedPlayerPage === 2 /* Video */) /*then*/
                    $(buttons.PlayerFullscreenButton).removeClass('d-none');
            }
        }
        play(btn, playSingleItem = false, loadPlayer = () => null) {
            const $playButtons = $('button[data-play-id]'), $playGroups = $('div[data-play-ids]'), success = () => this.reload(() => {
                this.loadItem(null, true);
                if (this.playerConfiguration.properties.SelectedMediaType === 2 /* Television */) /*then*/
                    loadPlayer();
                loading_modal_5.default.hideLoading();
            }), mediaType = $(btn).attr('data-media-type') || enum_functions_2.getMediaTypesEnumString(0 /* Song */), data = new FormData();
            let $playData = null;
            loading_modal_5.default.showLoading();
            if (playSingleItem) {
                $playData = $([{ Id: 0, Value: parseInt($(btn).attr('data-play-id')), IsSelected: true }]);
            }
            else if ($playGroups.length > 0) {
                $playData = $playGroups.map((index, element) => ($(element).attr('data-play-ids').split(',')))
                    .map((index, element) => ({
                    Id: index,
                    Value: parseInt(element),
                    IsSelected: $(btn).attr('data-play-id') === element
                }));
            }
            else {
                $playData = $playButtons.map((index, _btn) => ({
                    Id: index,
                    Value: parseInt($(_btn).attr('data-play-id')),
                    IsSelected: btn.isSameNode(_btn)
                }));
            }
            data.append('mediaType', mediaType);
            data.append('itemsJSON', JSON.stringify($playData.get()));
            this.playerConfiguration.properties.SelectedMediaType = enum_functions_2.getMediaTypesEnum(mediaType);
            this.playerConfiguration.updateConfiguration(function () {
                $.ajax({
                    type: 'POST',
                    url: 'Player/UpdateNowPlaying',
                    data: data,
                    contentType: false,
                    success: success,
                    processData: false,
                    traditional: true
                });
            });
        }
        getCurrentlyLoadedId() {
            return this.currentlyLoadedId;
        }
        updatePlayerProgress(progress) {
            const id = parseInt($('[data-play-index="' + this.playerConfiguration.properties.CurrentItemIndex + '"]').attr('data-item-id')), mediaType = this.playerConfiguration.properties.SelectedMediaType, data = {
                id: id, mediaType: mediaType, progress: progress
            }, currentIndex = this.playerConfiguration.properties.CurrentItemIndex;
            if ($('[data-play-index="' + currentIndex + '"]').attr('data-current-time') !== progress.toString() &&
                progress % 5 === 0) {
                $('[data-play-index="' + currentIndex + '"]').attr('data-current-time', progress);
                $.post('Player/UpdatePlayerProgress', data);
            }
        }
        skipForward() {
            const player = this.getPlayer(), currentTime = player.currentTime, updatedTime = currentTime + this.playerConfiguration.properties.SkipForwardSeconds;
            if (updatedTime <= (player.duration - 1)) /*then*/
                player.currentTime = updatedTime;
        }
        skipBackward() {
            const player = this.getPlayer(), currentTime = player.currentTime, updatedTime = currentTime - this.playerConfiguration.properties.SkipForwardSeconds;
            if (updatedTime < 0) /*then*/
                player.currentTime = 0;
            else /*then*/
                player.currentTime = updatedTime;
        }
    }
    exports.default = Player;
});
define("assets/interfaces/playlist-configuration-interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("assets/models/configurations/playlist-configuration", ["require", "exports", "assets/models/configurations/base-configuration"], function (require, exports, base_configuration_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PlaylistConfiguration extends base_configuration_4.default {
        constructor(properties) {
            super('Playlist');
            this.properties = properties;
        }
        updateConfiguration(callback = () => null) {
            super.update(this.properties, callback);
        }
    }
    exports.default = PlaylistConfiguration;
});
define("assets/modals/add-playlist-modal", ["require", "exports", "assets/controls/html-controls", "assets/modals/loading-modal"], function (require, exports, html_controls_9, loading_modal_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AddNewPlaylistModal {
        constructor(loadFunc = () => null) {
            this.loadFunc = loadFunc;
            this.modal = html_controls_9.default.Modals().NewPlaylistModal;
            this.initializeControls();
        }
        initializeControls() {
            $(this.modal).on('show.bs.modal', function (e) {
                $('#txtNewPlaylist').val('');
            });
            $(this.modal).find('*[data-playlist-action="save"]').on('click', e => {
                const data = {
                    playlistName: $('#txtNewPlaylist').val(),
                    playlistType: $('#ddlPlaylistType').val()
                };
                loading_modal_6.default.showLoading();
                $(this.modal).modal('hide').on('hidden.bs.modal', () => {
                    $.post('Playlist/AddPlaylist', data, () => this.loadFunc(() => loading_modal_6.default.hideLoading()));
                });
            });
        }
    }
    exports.default = AddNewPlaylistModal;
});
define("assets/modals/edit-playlist-modal", ["require", "exports", "assets/controls/html-controls", "assets/modals/loading-modal"], function (require, exports, html_controls_10, loading_modal_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EditPlaylistModal {
        constructor(loadFunc = () => null) {
            this.loadFunc = loadFunc;
            this.modal = html_controls_10.default.Modals().EdiPlaylistModal;
            this.initializeControls();
        }
        initializeControls() {
            $(this.modal).on('show.bs.modal', function (e) {
                $('#txtPlaylistId').val($(e.relatedTarget).attr('data-item-id'));
                $('#txtPlaylistName').val($(e.relatedTarget).attr('data-item-name'));
            });
            $('[data-playlist-action="edit"]').on('click', e => {
                var data = { id: $('#txtPlaylistId').val(), name: $('#txtPlaylistName').val() };
                $(this.modal).modal('hide').on('hidden.bs.modal', () => {
                    loading_modal_7.default.showLoading();
                    $('#txtPlaylistId, #txtPlaylistName').val('');
                    $.post('Playlist/EditPlaylist', data, () => this.loadFunc(() => loading_modal_7.default.hideLoading()));
                });
            });
        }
    }
    exports.default = EditPlaylistModal;
});
define("assets/modals/download-m3u-playlist-modal", ["require", "exports", "assets/controls/html-controls"], function (require, exports, html_controls_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DownloadM3UPlaylistModal {
        constructor() {
            this.modal = html_controls_11.default.Modals().DownloadM3UPlaylistModal;
            this.initializeControls();
        }
        initializeControls() {
            $(this.modal).on('show.bs.modal', e => {
                const $btn = $(e.relatedTarget), url = $btn.attr('data-href'), name = $btn.attr('data-playlist-name'), randomUrl = $btn.attr('data-random-href'), $yesBtn = $(this.modal).find('[data-answer="yes"]'), $noBtn = $(this.modal).find('[data-answer="no"]');
                $('#modalM3UPlaylistTitle').text(name);
                $yesBtn.attr('data-href', randomUrl);
                $noBtn.attr('data-href', url);
            });
            $(this.modal).on('hidden.bs.modal', e => {
                const $yesBtn = $(this.modal).find('[data-answer="yes"]'), $noBtn = $(this.modal).find('[data-answer="no"]');
                $('#modalM3UPlaylistTitle').text('');
                $yesBtn.attr('data-href', '');
                $noBtn.attr('data-href', '');
            });
            $(this.modal).find('[data-answer]').on('click', e => {
                window.location.href = $(e.currentTarget).attr('data-href');
                $(this.modal).modal('hide');
            });
        }
    }
    exports.default = DownloadM3UPlaylistModal;
});
define("media-library/playlist/playlist", ["require", "exports", "assets/models/base-class", "assets/controls/html-controls", "assets/modals/add-playlist-modal", "assets/modals/loading-modal", "assets/modals/edit-playlist-modal", "assets/utilities/bootstrap-helper", "assets/enums/enum-functions", "assets/modals/download-m3u-playlist-modal", "assets/utilities/message-box"], function (require, exports, base_class_8, html_controls_12, add_playlist_modal_1, loading_modal_8, edit_playlist_modal_1, bootstrap_helper_4, enum_functions_3, download_m3u_playlist_modal_1, MessageBox) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Playlist extends base_class_8.default {
        constructor(playlistConfiguration, playFunc, updateActiveMediaFunc, loadFunctions) {
            super();
            this.playlistConfiguration = playlistConfiguration;
            this.playFunc = playFunc;
            this.updateActiveMediaFunc = updateActiveMediaFunc;
            this.loadFunctions = loadFunctions;
            this.playlistView = html_controls_12.default.Views().MediaView;
            this.mediaView = html_controls_12.default.Views().MediaView;
        }
        loadView(callback = () => null) {
            const success = () => {
                this.addPlaylistModal = new add_playlist_modal_1.default(this.loadView.bind(this));
                this.editPlaylistModal = new edit_playlist_modal_1.default(this.loadView.bind(this));
                this.downloadM3UPlaylistModal = new download_m3u_playlist_modal_1.default();
                this.initializeControls();
                this.updateActiveMediaFunc();
                this.applyLoadFunctions();
                $('[data-playlist-tab="' + enum_functions_3.getPlaylistTabEnumString(this.playlistConfiguration.properties.SelectedPlaylistTab) + '"]').tab('show');
                callback();
            };
            bootstrap_helper_4.disposeTooltips(this.mediaView);
            $(this.mediaView).load('Playlist/Index', success);
        }
        initializeControls() {
            bootstrap_helper_4.loadTooltips(this.mediaView);
            $(this.mediaView).find('*[data-back-button="playlist"]').on('click', () => this.goBack(() => this.loadView.call(this)));
            $(this.mediaView).find('*[data-play-id]').on('click', e => this.playFunc(e.currentTarget));
            $(this.mediaView).find('*[data-playlist-action="sort"]').on('change', e => {
                const $target = $(e.currentTarget), sortType = $target.attr('data-sort-type');
                loading_modal_8.default.showLoading();
                if (sortType === 'SelectedMusicPlaylistSort') {
                    this.playlistConfiguration.properties.SelectedMusicPlaylistSort = enum_functions_3.getPlaylistSortEnum($target.val());
                }
                else if (sortType === 'SelectedPodcastPlaylistSort') {
                    this.playlistConfiguration.properties.SelectedPodcastPlaylistSort = enum_functions_3.getPlaylistSortEnum($target.val());
                }
                else if (sortType === 'SelectedTelevisionPlaylistSort') {
                    this.playlistConfiguration.properties.SelectedTelevisionPlaylistSort = enum_functions_3.getPlaylistSortEnum($target.val());
                }
                this.playlistConfiguration.updateConfiguration(() => this.loadView(() => loading_modal_8.default.hideLoading()));
            });
            $(this.mediaView).find('*[data-playlist-id]').on('click', e => {
                loading_modal_8.default.showLoading();
                this.playlistConfiguration.properties.SelectedPlaylistId = parseInt($(e.currentTarget).attr('data-playlist-id'));
                this.playlistConfiguration.properties.SelectedPlaylistPage = 1 /* Playlist */;
                this.playlistConfiguration.updateConfiguration(() => this.loadView(() => loading_modal_8.default.hideLoading()));
            });
            $(this.mediaView).find('*[data-playlist-action="delete"]').on('click', e => {
                const $btn = $(e.currentTarget), id = $btn.attr('data-item-id'), title = 'Delete playlist', message = 'Are you sure you want to delete this playlist?';
                MessageBox.confirm(title, message, true, () => {
                    loading_modal_8.default.showLoading();
                    $.post('Playlist/RemovePlaylist', { id: id }, () => this.loadView(() => loading_modal_8.default.hideLoading()));
                });
            });
            $(html_controls_12.default.UIControls().PlaylistTabList).find('*[data-toggle="tab"]').on('shown.bs.tab', e => {
                const $newTab = $(e.target), $oldTab = $(e.relatedTarget);
                this.playlistConfiguration.properties.SelectedPlaylistTab = enum_functions_3.getPlaylistTabEnum($newTab.attr('data-playlist-tab'));
                this.playlistConfiguration.updateConfiguration();
                $(html_controls_12.default.UIControls().PlaylistTabList).find('*[data-sort-tab]').each((index, _btn) => {
                    if ($(_btn).attr('data-sort-tab') === $newTab.attr('id')) {
                        $(_btn).addClass('d-inline-block').removeClass('d-none');
                    }
                    else {
                        $(_btn).removeClass('d-inline-block').addClass('d-none');
                    }
                });
            });
        }
        goBack(callback = () => null) {
            this.playlistConfiguration.properties.SelectedPlaylistId = 0;
            this.playlistConfiguration.properties.SelectedPlaylistPage = 0 /* Index */;
            this.playlistConfiguration.updateConfiguration(callback);
        }
        applyLoadFunctions() {
            $(this.playlistView).find('*[data-artist-id]').on('click', e => this.loadFunctions.loadArtist(parseInt($(e.currentTarget).attr('data-artist-id'))));
            $(this.playlistView).find('*[data-album-id]').on('click', e => this.loadFunctions.loadAlbum(parseInt($(e.currentTarget).attr('data-album-id'))));
            $(this.playlistView).find('*[data-podcast-id]').on('click', e => this.loadFunctions.loadPodcast(parseInt($(e.currentTarget).attr('data-podcast-id'))));
            $(this.playlistView).find('*[data-series-id]').on('click', e => this.loadFunctions.loadSeries(parseInt($(e.currentTarget).attr('data-series-id'))));
        }
    }
    exports.default = Playlist;
});
define("assets/interfaces/television-configuration-interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("assets/models/configurations/television-configuration", ["require", "exports", "assets/models/configurations/base-configuration"], function (require, exports, base_configuration_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TelevisionConfiguration extends base_configuration_5.default {
        constructor(properties) {
            super('Television');
            this.properties = properties;
        }
        updateConfiguration(callback = () => null) {
            super.update(this.properties, callback);
        }
    }
    exports.default = TelevisionConfiguration;
});
define("media-library/television/television", ["require", "exports", "assets/models/base-class", "assets/controls/html-controls", "assets/modals/loading-modal", "assets/utilities/bootstrap-helper", "assets/enums/enum-functions"], function (require, exports, base_class_9, html_controls_13, loading_modal_9, bootstrap_helper_5, enum_functions_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Television extends base_class_9.default {
        constructor(televisionConfiguration, playFunc, updateActiveMediaFunc) {
            super();
            this.televisionConfiguration = televisionConfiguration;
            this.playFunc = playFunc;
            this.updateActiveMediaFunc = updateActiveMediaFunc;
            this.mediaView = html_controls_13.default.Views().MediaView;
        }
        loadView(callback = () => null) {
            const properties = this.televisionConfiguration.properties, success = () => {
                this.seasonView = html_controls_13.default.Views().SeasonView;
                this.initializeControls();
                $('[data-season-id][data-item-index="0"]').trigger('click');
                callback();
            };
            bootstrap_helper_5.disposeTooltips(this.mediaView);
            $(this.mediaView).load('Television/Index', success);
        }
        initializeControls() {
            bootstrap_helper_5.loadTooltips(this.mediaView);
            $('[data-back-button="television"]').on('click', () => this.goBack(() => this.loadView.call(this)));
            $(this.mediaView).find('*[data-series-action="sort"]').on('change', e => {
                loading_modal_9.default.showLoading();
                this.televisionConfiguration.properties.SelectedSeriesSort = enum_functions_4.getSeriesSortEnum($(e.currentTarget).val());
                this.televisionConfiguration.updateConfiguration(() => this.loadView(() => loading_modal_9.default.hideLoading()));
            });
            $(this.mediaView).find('*[data-series-id]').on('click', e => {
                loading_modal_9.default.showLoading();
                this.televisionConfiguration.properties.SelectedSeriesId = parseInt($(e.currentTarget).attr('data-series-id'));
                this.televisionConfiguration.properties.SelectedTelevisionPage = 1 /* Series */;
                this.televisionConfiguration.updateConfiguration(() => this.loadView(() => loading_modal_9.default.hideLoading()));
            });
            $(this.mediaView).find('*[data-series-action="playlist"]').on('click', e => {
                const season = this.televisionConfiguration.properties.SelectedSeason, series = this.televisionConfiguration.properties.SelectedSeriesId;
                window.location.href = 'Television/GetM3UPlaylist?seriesId=' + series + '&season=' + season;
            });
            $(this.mediaView).find('*[data-season-id]').on('click', e => {
                const item = e.currentTarget, success = () => {
                    $(item).parent('li.page-item:first').addClass('active');
                    this.updateMobileSeasons(parseInt(id));
                    bootstrap_helper_5.loadTooltips(this.seasonView);
                    $(this.seasonView).find('*[data-play-id]').on('click', e => this.playFunc(e.currentTarget));
                    this.updateActiveMediaFunc();
                    loading_modal_9.default.hideLoading();
                }, series = this.televisionConfiguration.properties.SelectedSeriesId, id = $(item).attr('data-season-id'), selectedSeason = this.televisionConfiguration.properties.SelectedSeason;
                if (id === '-' && (selectedSeason - 1) > 0) {
                    $(this.mediaView).find('[data-season-id="' + (selectedSeason - 1) + '"]').trigger('click');
                }
                else if (id === '+' && (selectedSeason + 1) > 0) {
                    $(this.mediaView).find('[data-season-id="' + (selectedSeason + 1) + '"]').trigger('click');
                }
                else if (parseInt(id) > 0) {
                    $(this.mediaView).find('li.page-item').removeClass('active');
                    loading_modal_9.default.showLoading();
                    this.televisionConfiguration.properties.SelectedSeason = parseInt(id);
                    bootstrap_helper_5.disposeTooltips(this.seasonView);
                    $(this.seasonView).load('Television/GetSeason', { series: series, season: parseInt(id) }, success);
                }
            });
        }
        loadSeries(id, callback = () => null) {
            if (Number.isInteger(id)) {
                this.televisionConfiguration.properties.SelectedTelevisionPage = 1 /* Series */;
                this.televisionConfiguration.properties.SelectedSeriesId = id;
                this.televisionConfiguration.updateConfiguration(callback);
            }
        }
        updateMobileSeasons(season) {
            const minSeasonCount = 5, numItemsBefore = Math.ceil(minSeasonCount / 2) - 1, numItemsAfter = minSeasonCount - numItemsBefore - 1, cssSelector = '[data-season-id]:not([data-season-id="+"]):not([data-season-id="-"]', numSeasons = $(cssSelector).length;
            let first = season - numItemsBefore, last = season + numItemsAfter;
            $(cssSelector).addClass('d-none d-lg-block');
            if (first < 1) {
                first = 1;
                last = minSeasonCount;
            }
            else if (last > numSeasons) {
                first = first - (last - numSeasons);
                last = numSeasons;
            }
            for (let i = first; i <= last; i++) {
                $(this.mediaView).find('*[data-season-id="' + i + '"]').removeClass('d-none d-lg-block');
            }
        }
        goBack(callback = () => null) {
            this.televisionConfiguration.properties.SelectedSeriesId = 0;
            this.televisionConfiguration.properties.SelectedTelevisionPage = 0 /* Index */;
            this.televisionConfiguration.updateConfiguration(callback);
        }
    }
    exports.default = Television;
});
define("assets/interfaces/podcast-configuration-interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("assets/models/configurations/podcast-configuration", ["require", "exports", "assets/models/configurations/base-configuration"], function (require, exports, base_configuration_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PodcastConfiguration extends base_configuration_6.default {
        constructor(properties) {
            super('Podcast');
            this.properties = properties;
        }
        updateConfiguration(callback = () => null) {
            super.update(this.properties, callback);
        }
    }
    exports.default = PodcastConfiguration;
});
define("assets/modals/add-podcast-modal", ["require", "exports", "assets/controls/html-controls", "assets/modals/loading-modal"], function (require, exports, html_controls_14, loading_modal_10) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AddNewPodcastModal {
        constructor(loadFunc = () => null) {
            this.loadFunc = loadFunc;
            this.modal = html_controls_14.default.Modals().NewPodcastModal;
            this.initializeControls();
        }
        initializeControls() {
            $(this.modal).on('show.bs.modal', e => {
                $('#txtNewPodcast').val('');
            });
            $(this.modal).find('*[data-podcast-action="save"]').on('click', e => {
                loading_modal_10.default.showLoading();
                $(this.modal).modal('hide').on('hidden.bs.modal', () => {
                    $.post('Podcast/AddPodcast', { rssFeed: $('#txtNewPodcast').val() }, () => {
                        this.loadFunc(() => loading_modal_10.default.hideLoading());
                    });
                });
            });
        }
    }
    exports.default = AddNewPodcastModal;
});
define("media-library/podcast/podcast", ["require", "exports", "assets/models/base-class", "assets/controls/html-controls", "assets/modals/add-podcast-modal", "assets/modals/loading-modal", "assets/utilities/bootstrap-helper", "assets/enums/enum-functions", "assets/utilities/message-box"], function (require, exports, base_class_10, html_controls_15, add_podcast_modal_1, loading_modal_11, bootstrap_helper_6, enum_functions_5, MessageBox) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Podcast extends base_class_10.default {
        constructor(podcastConfiguration, playFunc, updateActiveMediaFunc) {
            super();
            this.podcastConfiguration = podcastConfiguration;
            this.playFunc = playFunc;
            this.updateActiveMediaFunc = updateActiveMediaFunc;
            this.mediaView = html_controls_15.default.Views().MediaView;
        }
        loadView(callback = () => null) {
            const properties = this.podcastConfiguration.properties, success = () => {
                this.podcastView = html_controls_15.default.Views().PodcastView;
                this.addNewPodcastModal = new add_podcast_modal_1.default(this.loadView.bind(this));
                this.initializeControls();
                $('[data-podcast-year][data-item-index="1"]').trigger('click');
                callback();
            };
            bootstrap_helper_6.disposeTooltips(this.mediaView);
            this.podcastConfiguration.refresh(() => $(this.mediaView).load('Podcast/Index', success));
        }
        initializeControls() {
            bootstrap_helper_6.loadTooltips(this.mediaView);
            $('[data-back-button="podcast"]').on('click', () => {
                loading_modal_11.default.showLoading();
                this.podcastConfiguration.properties.SelectedPodcastId = 0;
                this.podcastConfiguration.properties.SelectedPodcastPage = 0 /* Index */;
                this.podcastConfiguration.updateConfiguration(() => this.loadView(() => loading_modal_11.default.hideLoading()));
            });
            $(this.mediaView).find('[data-podcast-action="sort"]').on('change', e => {
                loading_modal_11.default.showLoading();
                this.podcastConfiguration.properties.SelectedPodcastSort = enum_functions_5.getPodcastSortEnum($(e.currentTarget).val());
                this.podcastConfiguration.updateConfiguration(() => this.loadView(() => loading_modal_11.default.hideLoading()));
            });
            $(this.mediaView).find('*[data-podcast-id]').on('click', e => this.loadPodcast(parseInt($(e.currentTarget).attr('data-podcast-id')), () => this.loadView()));
            $(this.mediaView).find('*[data-podcast-year]').on('click', e => {
                const year = $(e.currentTarget).attr('data-podcast-year'), years = $(this.podcastView).attr('data-podcast-years').split(','), currentIndex = years.indexOf(this.getSelectedYear());
                if (year === '-' && currentIndex > 0) {
                    $('[data-podcast-year="' + years[currentIndex - 1] + '"]').trigger('click');
                }
                else if (year === '+' && (currentIndex + 1) < years.length) {
                    $('[data-podcast-year="' + years[currentIndex + 1] + '"]').trigger('click');
                }
                else if (parseInt(year) > 0) {
                    $('li.page-item').removeClass('active');
                    this.loadPodcastView(e.currentTarget);
                }
            });
            $(this.mediaView).find('*[data-podcast-action="filter"]').on('change', e => {
                loading_modal_11.default.showLoading();
                this.podcastConfiguration.properties.SelectedPodcastFilter = enum_functions_5.getPodcastFilterEnum($(e.currentTarget).val());
                this.podcastConfiguration.updateConfiguration(() => this.loadView(() => loading_modal_11.default.hideLoading()));
            });
            $(this.mediaView).find('*[data-podcast-action="refresh"]').on('click', e => {
                loading_modal_11.default.showLoading();
                $.post('Podcast/RefreshPodcast', { id: this.podcastConfiguration.properties.SelectedPodcastId }, () => this.loadView(() => loading_modal_11.default.hideLoading()));
            });
            $(this.mediaView).find('*[data-podcast-action="delete"]').on('click', e => {
                const $btn = $(e.currentTarget), id = $btn.attr('data-item-id'), title = 'Delete podcast', message = 'Are you sure you want to remove this podcast?', callback = () => {
                    loading_modal_11.default.showLoading();
                    $.post('Podcast/RemovePodcast', { id: id }, () => this.loadView(() => loading_modal_11.default.hideLoading()));
                };
                MessageBox.confirm(title, message, true, callback);
            });
        }
        loadPodcast(id, callback = () => null) {
            if (Number.isInteger(id)) {
                this.podcastConfiguration.properties.SelectedPodcastPage = 1 /* Podcast */;
                this.podcastConfiguration.properties.SelectedPodcastId = id;
                this.podcastConfiguration.updateConfiguration(callback);
            }
        }
        getSelectedYear() {
            return $('li.page-item.active a.page-link[data-podcast-year]').attr('data-podcast-year');
        }
        loadPodcastView(item) {
            const success = () => {
                $(item).parent('li.page-item:first').addClass('active');
                this.updateMobileYears(parseInt($(item).attr('data-item-index')));
                bootstrap_helper_6.loadTooltips(this.podcastView);
                $(this.podcastView).find('[data-podcast-item-options-popover]').each((index, element) => {
                    const $element = $(element), id = $element.attr('data-podcast-item-options-popover'), $options = $('[data-podcast-item-options=' + id + ']');
                    $element.popover({
                        trigger: 'hover',
                        content: $options.get(0),
                        sanitize: false,
                        html: true,
                        placement: 'auto',
                        container: $element.get(0)
                    });
                });
                $(this.mediaView).find('*[data-play-id]').on('click', e => this.playFunc(e.currentTarget, true));
                $(this.mediaView).find('*[data-podcast-action="download"]').on('click', e => {
                    const $btn = $(e.currentTarget), id = $btn.attr('data-item-id');
                    loading_modal_11.default.showLoading();
                    $btn.tooltip('dispose');
                    $.post($btn.attr('data-download-action'), { id: id }, () => {
                        loading_modal_11.default.hideLoading();
                        $('[data-podcast-year="' + this.getSelectedYear() + '"]').click();
                    });
                });
                $(this.mediaView).find('*[data-podcast-action="mark-played"]').on('click', e => {
                    const $btn = $(e.currentTarget), id = $btn.attr('data-item-id');
                    loading_modal_11.default.showLoading();
                    $btn.tooltip('dispose');
                    $.post($btn.attr('data-mark-played-action'), { id: id }, () => {
                        loading_modal_11.default.hideLoading();
                        $('[data-podcast-year="' + this.getSelectedYear() + '"]').click();
                    });
                });
                $(this.mediaView).find('*[data-podcast-action="show-description"]').on('click', e => {
                    const $btn = $(e.currentTarget), title = $btn.attr('data-title'), message = $btn.attr('data-message');
                    $(this.podcastView).find('[data-podcast-item-options-popover]').popover('hide');
                    MessageBox.alert(title, message, true);
                });
                this.updateActiveMediaFunc();
                loading_modal_11.default.hideLoading();
                this.refreshPodcastDownloads();
            }, id = this.podcastConfiguration.properties.SelectedPodcastId, year = $(item).attr('data-podcast-year'), filter = this.podcastConfiguration.properties.SelectedPodcastFilter;
            if (item) {
                loading_modal_11.default.showLoading();
                bootstrap_helper_6.disposeTooltips(this.podcastView);
                bootstrap_helper_6.disposePopovers(this.podcastView);
                $(this.podcastView).load('Podcast/GetPodcastItems', { id: id, year: year, filter: filter }, success);
            }
        }
        refreshPodcastDownloads() {
            const $items = $(this.podcastView).find('[data-active-download="true"]');
            if ($items.length > 0) /*then*/
                window.setTimeout(() => {
                    $items.each((index, element) => {
                        const id = $(element).attr('data-episode-id');
                        $.get('Podcast/IsDownloading?id=' + id, data => {
                            if (data && data.toLowerCase() === 'true') {
                                this.refreshPodcastDownloads();
                            }
                            else {
                                $(element).removeAttr('data-active-download');
                                $('[data-podcast-action="downloading"][data-item-id="' + id + '"]').addClass('d-none');
                                $('[data-podcast-action="download"][data-item-id="' + id + '"]').removeClass('d-none');
                            }
                        });
                    });
                }, 5000);
        }
        updateMobileYears(position) {
            const minYearCount = 5, maxYearCount = 10, numItemsBefore = Math.ceil(minYearCount / 2) - 1, numItemsAfter = minYearCount - numItemsBefore - 1, cssSelector = '[data-podcast-year]:not([data-podcast-year="+"]):not([data-podcast-year="-"]', numYears = $(cssSelector).length, delta = numYears - maxYearCount;
            let first = position - numItemsBefore, last = position + numItemsAfter;
            $(cssSelector).addClass('d-none d-lg-block');
            if (first < 1) {
                first = 1;
                last = minYearCount;
            }
            else if (last > numYears) {
                first = first - (last - numYears);
                last = numYears;
            }
            if (delta > 0) {
                let maxFirst = position - (Math.ceil(maxYearCount / 2) - 1), maxLast = position + Math.ceil(maxYearCount / 2);
                if (maxFirst < 1) {
                    maxFirst = 1;
                    maxLast = maxYearCount;
                }
                else if (maxLast > numYears) {
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
    exports.default = Podcast;
});
define("assets/interfaces/home-configuration-interface", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("assets/models/configurations/home-configuration", ["require", "exports", "assets/models/configurations/base-configuration"], function (require, exports, base_configuration_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HomeConfiguration extends base_configuration_7.default {
        constructor(properties) {
            super('Home');
            this.properties = properties;
        }
        updateConfiguration(callback = () => null) {
            super.update(this.properties, callback);
        }
    }
    exports.default = HomeConfiguration;
});
define("assets/models/configurations/configurations", ["require", "exports", "assets/models/configurations/home-configuration", "assets/models/configurations/media-library-configuration", "assets/models/configurations/music-configuration", "assets/models/configurations/player-configuration", "assets/models/configurations/playlist-configuration", "assets/models/configurations/podcast-configuration", "assets/models/configurations/television-configuration"], function (require, exports, home_configuration_1, media_library_configuration_1, music_configuration_1, player_configuration_1, playlist_configuration_1, podcast_configuration_1, television_configuration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        Home: json => new home_configuration_1.default(json),
        MediaLibrary: json => new media_library_configuration_1.default(json),
        Music: json => new music_configuration_1.default(json),
        Player: json => new player_configuration_1.default(json),
        Playlist: json => new playlist_configuration_1.default(json),
        Podcast: json => new podcast_configuration_1.default(json),
        Television: json => new television_configuration_1.default(json)
    };
});
define("media-library/home/home", ["require", "exports", "assets/models/base-class"], function (require, exports, base_class_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Home extends base_class_11.default {
        constructor(homeConfiguration) {
            super();
            this.homeConfiguration = homeConfiguration;
        }
        loadView(callback = () => null) {
            callback();
        }
    }
    exports.default = Home;
});
define("assets/modals/edit-song-modal", ["require", "exports", "assets/controls/html-controls", "assets/modals/loading-modal"], function (require, exports, html_controls_16, loading_modal_12) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class EditSongModal {
        constructor(mediaLibraryConfiguration, loadFunc = () => null) {
            this.mediaLibraryConfiguration = mediaLibraryConfiguration;
            this.loadFunc = loadFunc;
            this.modal = html_controls_16.default.Modals().EditSongModal;
            this.initializeControls();
        }
        initializeControls() {
            $(this.modal).on('show.bs.modal', e => {
                const id = $(e.relatedTarget).attr('data-item-id'), success = data => {
                    this.clearEditSongModal();
                    $('#txtEditSongTitle').text(data.Title || 'Song');
                    $('#txtEditId').val(data.Id);
                    $('#txtEditTitle').val(data.Title);
                    $('#txtEditAlbum').val(data.Album);
                    $('#txtEditArtist').val(data.Artist);
                    $('#txtEditGenre').val(data.Genre);
                    $('#txtEditPosition').val(data.Position);
                };
                $.get('Music/GetSong/' + id, success);
            });
            $('[data-song-action="save"]').on('click', e => {
                const data = 'Id=' + $('#txtEditId').val() + '&' +
                    'Title=' + encodeURIComponent($('#txtEditTitle').val()) + '&' +
                    'Album=' + encodeURIComponent($('#txtEditAlbum').val()) + '&' +
                    'Artist=' + encodeURIComponent($('#txtEditArtist').val()) + '&' +
                    'Genre=' + encodeURIComponent($('#txtEditGenre').val()) + '&' +
                    'Position=' + encodeURIComponent($('#txtEditPosition').val());
                $(this.modal).modal('hide').on('hidden.bs.modal', () => {
                    loading_modal_12.default.showLoading();
                    $.post('Music/UpdateSong', data, () => this.loadFunc(this.mediaLibraryConfiguration.properties.SelectedMediaPage));
                });
            });
        }
        clearEditSongModal() {
            $('#txtEditSongTitle').text('Song');
            $('#txtEditId').val();
            $('#txtEditTitle').val();
            $('#txtEditAlbum').val();
            $('#txtEditArtist').val();
            $('#txtEditGenre').val();
        }
    }
    exports.default = EditSongModal;
});
define("assets/modals/add-to-playlist-modal", ["require", "exports", "assets/controls/html-controls", "assets/modals/loading-modal"], function (require, exports, html_controls_17, loading_modal_13) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AddToPlaylistModal {
        constructor(loadFunc = () => null) {
            this.loadFunc = loadFunc;
            this.modal = html_controls_17.default.Modals().AddToPlaylistModal;
            this.initializeControls();
        }
        initializeControls() {
            $(this.modal).on('show.bs.modal', function (e) {
                const $btn = $(e.relatedTarget), url = $btn.attr('data-playlist-url'), id = $btn.attr('data-item-id'), type = $btn.attr('data-playlist-type');
                $('[data-playlist-item="enabled"]').attr('data-playlist-url', url);
                $('[data-playlist-item="enabled"]').attr('data-item-id', id);
                $('[data-playlist-item]').addClass('d-none');
                $('[data-playlist-item][data-playlist-type="' + type + '"]').removeClass('d-none');
            });
            $(this.modal).on('hide.bs.modal', function (e) {
                $('[data-playlist-item="enabled"]').attr('data-playlist-url', '');
                $('[data-playlist-item="enabled"]').attr('data-item-id', '');
            });
            $('[data-playlist-action="add"]').on('click', e => {
                const $btn = $(e.currentTarget), url = $btn.attr('data-playlist-url'), id = $btn.attr('data-item-id'), playlistId = $btn.attr('data-playlist-id');
                loading_modal_13.default.showLoading();
                $(this.modal).modal('hide');
                $.post(url, { playlistId, itemId: id }, () => loading_modal_13.default.hideLoading());
            });
        }
    }
    exports.default = AddToPlaylistModal;
});
define("media-library/media-library", ["require", "exports", "media-library/music/music", "media-library/player/player", "media-library/playlist/playlist", "media-library/television/television", "media-library/podcast/podcast", "assets/controls/html-controls", "assets/models/configurations/configurations", "assets/models/base-class", "assets/modals/loading-modal", "media-library/home/home", "assets/modals/edit-song-modal", "assets/enums/enum-functions", "assets/modals/add-to-playlist-modal"], function (require, exports, music_1, player_1, playlist_1, television_1, podcast_1, html_controls_18, configurations_1, base_class_12, loading_modal_14, home_1, edit_song_modal_1, enum_functions_6, add_to_playlist_modal_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class MediaLibrary extends base_class_12.default {
        constructor() {
            super();
            this.initialize();
            this.load();
            this.mainViews = html_controls_18.default.Views();
        }
        initialize() {
            this.initializeControls();
        }
        initializeControls() {
            $('[data-media-page]').on('click', e => this.loadView.call(this, enum_functions_6.getMediaPagesEnum($(e.currentTarget).attr('data-media-page'))));
        }
        load() {
            const loadFunctions = {
                loadArtist: (id) => this.music.loadArtist(id, this.loadView.bind(this, 1 /* Music */)),
                loadAlbum: (id) => this.music.loadAlbum(id, this.loadView.bind(this, 1 /* Music */)),
                loadPodcast: (id) => this.podcast.loadPodcast(id, this.loadView.bind(this, 3 /* Podcast */)),
                loadSeries: (id) => this.television.loadSeries(id, this.loadView.bind(this, 5 /* Television */))
            }, success = () => {
                loading_modal_14.default.showLoading();
                this.loadStaticViews(() => {
                    loading_modal_14.default.hideLoading();
                    this.editSongModal = new edit_song_modal_1.default(this.mediaLibraryConfiguration, this.loadView.bind(this));
                    this.addToPlaylistModal = new add_to_playlist_modal_1.default();
                    this.home = new home_1.default(this.homeConfiguration);
                    this.music = new music_1.default(this.musicConfiguration, this.playWrapper.bind(this), this.updateActiveMedia.bind(this));
                    this.playlist = new playlist_1.default(this.playlistConfiguration, this.playWrapper.bind(this), this.updateActiveMedia.bind(this), loadFunctions);
                    this.podcast = new podcast_1.default(this.podcastConfiguration, this.playWrapper.bind(this), this.updateActiveMedia.bind(this));
                    this.television = new television_1.default(this.televisionConfiguration, this.playWrapper.bind(this), this.updateActiveMedia.bind(this));
                    this.player = new player_1.default(this.playerConfiguration, loadFunctions, this.updateActiveMedia.bind(this));
                    this.loadView(this.mediaLibraryConfiguration.properties.SelectedMediaPage);
                });
            };
            this.loadConfigurations(success);
        }
        playWrapper(btn, playSingleItem) {
            this.player.play.call(this.player, btn, playSingleItem, this.loadView.bind(this, 4 /* Player */));
        }
        updateActiveMedia() {
            const $mediaView = $(this.mainViews.MediaView), currentId = this.player.getCurrentlyLoadedId();
            if (this.mediaLibraryConfiguration.properties.SelectedMediaPage === 1 /* Music */ ||
                this.mediaLibraryConfiguration.properties.SelectedMediaPage === 2 /* Playlist */) {
                $mediaView.find('.list-group-item[data-song-id].active').removeClass('active');
                $mediaView.find('.list-group-item[data-song-id="' + currentId + '"]').addClass('active');
            }
            else if (this.mediaLibraryConfiguration.properties.SelectedMediaPage === 3 /* Podcast */ ||
                this.mediaLibraryConfiguration.properties.SelectedMediaPage === 5 /* Television */) {
                $mediaView.find('.list-group-item[data-episode-id].active').removeClass('active');
                $mediaView.find('.list-group-item[data-episode-id="' + currentId + '"]').addClass('active');
            }
        }
        loadConfigurations(callback = () => null) {
            $.get('Home/HomeConfiguration', data => this.homeConfiguration = configurations_1.default.Home(data))
                .then(() => $.get('Music/MusicConfiguration', data => this.musicConfiguration = configurations_1.default.Music(data))
                .then(() => $.get('MediaLibrary/MediaLibraryConfiguration', data => this.mediaLibraryConfiguration = configurations_1.default.MediaLibrary(data))
                .then(() => $.get('Television/TelevisionConfiguration', data => this.televisionConfiguration = configurations_1.default.Television(data))
                .then(() => $.get('Podcast/PodcastConfiguration', data => this.podcastConfiguration = configurations_1.default.Podcast(data))
                .then(() => $.get('Player/PlayerConfiguration', data => this.playerConfiguration = configurations_1.default.Player(data))
                .then(() => $.get('Playlist/PlaylistConfiguration', data => this.playlistConfiguration = configurations_1.default.Playlist(data))
                .then(callback)))))));
        }
        loadStaticViews(callback = () => null) {
            $(this.mainViews.PlayerView).load($(this.mainViews.PlayerView).attr('data-action-url'), () => {
                $(this.mainViews.HomeView).load($(this.mainViews.HomeView).attr('data-action-url'), callback);
            });
        }
        loadView(mediaPage) {
            const container = html_controls_18.default.Containers().HeaderControlsContainer;
            loading_modal_14.default.showLoading();
            $('#divNavbar').collapse('hide');
            this.mediaLibraryConfiguration.properties.SelectedMediaPage = mediaPage;
            this.disableNavItem(enum_functions_6.getMediaPagesEnumString(mediaPage));
            $(container).removeClass('d-none');
            this.mediaLibraryConfiguration.updateConfiguration(() => {
                this.prepareViews();
                this.showMainView(mediaPage);
                switch (mediaPage) {
                    case 1 /* Music */:
                        this.music.loadView(() => loading_modal_14.default.hideLoading());
                        break;
                    case 4 /* Player */:
                        $(container).addClass('d-none');
                        this.player.loadView(() => loading_modal_14.default.hideLoading());
                        break;
                    case 2 /* Playlist */:
                        this.playlist.loadView(() => loading_modal_14.default.hideLoading());
                        break;
                    case 3 /* Podcast */:
                        this.podcast.loadView(() => loading_modal_14.default.hideLoading());
                        break;
                    case 5 /* Television */:
                        this.television.loadView(() => loading_modal_14.default.hideLoading());
                        break;
                    case 0 /* Home */:
                    default:
                        this.home.loadView(() => loading_modal_14.default.hideLoading());
                        break;
                }
            });
        }
        prepareViews() {
            $([this.mainViews.HomeView, this.mainViews.MediaView, this.mainViews.PlayerView]).addClass('d-none');
        }
        showMainView(mediaPage) {
            switch (mediaPage) {
                case 0 /* Home */:
                    $(this.mainViews.HomeView).removeClass('d-none');
                    break;
                case 4 /* Player */:
                    $(this.mainViews.PlayerView).removeClass('d-none');
                    break;
                default:
                    $(this.mainViews.MediaView).removeClass('d-none');
                    break;
            }
        }
        disableNavItem(view) {
            $('a.nav-link[data-media-page][href]').removeClass('d-none');
            $('a.nav-link[data-media-page]:not([href])').addClass('d-none');
            $('a.nav-link[data-media-page="' + view + '"][href]').addClass('d-none');
            $('a.nav-link[data-media-page="' + view + '"]:not([href])').removeClass('d-none');
        }
    }
    exports.default = MediaLibrary;
});
define("app", ["require", "exports", "media-library/media-library", "assets/controls/html-controls", "assets/utilities/message-box"], function (require, exports, media_library_1, html_controls_19, MessageBox) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class App {
        constructor() {
            this.initialize();
            this.mediaLibrary = new media_library_1.default();
        }
        initialize() {
            document.onfullscreenchange = () => {
                const players = html_controls_19.default.Players();
                $([players.MusicPlayer, players.VideoPlayer]).prop('controls', document.fullscreen);
            };
            window.onerror = (event, source, lineno, colno, error) => {
                MessageBox.showError('Error', error.message);
            };
        }
    }
    exports.default = App;
});
