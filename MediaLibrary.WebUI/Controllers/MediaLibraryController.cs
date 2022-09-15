using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.WebUI.Models;
using MediaLibrary.Shared.Models.Configurations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Controllers
{
    public class MediaLibraryController : BaseController
    {
        private MediaLibraryViewModel mediaLibraryViewModel;
        private readonly IDataService dataService;
        private readonly ILogService logService;

        public MediaLibraryController(MediaLibraryViewModel mediaLibraryViewModel, IDataService dataService, ILogService logService)
        {
            this.mediaLibraryViewModel = mediaLibraryViewModel;
            this.dataService = dataService;
            this.logService = logService;
        }

        public async Task<IActionResult> Index()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.MediaLibrary);

            mediaLibraryViewModel.Configuration = configuration?.GetConfigurationObject<MediaLibraryConfiguration>() ?? new MediaLibraryConfiguration();

            return View(mediaLibraryViewModel);
        }

        public async Task<IActionResult> UpdateConfiguration([FromBody] MediaLibraryConfiguration mediaLibraryConfiguration)
        {
            if (ModelState.IsValid)
            {
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.MediaLibrary);

                if (configuration == null)
                {
                    configuration = new Configuration() { Type = ConfigurationTypes.MediaLibrary };
                    configuration.SetConfigurationObject(mediaLibraryConfiguration);
                    await dataService.Insert(configuration);
                }
                else
                {
                    var savedMediaLibraryConfiguration = configuration.GetConfigurationObject<MediaLibraryConfiguration>();

                    mediaLibraryConfiguration.ConsoleAppLastRunTimeStamp = savedMediaLibraryConfiguration.ConsoleAppLastRunTimeStamp;
                    configuration.SetConfigurationObject(mediaLibraryConfiguration);
                    await dataService.Update(configuration);
                }
            }

            return NoContent();
        }

        public async Task<IActionResult> MediaLibraryConfiguration()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.MediaLibrary);

            mediaLibraryViewModel.Configuration = configuration?.GetConfigurationObject<MediaLibraryConfiguration>() ?? new MediaLibraryConfiguration();

            return Json(mediaLibraryViewModel.Configuration, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }
    }
}