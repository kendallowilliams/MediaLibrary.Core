using MediaLibrary.DAL.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Services.Interfaces
{
    public interface ITelevisionUIService
    {
        Task<IEnumerable<IGrouping<string, Series>>> GetSeriesGroups(SeriesSort sort);
        void ClearData();
    }
}
