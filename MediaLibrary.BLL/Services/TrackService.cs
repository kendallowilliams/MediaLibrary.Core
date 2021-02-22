using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Fody;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using System.Linq.Expressions;
using MediaLibrary.DAL.Models;

namespace MediaLibrary.BLL.Services
{
    [ConfigureAwait(false)]
    [Export(typeof(ITrackService))]
    public class TrackService : ITrackService
    {
        private readonly IDataService dataService;

         [ImportingConstructor]
        public TrackService(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<int?> AddPath(string location)
        {

            int? id = default(int?);

            if (!string.IsNullOrWhiteSpace(location))
            {
                object parameters = new { location };
                TrackPath path = new TrackPath(location),
                          dbPath = await dataService.Get<TrackPath>(item => item.Location.Trim() == location.Trim());

                if (dbPath != null) { id = dbPath.Id; }
                else
                {
                    await dataService.Insert(path);
                    id = path.Id;
                }
            }

            return id;
        }
    }
}