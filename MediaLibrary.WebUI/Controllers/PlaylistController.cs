﻿using MediaLibrary.BLL.Models;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.WebUI.Models;
using MediaLibrary.WebUI.Models.Configurations;
using MediaLibrary.WebUI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.WebUI.UIEnums;

namespace MediaLibrary.WebUI.Controllers
{
    public class PlaylistController : BaseController
    {
        private readonly Lazy<IPlaylistUIService> lazyPlaylistService;
        private readonly Lazy<IDataService> lazyDataService;
        private readonly Lazy<PlaylistViewModel> lazyPlaylistViewModel;
        private readonly Lazy<ITransactionService> lazyTransactionService;
        private IPlaylistUIService playlistService => lazyPlaylistService.Value;
        private IDataService dataService => lazyDataService.Value;
        private PlaylistViewModel playlistViewModel => lazyPlaylistViewModel.Value;
        private ITransactionService transactionService => lazyTransactionService.Value;

        public PlaylistController(IMefService mefService)
        {
            this.lazyPlaylistService = mefService.GetExport<IPlaylistUIService>();
            this.lazyDataService = mefService.GetExport<IDataService>();
            this.lazyPlaylistViewModel = mefService.GetExport<PlaylistViewModel>();
            this.lazyTransactionService = mefService.GetExport<ITransactionService>();
        }

        public async Task<IActionResult> Index()
        {
            IActionResult result = null;
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Playlist));

            if (configuration != null)
            {
                playlistViewModel.Configuration = JsonConvert.DeserializeObject<PlaylistConfiguration>(configuration.JsonData);
            }

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

        public async Task AddPlaylist(string playlistName, PlaylistTabs playlistType)
        {
            if (!string.IsNullOrWhiteSpace(playlistName))
            {
                Playlist playlist = new Playlist(playlistName) { Type = (int)playlistType };
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Playlist));

                await dataService.Insert(playlist);

                if (configuration != null)
                {
                    playlistViewModel.Configuration = JsonConvert.DeserializeObject<PlaylistConfiguration>(configuration.JsonData);
                    playlistViewModel.Configuration.SelectedPlaylistId = playlist.Id;
                    playlistViewModel.Configuration.SelectedPlaylistPage = PlaylistPages.Playlist;
                    configuration.JsonData = JsonConvert.SerializeObject(playlistViewModel.Configuration);
                    await dataService.Update(configuration);
                }
            }
        }

        public async Task RemovePlaylist(int id)
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Playlist));
            
            await dataService.Delete<Playlist>(id);

            if (configuration != null)
            {
                PlaylistConfiguration playlistConfiguration = JsonConvert.DeserializeObject<PlaylistConfiguration>(configuration.JsonData);

                playlistConfiguration.SelectedPlaylistPage = PlaylistPages.Index;
                configuration.JsonData = JsonConvert.SerializeObject(playlistConfiguration);
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

        public async Task RemovePlaylistItem(int id, int playlistId)
        {
            await dataService.Delete<PlaylistTrack>(id);
        }

#if !DEBUG && !DEV
        [AllowAnonymous]
#endif
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
            string path = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            IEnumerable<string> lines = GetM3UPlaylistLines((PlaylistTabs)playlist.Type, path, tracks, podcastItems, episodes);
            string data = $"#EXTM3U{Environment.NewLine}{string.Join(Environment.NewLine, lines)}";
            byte[] content = Encoding.UTF8.GetBytes(data);
            string timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");

            return File(content, "audio/mpegurl", $"{playlist.Name.Trim()}_{timestamp}.m3u");
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

        public async Task<IActionResult> UpdateConfiguration(PlaylistConfiguration playlistConfiguration)
        {
            if (ModelState.IsValid)
            {
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Playlist));

                if (configuration == null)
                {
                    configuration = new Configuration() { Type = nameof(MediaPages.Playlist), JsonData = JsonConvert.SerializeObject(playlistConfiguration) };
                    await dataService.Insert(configuration);
                }
                else
                {
                    configuration.JsonData = JsonConvert.SerializeObject(playlistConfiguration);
                    await dataService.Update(configuration);
                }
            }

            return NoContent();
        }

        public async Task<IActionResult> PlaylistConfiguration()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Playlist));

            if (configuration != null)
            {
                playlistViewModel.Configuration = JsonConvert.DeserializeObject<PlaylistConfiguration>(configuration.JsonData) ?? new PlaylistConfiguration();
            }

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