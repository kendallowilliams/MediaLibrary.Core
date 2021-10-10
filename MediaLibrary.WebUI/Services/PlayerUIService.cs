using MediaLibrary.DAL.DbContexts;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.WebUI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.Shared.Enums;
using MediaLibrary.WebUI.Models;
using MediaLibrary.WebUI.Controllers;
using System.IO;
using Newtonsoft.Json;
using MediaLibrary.BLL.Services.Interfaces;

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