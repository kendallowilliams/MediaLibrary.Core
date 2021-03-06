using MediaLibrary.BLL.Models;
using MediaLibrary.BLL.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Repositories
{
    public static class TelevisionRepository
    {
        public static IEnumerable<IListItem<object, SeriesSort>> GetSeriesSortItems()
        {
            yield return new ListItem<object, SeriesSort>(null, "A to Z", SeriesSort.AtoZ);
        }
    }
}