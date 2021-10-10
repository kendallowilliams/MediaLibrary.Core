using MediaLibrary.Shared.Models;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.WebUI.Models;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.WebUI.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.StaticFiles;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using IO_File = System.IO.File;
using System.Linq;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Controllers
{
    public class TelevisionController : BaseController
    {
        private readonly ITelevisionUIService televisionService;
        private readonly IDataService dataService;
        private readonly TelevisionViewModel televisionViewModel;
        private readonly ITransactionService transactionService;

        public TelevisionController(ITelevisionUIService televisionService, IDataService dataService, TelevisionViewModel televisionViewModel,
                                    ITransactionService transactionService)
        {
            this.televisionService = televisionService;
            this.dataService = dataService;
            this.televisionViewModel = televisionViewModel;
            this.transactionService = transactionService;
        }

        public async Task<IActionResult> Index()
        {
            IActionResult result = null;
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Television));

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

        public async Task<IActionResult> UpdateConfiguration([FromBody] TelevisionConfiguration televisionConfiguration)
        {
            if (ModelState.IsValid)
            {
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Television));

                if (configuration == null)
                {
                    configuration = new Configuration() { Type = nameof(MediaPages.Television), JsonData = JsonConvert.SerializeObject(televisionConfiguration) };
                    await dataService.Insert(configuration);
                }
                else
                {
                    configuration.JsonData = JsonConvert.SerializeObject(televisionConfiguration);
                    await dataService.Update(configuration);
                }
            }

            return NoContent();
        }

#if !DEBUG && !DEV
        [AllowAnonymous]
#endif
        public async Task<IActionResult> File(int id)
        {
            Episode episode = await dataService.Get<Episode>(item => item.Id == id);
            IActionResult result = null;

            if (episode != null)
            {
                FileExtensionContentTypeProvider contentTypeProvider = new FileExtensionContentTypeProvider();

                contentTypeProvider.TryGetContentType(episode.Path, out string contentType);
                result = File(IO_File.OpenRead(episode.Path), contentType, true);
            }
            else
            {
                result = new StatusCodeResult((int)HttpStatusCode.NotFound);
            }

            return result;
        }

        public async Task<IActionResult> GetSeason(int series, int season)
        {
            IEnumerable<Episode> episodes = await dataService.GetList<Episode>(item => item.SeriesId == series && item.Season == season);
            bool hasPlaylists = await dataService.Exists<Playlist>(item => item.Type == (int)PlaylistTabs.Television);

            return PartialView("Season", (hasPlaylists, episodes));
        }

#if !DEBUG && !DEV
        [AllowAnonymous]
#endif
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
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Television));

            televisionViewModel.Configuration = configuration?.GetConfigurationObject<TelevisionConfiguration>() ?? new TelevisionConfiguration();

            return Json(televisionViewModel.Configuration, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }

        public async Task AddEpisodeToPlaylist(int itemId, int playlistId)
        {
            PlaylistEpisode item = new PlaylistEpisode() { PlaylistId = playlistId, EpisodeId = itemId };
            Transaction transaction = null;

            try
            {
                transaction = await transactionService.GetNewTransaction(TransactionTypes.AddPlaylistEpisode);
                await dataService.Insert(item);
                await transactionService.UpdateTransactionCompleted(transaction, $"Playlist: {playlistId}, Track: {itemId}");
            }
            catch (Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }
        }
    }
}