using MediaLibrary.Shared.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.IO;
using System.Text;
using Microsoft.Extensions.Configuration.Json;

namespace MediaLibrary.Shared.Services
{
    [Export(typeof(IConfigurationManager)), PartCreationPolicy(CreationPolicy.NonShared)]
    public class ConfigurationManager : IConfigurationManager
    {
        private readonly IConfigurationRoot appConfig;

        [ImportingConstructor]
        public ConfigurationManager()
        {
            appConfig = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
#if DEV
                                                  .AddJsonFile("appsettings.DEV.json")
#elif DEBUG
                                                  .AddJsonFile("appsettings.DEBUG.json")
#else
                                                  .AddJsonFile("appsettings.json")
#endif
                                                  .Build();
        }

        public string GetValue(string path)
        {
            return appConfig[path];
        }
    }
}
