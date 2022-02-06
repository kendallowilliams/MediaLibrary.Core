using MediaLibrary.Shared.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.Shared.Models.Configurations
{
    public class TelevisionConfiguration : BaseConfiguration
    {
        public TelevisionConfiguration()
        {
            SelectedSeason = 1;
        }

        public int SelectedSeriesId { get; set; }
        public int SelectedSeason { get; set; }
        public TelevisionPages SelectedTelevisionPage { get; set; }
        public SeriesSort SelectedSeriesSort { get; set; }
        public string FilePath { get; set; }
    }
}