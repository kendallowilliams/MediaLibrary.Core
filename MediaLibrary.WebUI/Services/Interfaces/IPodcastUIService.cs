using MediaLibrary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.WebUI.UIEnums;

namespace MediaLibrary.WebUI.Services.Interfaces
{
    public interface IPodcastUIService
    {
        Task<IEnumerable<IGrouping<string, Podcast>>> GetPodcastGroups(PodcastSort sort);
    }
}
