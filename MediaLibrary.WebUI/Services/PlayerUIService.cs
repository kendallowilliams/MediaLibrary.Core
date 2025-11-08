using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.WebUI.Services.Interfaces;

namespace MediaLibrary.WebUI.Services
{
    public class PlayerUIService : BaseUIService, IPlayerUIService
    {
        private readonly IDataService dataService;

        public PlayerUIService(IDataService dataService) : base()
        {
            this.dataService = dataService;
        }
    }
}