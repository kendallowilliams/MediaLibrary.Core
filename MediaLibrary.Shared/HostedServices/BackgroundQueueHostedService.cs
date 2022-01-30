﻿using MediaLibrary.Shared.Services.Interfaces;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.Shared.HostedServices
{
    public class BackgroundQueueHostedService : BackgroundService
    {
        public BackgroundQueueHostedService(IBackgroundTaskQueueService taskQueue)
        {
            TaskQueue = taskQueue;
        }

        public IBackgroundTaskQueueService TaskQueue { get; }

        protected async override Task ExecuteAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var workItem = await TaskQueue.DequeueAsync(cancellationToken);

                try
                {
                    await workItem(cancellationToken);
                }
                catch (Exception ex)
                {
                }
            }
        }
    }
}
