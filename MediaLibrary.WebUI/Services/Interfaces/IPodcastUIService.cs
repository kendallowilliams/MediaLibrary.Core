using MediaLibrary.DAL.Models;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Services.Interfaces
{
    public interface IPodcastUIService
    {
        Task<IEnumerable<IGrouping<string, Podcast>>> GetPodcastGroups(PodcastSort sort);
        void ClearPodcasts();
        IEnumerable<int> GetActiveDownloadIds();
        Task RemoveActiveDownloadId(int id);
        Task AddActiveDownloadId(int id);
    }
}
