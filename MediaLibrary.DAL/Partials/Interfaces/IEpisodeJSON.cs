using MediaLibrary.DAL.Models;
using System.Collections.Generic;

namespace MediaLibrary.DAL.Partials.Interfaces
{
    public interface IEpisodeJSON
    {
        ICollection<PlaylistEpisode> PlaylistEpisodes { get; set; }
    }
}
