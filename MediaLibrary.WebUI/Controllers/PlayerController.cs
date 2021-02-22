using MediaLibrary.BLL.Models;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.WebUI.Models;
using MediaLibrary.WebUI.Models.Configurations;
using MediaLibrary.WebUI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.BLL.Enums;
using static MediaLibrary.WebUI.UIEnums;

namespace MediaLibrary.WebUI.Controllers
{
    public class PlayerController : BaseController
    {
        private readonly Lazy<ITransactionService> lazyTransactionService;
        private readonly Lazy<PlayerViewModel> lazyPlayerViewModel;
        private readonly Lazy<IDataService> lazyDataService;
        private readonly Lazy<IPlayerUIService> lazyPlayerUIService;
        private readonly Lazy<IPlayerService> lazyPlayerService;
        private ITransactionService transactionService => lazyTransactionService.Value;
        private PlayerViewModel playerViewModel => lazyPlayerViewModel.Value;
        private IDataService dataService => lazyDataService.Value;
        private IPlayerUIService playerUIService => lazyPlayerUIService.Value;
        private IPlayerService playerService => lazyPlayerService.Value;

        public PlayerController(IMefService mefService)
        {
            this.lazyTransactionService = mefService.GetExport<ITransactionService>();
            this.lazyPlayerViewModel = mefService.GetExport<PlayerViewModel>();
            this.lazyDataService = mefService.GetExport<IDataService>();
            this.lazyPlayerUIService = mefService.GetExport<IPlayerUIService>();
            this.lazyPlayerService = mefService.GetExport<IPlayerService>();
        }

#if !DEBUG
        [CompressContent]
#endif
        public async Task<IActionResult> Index()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Player));

            if (configuration != null)
            {
                playerViewModel.Configuration = JsonConvert.DeserializeObject<PlayerConfiguration>(configuration.JsonData) ?? new PlayerConfiguration();
            }

            await LoadPlayerViewModel();

            return PartialView(playerViewModel);
        }

        public async Task UpdateConfiguration(PlayerConfiguration playerConfiguration)
        {
            if (ModelState.IsValid)
            {
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Player));

                if (configuration == null)
                {
                    configuration = new Configuration() { Type = nameof(MediaPages.Player), JsonData = JsonConvert.SerializeObject(playerConfiguration) };
                    await dataService.Insert(configuration);
                }
                else
                {
                    configuration.JsonData = JsonConvert.SerializeObject(playerConfiguration);
                    await dataService.Update(configuration);
                }
            }
        }

#if !DEBUG
        [CompressContent]
#endif
        public async Task<IActionResult> GetPlayerItems()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Player));

            if (configuration != null)
            {
                playerViewModel.Configuration = JsonConvert.DeserializeObject<PlayerConfiguration>(configuration.JsonData) ?? new PlayerConfiguration();
            }

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

        public async Task UpdateNowPlaying(string itemsJSON, MediaTypes mediaType)
        {
            var items = JsonConvert.DeserializeObject<IEnumerable<ListItem<int, int>>>(itemsJSON);
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Player));
            PlayerConfiguration playerConfiguration = new PlayerConfiguration();

            if (configuration == null)
            {
                configuration = new Configuration() { Type = nameof(MediaPages.Player), JsonData = JsonConvert.SerializeObject(playerConfiguration) };
                await dataService.Insert(configuration);
            }
            else
            {
                playerConfiguration = JsonConvert.DeserializeObject<PlayerConfiguration>(configuration.JsonData) ?? new PlayerConfiguration();
            }

            playerConfiguration.CurrentItemIndex = items.FirstOrDefault((item) => item.IsSelected)?.Id ?? 0;
            playerConfiguration.SelectedMediaType = mediaType;
            configuration.JsonData = JsonConvert.SerializeObject(playerConfiguration);
            await dataService.Update(configuration);
            if (items != null) /*then*/ playerService.UpdateNowPlaying(items, mediaType);
        }

        public async Task ClearNowPlaying()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Player));
            PlayerConfiguration playerConfiguration = null;

            if (configuration != null)
            {
                playerConfiguration = JsonConvert.DeserializeObject<PlayerConfiguration>(configuration.JsonData) ?? new PlayerConfiguration();
                playerService.ClearNowPlaying(playerConfiguration.SelectedMediaType);
            }
        }

        public async Task UpdatePlayCount(MediaTypes mediaType, int id)
        {
            await playerService.UpdatePlayCount(id, mediaType);
        }

        public async Task<IActionResult> PlayerConfiguration()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Player));

            if (configuration != null)
            {
                playerViewModel.Configuration = JsonConvert.DeserializeObject<PlayerConfiguration>(configuration.JsonData) ?? new PlayerConfiguration();
            }

            return Json(playerViewModel.Configuration, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }

        public async Task UpdatePlayerProgress(int id, MediaTypes mediaType, int progress)
        {
            await playerService.UpdatePlayerProgress(id, mediaType, progress);
        }
    }
}