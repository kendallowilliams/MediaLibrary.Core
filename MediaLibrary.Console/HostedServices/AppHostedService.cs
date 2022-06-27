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
            while (true) /*then*/ await RunAsync();
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }

        private async Task RunAsync()
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
            Trace.WriteLine($"{nameof(RunAsync)}: Now [{dtNow}], Next [{nextRunTime}]");

            if (Math.Floor(nextRunTime.Subtract(dtNow).TotalSeconds) <= 0.0)
            {
                mediaLibraryConfig.ConsoleAppLastRunTimeStamp = dtNow;
                config.JsonData = JsonConvert.SerializeObject(mediaLibraryConfig);
                ;
                tasksToRun.Add(() => dataService.Update(config));

                Trace.WriteLine($"{nameof(RunAsync)}: Started...");
                await Task.WhenAll(tasksToRun.Select(task => task()));
                Trace.WriteLine($"{nameof(RunAsync)}: Finished.");
            }
            else
            {
                int delayMs = (nextRunTime.Subtract(dtNow).Minutes * 60 + nextRunTime.Subtract(dtNow).Seconds) * 1000;

                Trace.WriteLine($"{nameof(RunAsync)}: Delay started: {delayMs} milliseconds...");
                await Task.Delay(delayMs);
                Trace.WriteLine($"{nameof(RunAsync)}: Delay completed.");
            }
        }
    }
}
