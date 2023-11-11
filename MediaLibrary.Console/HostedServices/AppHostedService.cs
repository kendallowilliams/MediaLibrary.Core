using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.Shared.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.Console.HostedServices
{
    public class AppHostedService : IHostedService
    {
        private readonly IProcessorService processorService;
        private readonly ILogService logService;
        private readonly IDataService dataService;

        public AppHostedService(IProcessorService processorService, ILogService logService, IDataService dataService)
        {
            this.processorService = processorService;
            this.logService = logService;
            this.dataService = dataService;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            Trace.WriteLine($"{nameof(StartAsync)}: Started...");
            await Task.WhenAll(processorService.MonitorMusicPaths(cancellationToken), RepeatAsync(cancellationToken));
            Trace.WriteLine($"{nameof(StartAsync)}: Finished.");
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }

        private async Task RepeatAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var config = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.MediaLibrary);
                var mediaLibraryConfig = config.GetConfigurationObject<MediaLibraryConfiguration>();
                var tasksToRun = new List<Func<Task>>()
                {
                    () => processorService.RefreshMusic(),
                    () => processorService.RefreshPodcasts(),
                    () => processorService.PerformCleanup()
                };
                DateTime nextRunTime = mediaLibraryConfig.ConsoleAppLastRunTimeStamp.AddMinutes(mediaLibraryConfig.ConsoleAppRunInterval),
                         dtNow = DateTime.Now;

                dtNow = dtNow.AddMilliseconds(-dtNow.Millisecond);
                nextRunTime = nextRunTime.AddMilliseconds(-nextRunTime.Millisecond);
                Trace.WriteLine($"{nameof(RepeatAsync)}: Now [{dtNow}], Next [{nextRunTime}]");

                if (Math.Floor(nextRunTime.Subtract(dtNow).TotalSeconds) <= 0.0)
                {
                    mediaLibraryConfig.ConsoleAppLastRunTimeStamp = dtNow;
                    config.SetConfigurationObject(mediaLibraryConfig);
                    tasksToRun.Add(() => dataService.Update(config));

                    await Task.WhenAll(tasksToRun.Select(task => task()));
                }
                else
                {
                    int delayMs = (nextRunTime.Subtract(dtNow).Minutes * 60 + nextRunTime.Subtract(dtNow).Seconds) * 1000;

                    Trace.WriteLine($"{nameof(RepeatAsync)}: Delay started: {delayMs} milliseconds...");
                    await Task.Delay(delayMs);
                    Trace.WriteLine($"{nameof(RepeatAsync)}: Delay completed.");
                }
            }
        }
    }
}
