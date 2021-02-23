using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaLibrary.WebUI.Controllers
{
#if !DEV && !DEBUG
    [Authorize]
#endif
    public abstract class BaseController : Controller
    {
    }
}