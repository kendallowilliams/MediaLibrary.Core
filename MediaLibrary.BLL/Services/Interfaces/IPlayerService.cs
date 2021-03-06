using MediaLibrary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Services.Interfaces
{
    public interface IPlayerService
    {
        Task UpdatePlayCount(int id, MediaTypes mediaType);
        Task UpdatePlayerProgress(int id, MediaTypes mediaType, int progess);
        Task<IEnumerable<Track>> GetNowPlayingSongs();
        Task<IEnumerable<PodcastItem>> GetNowPlayingPodcastItems();
        Task<IEnumerable<Episode>> GetNowPlayingEpisodes();
    }
}
