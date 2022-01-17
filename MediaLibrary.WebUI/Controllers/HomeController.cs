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
        private readonly ITransactionService transactionService;
        private readonly IDataService dataService;

        public HomeController(HomeViewModel homeViewModel, ITransactionService transactionService, IDataService dataService)
        {
            this.homeViewModel = homeViewModel;
            this.transactionService = transactionService;
            this.dataService = dataService;
        }

        public IActionResult Index()
        {
            return PartialView(homeViewModel);
        }

        public async Task<IActionResult> HomeConfiguration()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Home);

            homeViewModel.Configuration = configuration?.GetConfigurationObject<HomeConfiguration>() ?? new HomeConfiguration();

            return Json(homeViewModel.Configuration, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }
    }
}