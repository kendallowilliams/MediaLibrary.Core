using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IProcessorService
    {
        Task RefreshPodcasts();
        Task PerformCleanup();
        Task RefreshMusic();
    }
}
