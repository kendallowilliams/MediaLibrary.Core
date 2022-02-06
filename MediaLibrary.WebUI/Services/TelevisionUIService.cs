using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.WebUI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.Shared.Enums;
using MediaLibrary.WebUI.Models;
using Microsoft.Extensions.Caching.Memory;

namespace MediaLibrary.WebUI.Services
{
    public class TelevisionUIService : BaseUIService, ITelevisionUIService
    {
        private readonly IDataService dataService;
        private readonly IMemoryCache memoryCache;

        public TelevisionUIService(IDataService dataService, IMemoryCache memoryCache) : base()
        {
            this.dataService = dataService;
            this.memoryCache = memoryCache;
        }

        public async Task<IEnumerable<IGrouping<string, Series>>> GetSeriesGroups(SeriesSort sort)
        {
            IEnumerable<IGrouping<string, Series>> groups = null;

            if (!memoryCache.TryGetValue(nameof(CacheKeys.Series), out IEnumerable<Series> series))
            {
                series = await dataService.GetList<Series>(default, default, s => s.Episodes);
                memoryCache.Set(nameof(CacheKeys.Series), series);
            }

            switch (sort)
            {
                case SeriesSort.AtoZ:
                default:
                    groups = GetSeriessAtoZ(series.OrderBy(s => s.Title));
                    break;
            }

            return groups;
        }

        private IEnumerable<IGrouping<string, Series>> GetSeriessAtoZ(IEnumerable<Series> series)
        {
            return series.GroupBy(s => getCharLabel(s.Title)).OrderBy(group => group.Key);
        }

        public void ClearData()
        {
            memoryCache.Remove(nameof(CacheKeys.Series));
        }
    }
}