using System;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.Shared.Services.Interfaces
{
    public interface IBackgroundTaskQueueService
    {
        void QueueBackgroundWorkItem(Func<CancellationToken, Task> workItem);

        Task<Func<CancellationToken, Task>> DequeueAsync(CancellationToken cancellationToken);
    }
}
