﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaLibrary.WebUI.Controllers
{
#if !DEBUG && !DEV
    [Authorize]
#endif
    public abstract class BaseController : Controller
    {
    }
}