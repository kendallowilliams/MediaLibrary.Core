using MediaLibrary.DAL.Models;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IPodcastService
    {
        Task<Podcast> AddPodcast(string url);

        Task RemovePodcast(int id);

        Task<Podcast> RefreshPodcast(Podcast podcast);

        Task<string> AddPodcastFile(int podcastItemId);

        Task CleanMissingPodcastFiles();

        string GetPodcastItemFileCacheKey(int id);
    }
}
