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
            NavBarDelay = 3;
        }

        public MediaPages SelectedMediaPage { get; set; }

        public AppWidth AppWidth { get; set; }

        public byte NavBarDelay { get; set; }

        public bool TooltipsEnabled { get;set; }

        public byte SettingsDelay { get; set; }

        public bool KeysEnabled { get; set; }
    }
}