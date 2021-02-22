using MediaLibrary.DAL.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MediaLibrary.DAL.Models.Interfaces
{
    public interface IPlayableItem : IDataModel
    {
        int PlayCount { get; }
        DateTime? LastPlayedDate { get; }
    }
}