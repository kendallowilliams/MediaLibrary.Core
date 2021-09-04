using MediaLibrary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IPodcastService
    {
        Task<Podcast> AddPodcast(string url);

        Task RemovePodcast(int id);

        Task<Podcast> RefreshPodcast(Podcast podcast);

        Task<string> AddPodcastFile(Transaction transaction, int podcastItemId);
    }
}
