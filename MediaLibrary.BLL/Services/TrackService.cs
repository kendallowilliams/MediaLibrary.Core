using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services
{
    public class TrackService : ITrackService
    {
        private readonly IDataService dataService;

        public TrackService(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<int?> AddPath(string location, CancellationToken token = default)
        {

            int? id = default(int?);

            if (!string.IsNullOrWhiteSpace(location))
            {
                object parameters = new { location };
                TrackPath path = new TrackPath(location),
                          dbPath = await dataService.Get<TrackPath>(item => item.Location.Trim() == location.Trim(), token);

                if (dbPath != null) { id = dbPath.Id; }
                else
                {
                    await dataService.Insert(path, token);
                    id = path.Id;
                }
            }

            return id;
        }
    }
}