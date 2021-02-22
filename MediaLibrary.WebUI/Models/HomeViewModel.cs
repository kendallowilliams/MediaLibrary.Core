using MediaLibrary.WebUI.Models.Configurations;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;

namespace MediaLibrary.WebUI.Models
{
    [Export]
    public class HomeViewModel : ViewModel<HomeConfiguration>
    {
        [ImportingConstructor]
        public HomeViewModel()
        {
        }
    }
}