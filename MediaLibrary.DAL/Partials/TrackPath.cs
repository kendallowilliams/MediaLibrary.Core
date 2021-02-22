using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.DAL.Enums;

namespace MediaLibrary.DAL.Models
{
    public partial class TrackPath: IDataModel
    {
        public TrackPath(string location) : base()
        {
            Location = location;
            LastScanDate = DateTime.Now;
        }
    }
}
