using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.WebUI.Models;
using MediaLibrary.WebUI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;
using IO_File = System.IO.File;

namespace MediaLibrary.WebUI.Controllers
{
    public class TelevisionController : BaseController
    {
        private readonly ITelevisionUIService televisionService;
        private readonly IDataService dataService;
        private readonly TelevisionViewModel televisionViewModel;
        private readonly ILogService logService;
        private readonly IFileService fileService;

        public TelevisionController(ITelevisionUIService televisionService, IDataService dataService, TelevisionViewModel televisionViewModel,
                                    ILogService logService, IFileService fileService)
        {
            this.televisionService = televisionService;
            this.dataService = dataService;
            this.televisionViewModel = televisionViewModel;
            this.logService = logService;
            this.fileService = fileService;
        }

        public async Task<IActionResult> Index()
        {
            IActionResult result = null;
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Television);

            televisionViewModel.Configuration = configuration?.GetConfigurationObject<TelevisionConfiguration>() ?? new TelevisionConfiguration();

            if (televisionViewModel.Configuration.SelectedTelevisionPage == TelevisionPages.Series &&
                await dataService.Exists<Series>(item => item.Id == televisionViewModel.Configuration.SelectedSeriesId))
            {
                result = await Get(televisionViewModel.Configuration.SelectedSeriesId);
            }
            else
            {
                televisionViewModel.SeriesGroups = await televisionService.GetSeriesGroups(televisionViewModel.Configuration.SelectedSeriesSort);
                result = PartialView(televisionViewModel);
            }

            return result;
        }

        private async Task<IActionResult> Get(int id)
        {
            televisionViewModel.SelectedSeries = await dataService.Get<Series>(item => item.Id == id, default, item => item.Episodes);

            return PartialView("Series", televisionViewModel);
        }

        public async Task<IActionResult> GetSeriesOptions(int id)
        {
            var series = await dataService.Get<Series>(item => item.Id == id, default, item => item.Episodes);

            return PartialView("Controls/SeriesOptions", series);
        }

        public async Task<IActionResult> UpdateConfiguration([FromBody] TelevisionConfiguration televisionConfiguration)
        {
            if (ModelState.IsValid)
            {
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Television);

                if (configuration == null)
                {
                    configuration = new Configuration() { Type = ConfigurationTypes.Television };
                    configuration.SetConfigurationObject(televisionConfiguration);
                    await dataService.Insert(configuration);
                }
                else
                {
                    var existingTVConfiguration = configuration.GetConfigurationObject<TelevisionConfiguration>();

                    if (!fileService.CanUseDirectory(televisionConfiguration.FilePath)) /*then*/ televisionConfiguration.FilePath = existingTVConfiguration.FilePath;
                    else /*then*/ televisionConfiguration.FilePath = new System.IO.DirectoryInfo(televisionConfiguration.FilePath).FullName;
                    configuration.SetConfigurationObject(televisionConfiguration);
                    await dataService.Update(configuration);
                }
            }

            return NoContent();
        }

        [AllowAnonymous]
        public async Task<IActionResult> File(int id)
        {
            var configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Television)
                                                 .ContinueWith(t => t.Result.GetConfigurationObject<TelevisionConfiguration>());
            Episode episode = await dataService.Get<Episode>(item => item.Id == id);
            IActionResult result = null;
            string filePath = System.IO.Path.Combine(configuration.FilePath, episode?.Path);

            if (IO_File.Exists(filePath))
            {
                FileExtensionContentTypeProvider contentTypeProvider = new FileExtensionContentTypeProvider();

                contentTypeProvider.TryGetContentType(filePath, out string contentType);
                result = File(IO_File.OpenRead(filePath), contentType, true);
            }
            else
            {
                result = new StatusCodeResult((int)HttpStatusCode.NotFound);
                await logService.Warn($"{nameof(TelevisionController)} -> {nameof(File)} -> Path: {filePath} -> Not Found");
            }

            return result;
        }

        public async Task<IActionResult> GetSeason(int series, int season)
        {
            IEnumerable<Episode> episodes = await dataService.GetList<Episode>(item => item.SeriesId == series && item.Season == season);
            bool hasPlaylists = await dataService.Exists<Playlist>(item => item.Type == PlaylistTypes.Television);

            return PartialView("Season", (hasPlaylists, episodes));
        }

        [AllowAnonymous]
        public async Task<IActionResult> GetM3UPlaylist(int seriesId, int season)
        {
            IEnumerable<Episode> episodes = await dataService.GetList<Episode>(episode => episode.SeriesId == seriesId && episode.Season == season);
            string path = $"{Request.Scheme}://{Request.Host}{Request.PathBase}";
            IEnumerable<string> lines = episodes.Select(episode => $"#EXTINF:0,{episode.Title}{Environment.NewLine}{$"{path}/Television/File/{episode.Id}"}");
            Series series = await dataService.Get<Series>(item => item.Id == seriesId);
            string data = $"#EXTM3U{Environment.NewLine}{string.Join(Environment.NewLine, lines)}";
            byte[] content = Encoding.UTF8.GetBytes(data);
            string timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");

            return File(content, "audio/mpegurl", $"{series.Title.Trim()}_S{season}_{timestamp}.m3u");
        }

        public async Task<IActionResult> TelevisionConfiguration()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Television);

            televisionViewModel.Configuration = configuration?.GetConfigurationObject<TelevisionConfiguration>() ?? new TelevisionConfiguration();

            return Json(televisionViewModel.Configuration, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }

        public async Task AddEpisodeToPlaylist(int itemId, int playlistId)
        {
            PlaylistEpisode item = new PlaylistEpisode() { PlaylistId = playlistId, EpisodeId = itemId };

            try
            {
                await dataService.Insert(item);
            }
            catch (Exception ex)
            {
                await logService.Error(ex);
            }
        }

        public async Task Refresh()
        {
            await dataService.Execute("EXEC spAddDefaultSeries")
                .ContinueWith(t => televisionService.ClearData());
        }
    }
}