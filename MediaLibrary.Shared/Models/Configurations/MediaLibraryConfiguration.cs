using System;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.Shared.Models.Configurations
{
    public class MediaLibraryConfiguration : BaseConfiguration
    {
        public MediaLibraryConfiguration()
        {
            SelectedMediaPage = MediaPages.Home;
            NavBarDelay = 3;
            ConsoleAppRunInterval = 5;
            ConsoleAppLastRunTimeStamp = DateTime.MinValue.Date;
        }

        public MediaPages SelectedMediaPage { get; set; }

        public AppWidth AppWidth { get; set; }

        public bool DarkMode { get; set; }

        public byte NavBarDelay { get; set; }

        public bool TooltipsEnabled { get; set; }

        public byte SettingsDelay { get; set; }

        public bool KeysEnabled { get; set; }

        public int ConsoleAppRunInterval { get; set; }

        public DateTime ConsoleAppLastRunTimeStamp { get; set; }
    }
}