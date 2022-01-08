using MediaLibrary.BLL.Extensions;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.Shared.Services;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.WebUI.HostedServices;
using MediaLibrary.WebUI.Models;
using MediaLibrary.WebUI.Services;
using MediaLibrary.WebUI.Services.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MediaLibrary.WebUI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();
            services.AddHostedService<BackgroundQueueHostedService>();
            services.AddMemoryCache();
            services.ConfigureServices(Configuration);
            services.AddScoped<HomeViewModel>();
            services.AddScoped<MediaLibraryViewModel>();
            services.AddScoped<MusicViewModel>();
            services.AddScoped<PlayerViewModel>();
            services.AddScoped<PlaylistViewModel>();
            services.AddScoped<PodcastViewModel>();
            services.AddScoped<SettingsViewModel>();
            services.AddScoped<TelevisionViewModel>();
            services.AddSingleton<IMusicUIService, MusicUIService>();
            services.AddSingleton<IPlayerUIService, PlayerUIService>();
            services.AddSingleton<IPlaylistUIService, PlaylistUIService>();
            services.AddSingleton<IPodcastUIService, PodcastUIService>();
            services.AddSingleton<ITelevisionUIService, TelevisionUIService>();
            services.AddSingleton(typeof(IBackgroundTaskQueueService), typeof(BackgroundTaskQueueService)); 
            services.AddAuthentication(IISDefaults.AuthenticationScheme);
            services.AddAuthorization();
            services.AddResponseCompression();
            services.AddRazorPages().AddRazorRuntimeCompilation();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseExceptionHandler(exceptionHandler =>
            {
                exceptionHandler.Run(async context =>
                {
                    var exceptionHandlerFeature = context.Features.Get<IExceptionHandlerFeature>();
                    var logService = context.RequestServices.GetService<ILogService>();

                    await logService.Error(exceptionHandlerFeature.Error);

                });
            });
            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseResponseCompression();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=MediaLibrary}/{action=Index}/{id?}");
            });
        }
    }
}
