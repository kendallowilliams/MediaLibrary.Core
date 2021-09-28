using MediaLibrary.BLL.Services;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Services;
using MediaLibrary.Shared.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<ITPLService, TPLService>();
            services.AddScoped<IDataService, DataService>();
            services.AddScoped<IAlbumService, AlbumService>();
            services.AddScoped<IArtistService, ArtistService>();
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IGenreService, GenreService>();
            services.AddScoped<IId3Service, Id3Service>();
            services.AddScoped<ILogService, LogService>();
            services.AddScoped<IPlayerService, PlayerService>();
            services.AddScoped<IPlaylistService, PlaylistService>();
            services.AddScoped<IPodcastService, PodcastService>();
            services.AddScoped<IProcessorService, ProcessorService>();
            services.AddScoped<ITrackService, TrackService>();
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<IWebService, WebService>();
        }
    }
}
