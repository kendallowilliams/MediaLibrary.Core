using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace MediaLibrary.WebUI.Hubs
{
    public class MediaLibraryHub : Hub
    {
        private readonly IDataService dataService;
        private readonly IPlayerService playerService;

        public MediaLibraryHub(IDataService dataService, IPlayerService playerService)
        {
            this.dataService = dataService;
            this.playerService = playerService;
        }

        public async Task Test()
        {
            await Clients.Caller.SendAsync("testCalled", "Hello World!");
        }
    }
}
