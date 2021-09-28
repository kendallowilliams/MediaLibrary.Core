using Fody;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.WebUI.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Services
{
    [ConfigureAwait(false)]
    public class PodcastUIService : BaseUIService, IPodcastUIService
    {
        private readonly IDataService dataService;
        private readonly IMemoryCache memoryCache;

        public PodcastUIService(IDataService dataService, IMemoryCache memoryCache) : base()
        {
            this.dataService = dataService;
            this.memoryCache = memoryCache;
        }

        public async Task<IEnumerable<IGrouping<string, Podcast>>> GetPodcastGroups(PodcastSort sort)
        {
            IEnumerable<IGrouping<string, Podcast>> groups = null;

            if (!memoryCache.TryGetValue(nameof(CacheKeys.Podcasts), out IEnumerable<Podcast> podcasts))
            {
                podcasts = await dataService.GetList<Podcast>(default, default, podcast => podcast.PodcastItems);
                memoryCache.Set(nameof(CacheKeys.Podcasts), podcasts);
            }

            switch (sort)
            {
                case PodcastSort.DateAdded:
                    groups = podcasts.GroupBy(podcast => podcast.CreateDate.ToString("MM-dd-yyyy")).OrderBy(group => DateTime.Parse(group.Key));
                    break;
                case PodcastSort.AtoZ:
                    groups = GetPodcastsAtoZ(podcasts.OrderBy(podcast => podcast.Title));
                    break;
                case PodcastSort.LastUpdateDate:
                default:
                    groups = podcasts.GroupBy(podcast => podcast.LastUpdateDate.ToString("MM-dd-yyyy")).OrderByDescending(group => DateTime.Parse(group.Key));
                    break;
            }

            return groups;
        }

        private IEnumerable<IGrouping<string, Podcast>> GetPodcastsAtoZ(IEnumerable<Podcast> podcasts)
        {
            return podcasts.GroupBy(podcast => getCharLabel(podcast.Title)).OrderBy(group => group.Key);
        }

        public void ClearPodcasts()
        {
            memoryCache.Remove(nameof(CacheKeys.Podcasts));
        }
    }
}