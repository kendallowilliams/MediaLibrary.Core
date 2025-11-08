using System;

namespace MediaLibrary.DAL.Models.Interfaces
{
    public interface IDataModel
    {
        int Id { get; set; }
        DateTime CreateDate { get; set; }
        DateTime ModifyDate { get; set; }
    }
}
