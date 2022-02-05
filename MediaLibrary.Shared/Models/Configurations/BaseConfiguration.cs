using MediaLibrary.Shared.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaLibrary.Shared.Models.Configurations
{
    public abstract class BaseConfiguration : IConfiguration
    {
        public BaseConfiguration() 
        {
#if !DEBUG
            PromptBeforeUnload = true;
#endif
        }

        public int ScrollTop { get; set; }

        public bool PromptBeforeUnload { get; set; }
    }
}