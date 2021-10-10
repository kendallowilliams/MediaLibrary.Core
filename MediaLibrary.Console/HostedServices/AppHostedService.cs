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
        private readonly IHostApplicationLifetime appLifetime;
        private readonly IProcessorService processorService;

        public AppHostedService(IProcessorService processorService, IHostApplicationLifetime appLifetime)
        {
            this.appLifetime = appLifetime;
            this.processorService = processorService;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            await Task.WhenAll(processorService.RefreshMusic(), processorService.RefreshPodcasts(), processorService.PerformCleanup());
            appLifetime.StopApplication();
        }

        public async Task StopAsync(CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }
    }
}
