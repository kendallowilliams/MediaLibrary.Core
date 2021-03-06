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
    public class HomeController : BaseController
    {
        private readonly HomeViewModel homeViewModel;
        private readonly Lazy<ITransactionService> lazyTransactionService;
        private readonly Lazy<IDataService> lazyDataService;
        private ITransactionService transactionService => lazyTransactionService.Value;
        private IDataService dataService => lazyDataService.Value;

        public HomeController(IMefService mefService)
        {
            this.homeViewModel = mefService.GetExportedValue<HomeViewModel>();
            this.lazyTransactionService = mefService.GetExport<ITransactionService>();
            this.lazyDataService = mefService.GetExport<IDataService>();
        }

        public IActionResult Index()
        {
            return PartialView(homeViewModel);
        }

        public async Task<IActionResult> HomeConfiguration()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Home));

            if (configuration != null)
            {
                homeViewModel.Configuration = JsonConvert.DeserializeObject<HomeConfiguration>(configuration.JsonData) ?? new HomeConfiguration();
            }

            return Json(homeViewModel.Configuration, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }
    }
}