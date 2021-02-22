using System;
using System.Collections.Generic;
using System.Text;

namespace MediaLibrary.Shared.Services.Interfaces
{
    public interface IConfigurationManager
    {
        string GetValue(string path);
    }
}
