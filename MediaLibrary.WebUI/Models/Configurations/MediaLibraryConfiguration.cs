using MediaLibrary.WebUI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MediaLibrary.WebUI.UIEnums;

namespace MediaLibrary.WebUI.Models.Configurations
{
    public class MediaLibraryConfiguration : BaseConfiguration
    {
        public MediaLibraryConfiguration()
        {
            SelectedMediaPage = MediaPages.Home;
        }

        public MediaPages SelectedMediaPage { get; set; }
    }
}