using MediaLibrary.DAL.Models;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IPodcastJSON
    {
        [JsonIgnore]
        ICollection<PodcastItem> PodcastItems { get; set; }
    }
}
