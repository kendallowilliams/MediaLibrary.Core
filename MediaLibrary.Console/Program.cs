using Fody;
using MediaLibrary.BLL.Extensions;
using MediaLibrary.Console.HostedServices;
using MediaLibrary.Shared.Services;
using MediaLibrary.Shared.Services.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.IO;
using System.Threading.Tasks;

namespace MediaLibrary.Console
{
    [ConfigureAwait(false)]
    class Program
    {
        static async Task Main(string[] args)
        {
            await Host.CreateDefaultBuilder(args)
                      .ConfigureServices((context, services) => 
                      {
                          services.AddMemoryCache();
                          services.AddHostedService<AppHostedService>();
                          services.ConfigureServices();
                      })
                      .Build()
                      .RunAsync();
        }
    }
}
