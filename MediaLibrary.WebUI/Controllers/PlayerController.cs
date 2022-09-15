using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.WebUI.Models;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.WebUI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Controllers
{
    public class PlayerController : BaseController
    {
        private readonly ITransactionService transactionService;
        private readonly PlayerViewModel playerViewModel;
        private readonly IDataService dataService;
        private readonly IPlayerUIService playerUIService;
        private readonly IPlayerService playerService;

        public PlayerController(ITransactionService transactionService, PlayerViewModel playerViewModel, IDataService dataService,
                                IPlayerUIService playerUIService, IPlayerService playerService)
        {
            this.transactionService = transactionService;
            this.playerViewModel = playerViewModel;
            this.dataService = dataService;
            this.playerUIService = playerUIService;
            this.playerService = playerService;
        }

        public async Task<IActionResult> Index()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Player);

            playerViewModel.Configuration = configuration?.GetConfigurationObject<PlayerConfiguration>() ?? new PlayerConfiguration();
            await LoadPlayerViewModel();

            return PartialView(playerViewModel);
        }

        public async Task<IActionResult> UpdateConfiguration([FromBody] PlayerConfiguration playerConfiguration)
        {
            if (ModelState.IsValid)
            {
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Player);

                if (configuration == null)
                {
                    configuration = new Configuration() { Type = ConfigurationTypes.Player };
                    configuration.SetConfigurationObject(playerConfiguration);
                    await dataService.Insert(configuration);
                }
                else
                {
                    configuration.SetConfigurationObject(playerConfiguration);
                    await dataService.Update(configuration);
                }
            }

            return NoContent();
        }

        public async Task<IActionResult> GetPlayerItems()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Player);

            playerViewModel.Configuration = configuration?.GetConfigurationObject<PlayerConfiguration>() ?? new PlayerConfiguration();
            await LoadPlayerViewModel();

            return PartialView("~/Views/Player/PlayerItems.cshtml", playerViewModel);
        }

        private async Task LoadPlayerViewModel()
        {
            IEnumerable<int> ids = Enumerable.Empty<int>();

            if (playerViewModel.Configuration.SelectedMediaType == MediaTypes.Song)
            {
                playerViewModel.Songs = await playerService.GetNowPlayingSongs();
            }
            else if (playerViewModel.Configuration.SelectedMediaType == MediaTypes.Podcast)
            {
                playerViewModel.PodcastItems = await playerService.GetNowPlayingPodcastItems();
            }
            else if (playerViewModel.Configuration.SelectedMediaType == MediaTypes.Television)
            {
                playerViewModel.Episodes = await playerService.GetNowPlayingEpisodes();
            }
        }

        public async Task UpdatePlayCount(MediaTypes mediaType, int id)
        {
            await playerService.UpdatePlayCount(id, mediaType);
        }

        public async Task<IActionResult> PlayerConfiguration()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Player);

            playerViewModel.Configuration = configuration?.GetConfigurationObject<PlayerConfiguration>() ?? new PlayerConfiguration();

            return Json(playerViewModel.Configuration, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }

        public async Task UpdatePlayerProgress(int id, MediaTypes mediaType, int progress)
        {
            await playerService.UpdatePlayerProgress(id, mediaType, progress);
        }

        public async Task<int> GetPlayerProgress(int id, MediaTypes mediaType)
        {
            return await playerService.GetPlayerProgress(id, mediaType);
        }
    }
}