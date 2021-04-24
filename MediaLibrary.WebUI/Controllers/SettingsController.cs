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
using System.Reflection;

namespace MediaLibrary.WebUI.Controllers
{
    public class SettingsController : BaseController
    {
        private readonly SettingsViewModel settingsViewModel;
        private readonly Lazy<ITransactionService> lazyTransactionService;
        private readonly Lazy<IDataService> lazyDataService;
        private ITransactionService transactionService => lazyTransactionService.Value;
        private IDataService dataService => lazyDataService.Value;

        public SettingsController(IMefService mefService)
        {
            this.settingsViewModel = mefService.GetExportedValue<SettingsViewModel>();
            this.lazyTransactionService = mefService.GetExport<ITransactionService>();
            this.lazyDataService = mefService.GetExport<IDataService>();
        }

        public async Task<IActionResult> Index(SettingsTabs? tab)
        {
            await LoadConfigurations();
            if (tab.HasValue) /*then*/ settingsViewModel.CurrentSettingsTab = tab.Value;

            return PartialView(settingsViewModel);
        }

        private async Task LoadConfigurations()
        {
            IEnumerable<Configuration> configurations = await dataService.GetList<Configuration>();
            PropertyInfo[] properties = typeof(SettingsViewModel).GetProperties();

            settingsViewModel.MediaLibraryConfiguration = new MediaLibraryConfiguration();
            settingsViewModel.HomeConfiguration = new HomeConfiguration();
            settingsViewModel.MusicConfiguration = new MusicConfiguration();
            settingsViewModel.PlayerConfiguration = new PlayerConfiguration();
            settingsViewModel.PlaylistConfiguration = new PlaylistConfiguration();
            settingsViewModel.PodcastConfiguration = new PodcastConfiguration();
            settingsViewModel.TelevisionConfiguration = new TelevisionConfiguration();

            foreach (var configuration in configurations)
            {
                PropertyInfo property = properties.FirstOrDefault(item => item.Name.Equals($"{configuration.Type}Configuration", StringComparison.OrdinalIgnoreCase));

                if (property != null)
                {
                    object configurationObject = configuration.GetConfigurationObject(property.PropertyType);
                    
                    if (configurationObject != null)
                    {
                        property.SetValue(settingsViewModel, configurationObject);
                    }
                }
            }
        }
    }
}