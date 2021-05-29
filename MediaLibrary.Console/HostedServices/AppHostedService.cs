using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.Shared.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.Console.HostedServices
{
    public class AppHostedService : IHostedService
    {
        private readonly IMefService mefService;
        private readonly IHostApplicationLifetime appLifetime;

        public AppHostedService(IMefService mefService, IHostApplicationLifetime appLifetime)
        {
            this.mefService = mefService;
            this.appLifetime = appLifetime;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            IProcessorService processorService = mefService.GetExportedValue<IProcessorService>();

            await Task.WhenAll(processorService.RefreshMusic(), processorService.RefreshPodcasts(), processorService.PerformCleanup());
            appLifetime.StopApplication();
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
        }
    }
}
