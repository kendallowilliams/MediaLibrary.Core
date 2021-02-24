using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.WebUI.Models;
using MediaLibrary.WebUI.Models.Configurations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.DAL.Enums;
using static MediaLibrary.WebUI.UIEnums;

namespace MediaLibrary.WebUI.Controllers
{
    public class MediaLibraryController : BaseController
    {
        private readonly Lazy<MediaLibraryViewModel> lazyMediaLibraryViewModel;
        private readonly Lazy<IDataService> lazyDataService;
        private readonly Lazy<ILogService> lazyLogService;
        private MediaLibraryViewModel mediaLibraryViewModel => lazyMediaLibraryViewModel.Value;
        private IDataService dataService => lazyDataService.Value;
        private ILogService logService => lazyLogService.Value;

        public MediaLibraryController(IMefService mefService)
        {
            this.lazyMediaLibraryViewModel = mefService.GetExport<MediaLibraryViewModel>();
            this.lazyDataService = mefService.GetExport<IDataService>();
            this.lazyLogService = mefService.GetExport<ILogService>();
        }

        public async Task<IActionResult> Index()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaLibraryController).Replace(nameof(Controller), string.Empty));

            if (configuration != null)
            {
                mediaLibraryViewModel.Configuration = JsonConvert.DeserializeObject<MediaLibraryConfiguration>(configuration.JsonData) ?? new MediaLibraryConfiguration();
            }

            mediaLibraryViewModel.Playlists = await dataService.GetList<Playlist>();

            return View(mediaLibraryViewModel);
        }

        public async Task<IActionResult> UpdateConfiguration(MediaLibraryConfiguration mediaLibraryConfiguration)
        {
            if (ModelState.IsValid)
            {
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaLibraryController).Replace(nameof(Controller), string.Empty));

                if (configuration == null)
                {
                    configuration = new Configuration()
                    {
                        Type = nameof(MediaLibraryController).Replace(nameof(Controller), string.Empty),
                        JsonData = JsonConvert.SerializeObject(mediaLibraryConfiguration)
                    };
                    await dataService.Insert(configuration);
                }
                else
                {
                    configuration.JsonData = JsonConvert.SerializeObject(mediaLibraryConfiguration);
                    await dataService.Update(configuration);
                }
            }

            return NoContent();
        }

        public async Task<IActionResult> MediaLibraryConfiguration()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaLibraryController).Replace(nameof(Controller), string.Empty));

            if (configuration != null)
            {
                mediaLibraryViewModel.Configuration = JsonConvert.DeserializeObject<MediaLibraryConfiguration>(configuration.JsonData) ?? new MediaLibraryConfiguration();
            }

            return Json(mediaLibraryViewModel.Configuration, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }

        public async Task Log(TransactionTypes transactionType, string message) => await logService.Log(transactionType, message);
    }
}