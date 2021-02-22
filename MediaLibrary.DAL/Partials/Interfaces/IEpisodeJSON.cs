using MediaLibrary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IEpisodeJSON
    {
        ICollection<PlaylistEpisode> PlaylistEpisodes { get; set; }
    }
}
