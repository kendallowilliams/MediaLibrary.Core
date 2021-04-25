import HomeConfiguration from "../models/configurations/home-configuration";
import MediaLibraryConfiguration from "../models/configurations/media-library-configuration";
import MusicConfiguration from "../models/configurations/music-configuration";
import PlayerConfiguration from "../models/configurations/player-configuration";
import PlaylistConfiguration from "../models/configurations/playlist-configuration";
import PodcastConfiguration from "../models/configurations/podcast-configuration";
import TelevisionConfiguration from "../models/configurations/television-configuration";

export default interface IConfigurations {
    MediaLibary: MediaLibraryConfiguration;
    Music: MusicConfiguration;
    Player: PlayerConfiguration;
    Home: HomeConfiguration;
    Playlist: PlaylistConfiguration;
    Television: TelevisionConfiguration;
    Podcast: PodcastConfiguration;
}