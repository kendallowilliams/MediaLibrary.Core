﻿using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.Shared.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaLibrary.DAL.Models
{
    public partial class TrackPath: IDataModel, ITrackPath
    {
        public TrackPath(string location) : base()
        {
            Location = location;
            LastScanDate = DateTime.Now;
        }
    }
}
