using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediaLibrary.DAL.Models;
using Newtonsoft.Json;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IArtistJSON
    {
        [JsonIgnore]
        ICollection<Album> Albums { get; set; }
        [JsonIgnore]
        ICollection<Track> Tracks { get; set; }
    }
}
