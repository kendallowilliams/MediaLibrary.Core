using Fody;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.WebUI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Services
{
    [ConfigureAwait(false)]
    [Export(typeof(IPodcastUIService))]
    public class PodcastUIService : BaseUIService, IPodcastUIService
    {
        private readonly Lazy<IDataService> lazyDataService;
        private IDataService dataService => lazyDataService.Value;

        [ImportingConstructor]
        public PodcastUIService(Lazy<IDataService> dataService) : base()
        {
            this.lazyDataService = dataService;
        }

        public async Task<IEnumerable<IGrouping<string, Podcast>>> GetPodcastGroups(PodcastSort sort)
        {
            IEnumerable<IGrouping<string, Podcast>> groups = null;
            IEnumerable<Podcast> podcasts = await dataService.GetList<Podcast>(default, default, podcast => podcast.PodcastItems);

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
    }
}