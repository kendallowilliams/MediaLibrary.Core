using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ML_DAL_ENUM = MediaLibrary.DAL.Enums;

namespace MediaLibrary.BLL
{
    public static class Enums
    {
        public enum MediaTypes { Song = ML_DAL_ENUM.PlaylistTypes.Music, Podcast = ML_DAL_ENUM.PlaylistTypes.Podcast, Television = ML_DAL_ENUM.PlaylistTypes.Television }
    }
}
