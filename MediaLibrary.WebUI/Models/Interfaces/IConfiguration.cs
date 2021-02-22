using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using static MediaLibrary.WebUI.UIEnums;

namespace MediaLibrary.WebUI.Models.Interfaces
{
    public interface IConfiguration
    {
        int ScrollTop { get; set; }
    }
}