using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.WebUI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace MediaLibrary.WebUI.ViewComponents
{
    public class SettingsViewComponent : ViewComponent
    {
        private readonly SettingsViewModel settingsViewModel;
        private readonly ITransactionService transactionService;
        private readonly IDataService dataService;

        public SettingsViewComponent(SettingsViewModel settingsViewModel, ITransactionService transactionService, IDataService dataService)
        {
            this.settingsViewModel = settingsViewModel;
            this.transactionService = transactionService;
            this.dataService = dataService;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            await LoadConfigurations();

            return View(settingsViewModel);
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
