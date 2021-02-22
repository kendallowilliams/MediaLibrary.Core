using MediaLibrary.DAL.DbContexts;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.WebUI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.WebUI.UIEnums;
using Fody;
using MediaLibrary.WebUI.Models;
using MediaLibrary.WebUI.Controllers;
using System.IO;
using Newtonsoft.Json;
using MediaLibrary.BLL.Models;
using MediaLibrary.BLL.Services.Interfaces;
using static MediaLibrary.BLL.Enums;

namespace MediaLibrary.WebUI.Services
{
    [ConfigureAwait(false)]
    [Export(typeof(IPlayerUIService))]
    public class PlayerUIService : BaseUIService, IPlayerUIService
    {
        private readonly Lazy<IDataService> lazyDataService;
        private IDataService dataService => lazyDataService.Value;

        [ImportingConstructor]
        public PlayerUIService(Lazy<IDataService> dataService) : base()
        {
            this.lazyDataService = dataService;
        }
    }
}