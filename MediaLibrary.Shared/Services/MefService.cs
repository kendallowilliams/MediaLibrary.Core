using MediaLibrary.Shared.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.ComponentModel.Composition.Hosting;
using System.Text;

namespace MediaLibrary.Shared.Services
{
    public class MefService : IMefService
    {
        private readonly CompositionContainer container;

        public MefService(string path, IConfiguration configuration, IMemoryCache memoryCache)
        {
            DirectoryCatalog catalog = new DirectoryCatalog(path);

            container = new CompositionContainer(catalog);
            container.ComposeExportedValue(configuration);
            container.ComposeExportedValue(memoryCache);
        }

        public Lazy<T> GetExport<T>()
        {
            return container.GetExport<T>();
        }

        public T GetExportedValue<T>()
        {
            return container.GetExportedValue<T>();
        }

        public void Dispose()
        {
            container?.Dispose();
        }
    }
}
