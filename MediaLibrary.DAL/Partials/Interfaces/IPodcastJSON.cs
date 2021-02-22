using MediaLibrary.DAL.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IPodcastJSON
    {
        [JsonIgnore]
        ICollection<PodcastItem> PodcastItems { get; set; }
    }
}
