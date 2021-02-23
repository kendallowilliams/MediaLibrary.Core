using Fody;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.Shared.Services;
using MediaLibrary.Shared.Services.Interfaces;
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
            Program program = new Program();

            await program.Run();
        }

        public async Task Run()
        {
            string dllPath = Path.GetDirectoryName(typeof(Program).Assembly.Location);

            using (IMefService mefService = new MefService(dllPath))
            {
                IProcessorService processorService = mefService.GetExportedValue<IProcessorService>();

                await Task.WhenAll(processorService.RefreshMusic(), processorService.RefreshPodcasts(), processorService.PerformCleanup());
            }
        }
    }
}
