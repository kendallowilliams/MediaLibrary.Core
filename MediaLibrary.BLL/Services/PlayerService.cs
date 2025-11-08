using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.Shared.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.BLL.Services
{
    public class PlayerService : IPlayerService
    {
        private readonly IFileService fileService;
        private readonly IDataService dataService;

        public PlayerService(IDataService dataService, IFileService fileService)
        {
            this.dataService = dataService;
            this.fileService = fileService;
        }

        public async Task UpdatePlayCount(int id, MediaTypes mediaType)
        {
            if (mediaType == MediaTypes.Podcast)
            {
                PodcastItem podcastItem = await dataService.Get<PodcastItem>(item => item.Id == id);

                if (podcastItem != null)
                {
                    podcastItem.PlayCount++;
                    podcastItem.LastPlayedDate = DateTime.Now;
                    await dataService.Update(podcastItem);
                }
            }
            else if (mediaType == MediaTypes.Song)
            {
                Track track = await dataService.Get<Track>(item => item.Id == id);

                if (track != null)
                {
                    track.PlayCount++;
                    track.LastPlayedDate = DateTime.Now;
                    await dataService.Update(track);
                }
            }
            else if (mediaType == MediaTypes.Television)
            {
                Episode episode = await dataService.Get<Episode>(item => item.Id == id);

                if (episode != null)
                {
                    episode.PlayCount++;
                    episode.LastPlayedDate = DateTime.Now;
                    await dataService.Update(episode);
                }
            }
        }

        public async Task UpdatePlayerProgress(int id, MediaTypes mediaType, int progess)
        {
            if (id > 0)
            {
                if (mediaType == MediaTypes.Podcast)
                {
                    PodcastItem podcastItem = await dataService.Get<PodcastItem>(item => item.Id == id);

                    podcastItem.Progress = progess;
                    await dataService.Update(podcastItem);
                }
                else if (mediaType == MediaTypes.Song)
                {
                    Track song = await dataService.Get<Track>(item => item.Id == id);

                    song.Progress = progess;
                    await dataService.Update(song);
                }
                else if (mediaType == MediaTypes.Television)
                {
                    Episode episode = await dataService.Get<Episode>(item => item.Id == id);

                    episode.Progress = progess;
                    await dataService.Update(episode);
                }
            }
        }

        public async Task<int> GetPlayerProgress(int id, MediaTypes mediaType)
        {
            int progress = default;

            if (id > 0)
            {
                if (mediaType == MediaTypes.Podcast)
                {
                    progress = await dataService.Get<PodcastItem>(item => item.Id == id).ContinueWith(task => task.Result.Progress);
                }
                else if (mediaType == MediaTypes.Song)
                {
                    progress = await dataService.Get<Track>(item => item.Id == id).ContinueWith(task => task.Result.Progress);
                }
                else if (mediaType == MediaTypes.Television)
                {
                    progress = await dataService.Get<Episode>(item => item.Id == id).ContinueWith(task => task.Result.Progress);
                }
            }

            return progress;
        }

        public async Task<IEnumerable<Track>> GetNowPlayingSongs()
        {
            IEnumerable<int> ids = Enumerable.Empty<int>();
            IEnumerable<Track> songs = Enumerable.Empty<Track>();
            IEnumerable<IListItem<int, int>> items = Enumerable.Empty<IListItem<int, int>>();
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Player);

            if (configuration != null)
            {
                PlayerConfiguration playerConfiguration = configuration.GetConfigurationObject<PlayerConfiguration>();

                items = playerConfiguration.NowPlayingList;
            }

            ids = items.Select(item => item.Value);
            songs = await dataService.GetList<Track>(item => ids.Contains(item.Id), default, item => item.Album, item => item.Artist);

            return ids.Select(id => songs.FirstOrDefault(item => item.Id == id)).Where(item => item != null);
        }

        public async Task<IEnumerable<PodcastItem>> GetNowPlayingPodcastItems()
        {
            IEnumerable<int> ids = Enumerable.Empty<int>();
            IEnumerable<IListItem<int, int>> items = Enumerable.Empty<IListItem<int, int>>();
            IEnumerable<PodcastItem> podcastItems = Enumerable.Empty<PodcastItem>();
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Player);

            if (configuration != null)
            {
                PlayerConfiguration playerConfiguration = configuration.GetConfigurationObject<PlayerConfiguration>();

                items = playerConfiguration.NowPlayingList;
            }

            ids = items.Select(item => item.Value);
            podcastItems = await dataService.GetList<PodcastItem>(item => ids.Contains(item.Id), default, item => item.Podcast);

            return ids.Select(id => podcastItems.FirstOrDefault(item => item.Id == id)).Where(item => item != null);
        }

        public async Task<IEnumerable<Episode>> GetNowPlayingEpisodes()
        {
            IEnumerable<int> ids = Enumerable.Empty<int>();
            IEnumerable<IListItem<int, int>> items = Enumerable.Empty<IListItem<int, int>>();
            IEnumerable<Episode> episodes = Enumerable.Empty<Episode>();
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Player);

            if (configuration != null)
            {
                PlayerConfiguration playerConfiguration = configuration.GetConfigurationObject<PlayerConfiguration>();

                items = playerConfiguration.NowPlayingList;
            }

            ids = items.Select(item => item.Value);
            episodes = await dataService.GetList<Episode>(item => ids.Contains(item.Id), default, item => item.Series);

            return ids.Select(id => episodes.FirstOrDefault(item => item.Id == id)).Where(item => item != null);
        }
    }
}
