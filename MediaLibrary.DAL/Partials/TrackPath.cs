using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.Shared.Models.Interfaces;
using System;

namespace MediaLibrary.DAL.Models
{
    public partial class TrackPath : IDataModel, ITrackPath
    {
        public TrackPath(string location) : base()
        {
            Location = location;
            LastScanDate = DateTime.Now;
        }
    }
}
