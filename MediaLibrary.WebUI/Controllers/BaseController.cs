using Microsoft.AspNetCore.Mvc;

namespace MediaLibrary.WebUI.Controllers
{
#if !DEBUG
    [Authorize]
#endif
    public abstract class BaseController : Controller
    {
    }
}