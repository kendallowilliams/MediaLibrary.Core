using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.DAL.Partials.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaLibrary.DAL.Models
{
    public partial class Episode : IPlayableItem, IEpisodeJSON
    {
    }
}
