using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.WebUI.Models;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.WebUI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;
using System.IO;

namespace MediaLibrary.WebUI.Controllers
{
    public class PlaylistController : BaseController
    {
        private readonly IPlaylistUIService playlistService;
        private readonly IDataService dataService;
        private readonly PlaylistViewModel playlistViewModel;
        private readonly ITransactionService transactionService;
        private readonly ILogService logService;
        private readonly ICompressionService compressionService;

        public PlaylistController(IPlaylistUIService playlistService, IDataService dataService, PlaylistViewModel playlistViewModel,
                                  ITransactionService transactionService, ILogService logService, ICompressionService compressionService)
        {
            this.playlistService = playlistService;
            this.dataService = dataService;
            this.playlistViewModel = playlistViewModel;
            this.transactionService = transactionService;
            this.logService = logService;
            this.compressionService = compressionService;
        }

        public async Task<IActionResult> Index()
        {
            IActionResult result = null;
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Playlist);

            playlistViewModel.Configuration = configuration?.GetConfigurationObject<PlaylistConfiguration>() ?? new PlaylistConfiguration();

            if (playlistViewModel.Configuration.SelectedPlaylistPage == PlaylistPages.Playlist &&
                (playlistViewModel.Configuration.SelectedPlaylistId < 0 ||
                 await dataService.Exists<Playlist>(album => album.Id == playlistViewModel.Configuration.SelectedPlaylistId)))
            {
                result = await Get(playlistViewModel.Configuration.SelectedPlaylistId);
            }
            else
            {
                playlistViewModel.PlaylistGroups = await playlistService.GetPlaylistGroups(playlistViewModel.Configuration);
                result = PartialView(playlistViewModel);
            }

            return result;
        }

        public async Task<IActionResult> PlaylistList(PlaylistTypes type)
        {
            IEnumerable<Playlist> playlists = await dataService.GetList<Playlist>(item => item.Type == type);

            return PartialView(playlists);
        }

        public async Task AddPlaylist(string playlistName, PlaylistTypes playlistType)
        {
            playlistName = playlistName?.Trim();

            if (!string.IsNullOrWhiteSpace(playlistName))
            {
                var existingPlaylist = await dataService.Get<Playlist>(item => item.Name.Equals(playlistName) && item.Type == playlistType);
                Playlist playlist = existingPlaylist ?? new Playlist(playlistName) { Type = playlistType };
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Playlist);

                if (existingPlaylist == null) /*then*/ await dataService.Insert(playlist);

                if (configuration != null)
                {
                    playlistViewModel.Configuration = configuration.GetConfigurationObject<PlaylistConfiguration>();
                    playlistViewModel.Configuration.SelectedPlaylistId = playlist.Id;
                    playlistViewModel.Configuration.SelectedPlaylistPage = PlaylistPages.Playlist;
                    configuration.SetConfigurationObject(playlistViewModel.Configuration);
                    await dataService.Update(configuration);
                }
            }
        }

        public async Task RemovePlaylist(int id)
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Playlist);
            
            await dataService.Delete<Playlist>(id);

            if (configuration != null)
            {
                PlaylistConfiguration playlistConfiguration = configuration.GetConfigurationObject<PlaylistConfiguration>();

                playlistConfiguration.SelectedPlaylistPage = PlaylistPages.Index;
                configuration.SetConfigurationObject(playlistConfiguration);
                await dataService.Update(configuration);
            }
        }

        public async Task EditPlaylist(int id, string name)
        {
            Playlist playlist = await dataService.Get<Playlist>(item => item.Id == id);

            playlist.Name = name;
            await dataService.Update(playlist);
        }

        private async Task<IActionResult> Get(int id)
        {
            if (id > 0)
            {
                playlistViewModel.SelectedPlaylist = await dataService.GetAlt<Playlist>(item => item.Id == id, default,
                                                                                        "PlaylistTracks.Track.Album",
                                                                                        "PlaylistTracks.Track.Artist",
                                                                                        "PlaylistPodcastItems.PodcastItem.Podcast",
                                                                                        "PlaylistEpisodes.Episode.Series");
            }
            else
            {
                IEnumerable<Playlist> systemPlaylists = await playlistService.GetSystemPlaylists(true, true);

                playlistViewModel.SelectedPlaylist = systemPlaylists.FirstOrDefault(playlist => playlist.Id == id);
            }

            return PartialView("Playlist", playlistViewModel);
        }

        public async Task<IActionResult> GetPlaylistOptions(int id)
        {
            var playlist = default(Playlist);

            if (id > 0)
            {
                playlist = await dataService.Get<Playlist>(item => item.Id == id,
                    default,
                    item => item.PlaylistTracks,
                    item => item.PlaylistPodcastItems,
                    item => item.PlaylistEpisodes);
            }
            else
            {
                IEnumerable<Playlist> systemPlaylists = await playlistService.GetSystemPlaylists(true, true);

                playlist = systemPlaylists.FirstOrDefault(playlist => playlist.Id == id);
            }

            return PartialView("Controls/PlaylistOptions", playlist);
        }

        public async Task RemovePlaylistItem(int id, PlaylistTabs playlistType)
        {
            switch(playlistType)
            {
                case PlaylistTabs.Music:
                    await dataService.Delete<PlaylistTrack>(id);
                    break;
                case PlaylistTabs.Podcast:
                    await dataService.Delete<PlaylistPodcastItem>(id);
                    break;
                case PlaylistTabs.Television:
                    await dataService.Delete<PlaylistEpisode>(id);
                    break;
                default:
                    break;
            }
        }

        [AllowAnonymous]
        public async Task<IActionResult> GetDynamicM3UPlaylist(int id, bool random = false)
        {
            Random rand = new Random(DateTime.Now.Millisecond);
            IEnumerable<Playlist> systemPlaylists = id < 0 ? await playlistService.GetSystemPlaylists(true, true) : Enumerable.Empty<Playlist>();
            Playlist playlist = id > 0 ? await dataService.GetAlt<Playlist>(list => list.Id == id, default) :
                                         systemPlaylists.FirstOrDefault(item => item.Id == id);
            string path = $"{Request.Scheme}://{Request.Host}{Request.PathBase}/Playlist",
                      data,
                      timestamp = DateTime.Now.ToString("yyyyMMddHHmmss"),
                      fileName = $"{playlist.Name.Trim()}_Dynamic_{timestamp}.m3u",
                      line = $"{path}/{nameof(GetM3UPlaylist)}/{playlist.Id}?random={random}";
            byte[] content;

            data = $"#EXTM3U{Environment.NewLine}{$"#EXTINF:0,{playlist.Name}{Environment.NewLine}{line}"}";
            content = Encoding.UTF8.GetBytes(data);

            return File(content, "audio/mpegurl", fileName);
        }

        [AllowAnonymous]
        public async Task<IActionResult> GetM3UPlaylist(int id, bool random = false)
        {
            Random rand = new Random(DateTime.Now.Millisecond);
            IEnumerable<Playlist> systemPlaylists = id < 0 ? await playlistService.GetSystemPlaylists(true, true) : Enumerable.Empty<Playlist>();
            Playlist playlist = id > 0 ? await dataService.GetAlt<Playlist>(list => list.Id == id, default, "PlaylistTracks.Track", 
                                                                                                            "PlaylistPodcastItems.PodcastItem",
                                                                                                            "PlaylistEpisodes.Episode") :
                                         systemPlaylists.FirstOrDefault(item => item.Id == id);
            IEnumerable<PlaylistTrack> playlistTracks = random ? playlist.PlaylistTracks.OrderBy(item => rand.Next()) :
                                                                 playlist.PlaylistTracks.OrderBy(item => item.CreateDate);
            IEnumerable<PlaylistPodcastItem> playlistPodcastItems = random ? playlist.PlaylistPodcastItems.OrderBy(item => rand.Next()) :
                                                                             playlist.PlaylistPodcastItems.OrderBy(item => item.CreateDate);
            IEnumerable<PlaylistEpisode> playlistEpisodes = random ? playlist.PlaylistEpisodes.OrderBy(item => rand.Next()) :
                                                                     playlist.PlaylistEpisodes.OrderBy(item => item.CreateDate);
            IEnumerable<Track> tracks = playlistTracks.Select(list => list.Track);
            IEnumerable<PodcastItem> podcastItems = playlistPodcastItems.Select(list => list.PodcastItem);
            IEnumerable<Episode> episodes = playlistEpisodes.Select(list => list.Episode);
            string path = $"{Request.Scheme}://{Request.Host}{Request.PathBase}",
                   data,
                   timestamp = DateTime.Now.ToString("yyyyMMddHHmmss"),
                   fileName = $"{playlist.Name.Trim()}_{timestamp}.m3u";
            IEnumerable<string> lines = GetM3UPlaylistLines((PlaylistTabs)playlist.Type, path, tracks, podcastItems, episodes);
            byte[] content;

            data = $"#EXTM3U{Environment.NewLine}{string.Join(Environment.NewLine, lines)}";
            content = Encoding.UTF8.GetBytes(data);

            return File(content, "audio/mpegurl", fileName);
        }

        private IEnumerable<string> GetM3UPlaylistLines(PlaylistTabs type, string path, IEnumerable<Track> songs, IEnumerable<PodcastItem> podcastItems, IEnumerable<Episode> episodes)
        {
            IEnumerable<string> lines = Enumerable.Empty<string>();

            if (type == PlaylistTabs.Music)
            {
                lines = songs.Select(track => $"#EXTINF:{(int)track.Duration},{track.Title}{Environment.NewLine}{$"{path}/Music/File/{track.Id}"}");
            }
            else if (type == PlaylistTabs.Podcast)
            {
                lines = podcastItems.Select(item => $"#EXTINF:{(int)item.Length},{item.Title}{Environment.NewLine}{$"{path}/Podcast/File/{item.Id}"}");
            }
            else if (type == PlaylistTabs.Television)
            {
                lines = episodes.Select(episode => $"#EXTINF:0,{episode.Title}{Environment.NewLine}{$"{path}/Television/File/{episode.Id}"}");
            }

            return lines;
        }

        public async Task<IActionResult> GetM3UPlaylistArchive(int id)
        {
            var systemPlaylists = id < 0 ? await playlistService.GetSystemPlaylists(true, true) : Enumerable.Empty<Playlist>();
            var playlist = id > 0 ? await dataService.GetAlt<Playlist>(list => list.Id == id, default, "PlaylistTracks.Track.Path") :
                                         systemPlaylists.FirstOrDefault(item => item.Id == id);
            var playlistTracks = playlist.PlaylistTracks.OrderBy(item => item.CreateDate);
            var tracks = playlistTracks.Select(list => list.Track);
            var paths = id <= 0 ? await dataService.GetList<TrackPath>() : Enumerable.Empty<TrackPath>();
            var files = id > 0 ? 
                tracks.Select(track => Path.Combine(track.Path.Location, track.FileName)) : 
                tracks.Join(paths, t => t.PathId, p => p.Id, (track, path) => Path.Combine(path.Location, track.FileName));
            string timestamp = DateTime.Now.ToString("yyyyMMddHHmmss"),
                   fileName = $"{playlist.Name.Trim()}_{timestamp}.zip";
            var data = await compressionService.CreateArchive(files);

            return File(data, "application/zip", fileName);
        }

        public async Task<IActionResult> GetTelevisionM3UPlaylistsArchive()
        {
            var series = await dataService.GetList<Series>(null, default, s => s.Episodes);
            string timestamp = DateTime.Now.ToString("yyyyMMddHHmmss"),
                   fileName = $"Series_{timestamp}.zip",
                   path = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            var entries = series
                .SelectMany(s => s.Episodes)
                .GroupBy(e => $"{e.Series.Title}/{e.Season:00}.m3u")
                .Select(grp => new
                {
                    Path = grp.Key,
                    Lines = GetM3UPlaylistLines(PlaylistTabs.Television, path, null, null, grp)
                })
                .Select(grp => new
                { 
                    grp.Path,
                    Data = $"#EXTM3U{Environment.NewLine}{string.Join(Environment.NewLine, grp.Lines)}"
                })
                .Select(grp => new
                {
                    grp.Path,
                    Data = Encoding.UTF8.GetBytes(grp.Data)
                })
                .ToDictionary(grp => grp.Path, grp => grp.Data);

            var data = await compressionService.CreateArchive(entries);

            return File(data, "application/zip", fileName);
        }

        public async Task<IActionResult> UpdateConfiguration([FromBody] PlaylistConfiguration playlistConfiguration)
        {
            if (ModelState.IsValid)
            {
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Playlist);

                if (configuration == null)
                {
                    configuration = new Configuration() { Type = ConfigurationTypes.Playlist };
                    configuration.SetConfigurationObject(playlistConfiguration);
                    await dataService.Insert(configuration);
                }
                else
                {
                    configuration.SetConfigurationObject(playlistConfiguration);
                    await dataService.Update(configuration);
                }
            }

            return NoContent();
        }

        public async Task<IActionResult> PlaylistConfiguration()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Playlist);

            playlistViewModel.Configuration = configuration?.GetConfigurationObject<PlaylistConfiguration>() ?? new PlaylistConfiguration();

            return Json(playlistViewModel.Configuration, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }

        public async Task<IActionResult> GetPlaylistsJSON()
        {
            Task<IEnumerable<Playlist>> dbPlaylistTasks = dataService.GetList<Playlist>(default, default, item => item.PlaylistEpisodes,
                                                                                                          item => item.PlaylistPodcastItems,
                                                                                                          item => item.PlaylistTracks),
                                        systemPlaylistTask = playlistService.GetSystemPlaylists(true);
            IEnumerable<Playlist> playlists = Enumerable.Empty<Playlist>();
            string json = string.Empty;
            JsonSerializerSettings settings = new JsonSerializerSettings() { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };

            playlists = await Task.WhenAll(dbPlaylistTasks, systemPlaylistTask).ContinueWith(task => task.Result.SelectMany(item => item).ToList());
            json = JsonConvert.SerializeObject(playlists, settings);

            return new ContentResult() { Content = json, ContentType = "application/json" };
        }

        public async Task<IActionResult> GetPlaylistJSON(int id)
        {
            Playlist playlist = default;
            string json = string.Empty;
            JsonSerializerSettings settings = new JsonSerializerSettings() { ReferenceLoopHandling = ReferenceLoopHandling.Ignore };

            if (id > 0)
            {
                await dataService.GetAlt<Playlist>(item => item.Id == id, default, "PlaylistEpisodes.Episode",
                                                                                   "PlaylistPodcastItems.PodcastItem",
                                                                                   "PlaylistTracks.Track.Album",
                                                                                   "PlaylistTracks.Track.Artist")
                                 .ContinueWith(task => playlist = task.Result);
            }
            else
            {
                await playlistService.GetSystemPlaylists(true, true).ContinueWith(task => playlist = task.Result.FirstOrDefault(item => item.Id == id));
            }

            json = JsonConvert.SerializeObject(playlist, settings);

            return new ContentResult() { Content = json, ContentType = "application/json" };
        }
    }
}