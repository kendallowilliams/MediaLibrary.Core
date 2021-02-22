using System;
using System.Collections.Generic;
using System.Text;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IMefService : IDisposable
    {
        Lazy<T> GetExport<T>();

        T GetExportedValue<T>();
    }
}
