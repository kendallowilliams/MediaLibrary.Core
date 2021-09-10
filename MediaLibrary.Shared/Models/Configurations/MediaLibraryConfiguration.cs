using MediaLibrary.Shared.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.Shared.Models.Configurations
{
    public class MediaLibraryConfiguration : BaseConfiguration
    {
        public MediaLibraryConfiguration()
        {
            SelectedMediaPage = MediaPages.Home;
            NavBarTimeOut = 3;
        }

        public MediaPages SelectedMediaPage { get; set; }

        public AppWidth AppWidth { get; set; }

        public byte NavBarTimeOut { get; set; }
    }
}