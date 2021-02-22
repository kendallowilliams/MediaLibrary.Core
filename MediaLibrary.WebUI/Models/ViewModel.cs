using MediaLibrary.WebUI.Models.Configurations;
using MediaLibrary.WebUI.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaLibrary.WebUI.Models
{
    public abstract class ViewModel<TConfig> : IViewModel where TConfig: new()
    {
        public ViewModel()
        {
            Configuration = new TConfig();
        }
        
        public TConfig Configuration { get; set; }
    }
}