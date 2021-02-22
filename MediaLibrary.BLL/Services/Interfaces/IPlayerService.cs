﻿using MediaLibrary.BLL.Models;
using MediaLibrary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.BLL.Enums;

namespace MediaLibrary.WebUI.Services.Interfaces
{
    public interface IPlayerService
    {
        Task UpdatePlayCount(int id, MediaTypes mediaType);
        Task UpdatePlayerProgress(int id, MediaTypes mediaType, int progess);
        void UpdateNowPlaying(IEnumerable<ListItem<int, int>> items, MediaTypes mediaType);
        Task<IEnumerable<Track>> GetNowPlayingSongs();
        Task<IEnumerable<PodcastItem>> GetNowPlayingPodcastItems();
        Task<IEnumerable<Episode>> GetNowPlayingEpisodes();
        void ClearNowPlaying(MediaTypes mediaType);
    }
}
