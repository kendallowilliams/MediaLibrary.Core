using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Fody;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using System.Linq.Expressions;
using MediaLibrary.DAL.DbContexts;

namespace MediaLibrary.BLL.Services
{
    [ConfigureAwait(false)]
    [Export(typeof(IPlaylistService))]
    public class PlaylistService : IPlaylistService
    {
        private readonly IDataService dataService;

        [ImportingConstructor]
        public PlaylistService(IDataService dataService)
        {
            this.dataService = dataService;
        }
    }
}