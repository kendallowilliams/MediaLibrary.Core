using System;
using System.Collections.Generic;
using System.Text;

namespace MediaLibrary.Shared.Models.Interfaces
{
    public interface ITrackPath
    {
        int Id { get; set; }
        string Location { get; set; }
    }
}
