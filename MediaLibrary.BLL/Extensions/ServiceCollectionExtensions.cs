using MediaLibrary.BLL.Services;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.DbContexts;
using MediaLibrary.DAL.Services;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Services;
using MediaLibrary.Shared.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using System.Net.Http.Headers;

namespace MediaLibrary.BLL.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            var httpClientHandler = new HttpClientHandler()
            {
                AutomaticDecompression = System.Net.DecompressionMethods.GZip | System.Net.DecompressionMethods.Deflate
            };

            services.AddDbContextFactory<MediaLibraryEntities>(options =>
            {
                options.UseSqlServer(configuration.GetConnectionString("MediaLibrary"));
            });
            services.AddHttpClient();
            services.AddHttpClient("DecompressionClient")
                    .ConfigureHttpClient(client =>
                    {
                        client.DefaultRequestHeaders.AcceptEncoding.Add(new StringWithQualityHeaderValue("gzip"));
                        client.DefaultRequestHeaders.AcceptEncoding.Add(new StringWithQualityHeaderValue("deflate"));
                    })
                    .ConfigurePrimaryHttpMessageHandler(() => httpClientHandler);
            services.AddTransient<ITPLService, TPLService>();
            services.AddTransient<IDataService, DataService>();
            services.AddTransient<IAlbumService, AlbumService>();
            services.AddTransient<IArtistService, ArtistService>();
            services.AddTransient<IFileService, FileService>();
            services.AddTransient<IGenreService, GenreService>();
            services.AddTransient<IId3Service, Id3Service>();
            services.AddTransient<ILogService, LogService>();
            services.AddTransient<IPlayerService, PlayerService>();
            services.AddTransient<IPlaylistService, PlaylistService>();
            services.AddTransient<IPodcastService, PodcastService>();
            services.AddTransient<ITrackService, TrackService>();
            services.AddTransient<ITransactionService, TransactionService>();
            services.AddTransient<IWebService, WebService>();
            services.AddTransient<IProcessorService, ProcessorService>();
        }
    }
}
