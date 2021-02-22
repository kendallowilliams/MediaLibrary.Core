using MediaLibrary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.WebUI.UIEnums;

namespace MediaLibrary.WebUI.Services.Interfaces
{
    public interface ITelevisionUIService
    {
        Task<IEnumerable<IGrouping<string, Series>>> GetSeriesGroups(SeriesSort sort);
    }
}
