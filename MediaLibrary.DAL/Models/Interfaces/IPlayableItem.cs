using System;

namespace MediaLibrary.DAL.Models.Interfaces
{
    public interface IPlayableItem : IDataModel
    {
        int PlayCount { get; }
        DateTime? LastPlayedDate { get; }
    }
}