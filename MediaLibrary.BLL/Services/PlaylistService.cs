using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using System.Linq.Expressions;
using MediaLibrary.DAL.DbContexts;

namespace MediaLibrary.BLL.Services
{
    public class PlaylistService : IPlaylistService
    {
        private readonly IDataService dataService;

        public PlaylistService(IDataService dataService)
        {
            this.dataService = dataService;
        }
    }
}