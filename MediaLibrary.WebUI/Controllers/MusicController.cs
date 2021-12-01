using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.WebUI.Models;
using MediaLibrary.WebUI.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;
using static MediaLibrary.Shared.Enums;
using MediaLibrary.Shared.Models.Configurations;
using System.Web;
using System.IO;
using IO_File = System.IO.File;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Text.Json;
using Microsoft.Extensions.Configuration;
using MediaLibrary.Shared.Services.Interfaces;
using Microsoft.AspNetCore.StaticFiles;
using MediaLibrary.Shared.Models;

namespace MediaLibrary.WebUI.Controllers
{
    public class MusicController : BaseController
    {
        private readonly IBackgroundTaskQueueService backgroundTaskQueue;
        private readonly IConfiguration configuration;
        private readonly IDataService dataService;
        private readonly IMusicUIService musicService;
        private readonly MusicViewModel musicViewModel;
        private readonly ITrackService trackService;
        private readonly IFileService fileService;
        private readonly ITransactionService transactionService;

        public MusicController(IDataService dataService, IBackgroundTaskQueueService backgroundTaskQueue, IConfiguration configuration,
                               IMusicUIService musicService, MusicViewModel musicViewModel, ITrackService trackService,
                               IFileService fileService, ITransactionService transactionService)
        {
            this.dataService = dataService;
            this.musicService = musicService;
            this.musicViewModel = musicViewModel;
            this.trackService = trackService;
            this.fileService = fileService;
            this.transactionService = transactionService;
            this.configuration = configuration;
            this.backgroundTaskQueue = backgroundTaskQueue;
        }

        public async Task<IActionResult> Index()
        {
            IActionResult result = null;
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Music));

            musicViewModel.Configuration = configuration?.GetConfigurationObject<MusicConfiguration>() ?? new MusicConfiguration();
            await dataService.GetList<Playlist>().ContinueWith(task => musicViewModel.Playlists = task.Result);

            if (musicViewModel.Configuration.SelectedMusicPage == MusicPages.Album &&
                await dataService.Exists<Album>(album => album.Id == musicViewModel.Configuration.SelectedAlbumId))
            {
                result = await GetAlbum(musicViewModel.Configuration.SelectedAlbumId);
            }
            else if (musicViewModel.Configuration.SelectedMusicPage == MusicPages.Artist &&
                     await dataService.Exists<Artist>(artist => artist.Id == musicViewModel.Configuration.SelectedArtistId))
            {
                result = await GetArtist(musicViewModel.Configuration.SelectedArtistId);
            }
            else if (musicViewModel.Configuration.SelectedMusicPage == MusicPages.Search)
            {
                result = PartialView("~/Views/Music/Search.cshtml", musicViewModel);
            }
            else
            {
                Task songGroupTask = musicService.GetSongGroups(musicViewModel.Configuration.SelectedSongSort).ContinueWith(task => musicViewModel.SongGroups = task.Result),
                     albumGroupTask = musicService.GetAlbumGroups(musicViewModel.Configuration.SelectedAlbumSort).ContinueWith(task => musicViewModel.AlbumGroups = task.Result),
                     artistGroupTask = musicService.GetArtistGroups(musicViewModel.Configuration.SelectedArtistSort).ContinueWith(task => musicViewModel.ArtistGroups = task.Result),
                     songsTask = musicService.Songs().ContinueWith(task => musicViewModel.Songs = task.Result),
                     albumsTask = musicService.Albums().ContinueWith(task => musicViewModel.Albums = task.Result),
                     artistsTask = musicService.Artists().ContinueWith(task => musicViewModel.Artists = task.Result);
                
                await Task.WhenAll(songGroupTask, albumGroupTask, artistGroupTask, songsTask, albumsTask, artistsTask);
                result = PartialView(musicViewModel);
            }

            return result;
        }

        public async Task<IActionResult> GetSongGroup(string key, SongSort sort)
        {
            IGrouping<string, Track> group = default;
            bool hasPlaylists = await dataService.Exists<Playlist>(item => item.Type == (int)PlaylistTabs.Music);

            await musicService.GetSongGroups(sort).ContinueWith(task => group = task.Result.FirstOrDefault(item => item.Key == key));

            return PartialView("~/Views/Music/SongGroup.cshtml", (Group: group, PlaylistCount: hasPlaylists));
        }

#if !DEBUG && !DEV
        [AllowAnonymous]
#endif
        public async Task<IActionResult> File(int id)
        {
            Track track = await dataService.Get<Track>(item => item.Id == id, default, item => item.Path);
            IActionResult result = null;

            if (track != null && IO_File.Exists(Path.Combine(track.Path.Location, track.FileName)))
            {
                FileExtensionContentTypeProvider contentTypeProvider = new FileExtensionContentTypeProvider();
                string filePath = Path.Combine(track.Path.Location, track.FileName);

                contentTypeProvider.TryGetContentType(filePath, out string contentType);
                result = File(IO_File.OpenRead(filePath), contentType, true);
            }
            else
            {
                result = new StatusCodeResult((int)HttpStatusCode.NotFound);
            }

            return result;
        }

        public async Task AddTrackToPlaylist(int itemId, int playlistId)
        {
            PlaylistTrack item = new PlaylistTrack() { PlaylistId = playlistId, TrackId = itemId };
            Transaction transaction = null;

            try
            {
                transaction = await transactionService.GetNewTransaction(TransactionTypes.AddPlaylistSong);
                await dataService.Insert(item);
                await transactionService.UpdateTransactionCompleted(transaction, $"Playlist: {playlistId}, Track: {itemId}");
            }
            catch (Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }
        }

        public async Task AddArtistToPlaylist(int itemId, int playlistId)
        {
            Transaction transaction = null;

            try
            {
                IEnumerable<Track> tracks = null;
                IEnumerable<PlaylistTrack> items = null;

                transaction = await transactionService.GetNewTransaction(TransactionTypes.AddPlaylistArtist);
                tracks = await dataService.GetList<Track>(track => track.ArtistId == itemId);
                items = tracks.Select(track => new PlaylistTrack { TrackId = track.Id, PlaylistId = playlistId });
                await dataService.Insert(items);
                await transactionService.UpdateTransactionCompleted(transaction, $"Playlist: {playlistId}, Artist: {itemId}");
            }
            catch (Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }
        }

        public async Task AddAlbumToPlaylist(int itemId, int playlistId)
        {
            Transaction transaction = null;

            try
            {
                IEnumerable<Track> tracks = null;
                IEnumerable<PlaylistTrack> items = null;

                transaction = await transactionService.GetNewTransaction(TransactionTypes.AddPlaylistAlbum);
                tracks = await dataService.GetList<Track>(track => track.AlbumId == itemId);
                items = tracks.Select(track => new PlaylistTrack { TrackId = track.Id, PlaylistId = playlistId });
                await dataService.Insert(items);
                await transactionService.UpdateTransactionCompleted(transaction, $"Playlist: {playlistId}, Album: {itemId}");
            }
            catch (Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }
        }

        private async Task<IActionResult> GetAlbum(int id)
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Music));

            musicViewModel.Configuration = configuration?.GetConfigurationObject<MusicConfiguration>() ?? new MusicConfiguration();
            musicViewModel.SelectedAlbum = await dataService.GetAlt<Album>(album => album.Id == id, default, "Tracks.Artist");
            musicViewModel.SelectedAlbum.Tracks = musicViewModel.SelectedAlbum.Tracks?.OrderBy(song => song.Position).ThenBy(song => song.Title).ToList();

            return PartialView("Album", musicViewModel);
        }

        private async Task<IActionResult> GetArtist(int id)
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Music));

            musicViewModel.Configuration = configuration?.GetConfigurationObject<MusicConfiguration>() ?? new MusicConfiguration();
            musicViewModel.SelectedArtist = await dataService.GetAlt<Artist>(artist => artist.Id == id, default, "Albums.Tracks");
            return PartialView("Artist", musicViewModel);
        }

        public async Task<IActionResult> Scan(ScanDirectoryRequest request)
        {
            Transaction transaction = null;
            StatusCodeResult result = new StatusCodeResult((int)HttpStatusCode.Accepted);
            string message = string.Empty;

            try
            {
                IEnumerable<Transaction> existingTransactions = await transactionService.GetActiveTransactionsByType(TransactionTypes.Read);
                var existingTransaction = existingTransactions.Where(item => !string.IsNullOrWhiteSpace(item.Message))
                                                              .Select(item => new { item.Id, Directories = JsonConvert.DeserializeObject<IEnumerable<string>>(item.Message) })
                                                              .FirstOrDefault(item => item.Directories.Contains(request.Path, StringComparer.OrdinalIgnoreCase));

                transaction = await transactionService.GetNewTransaction(TransactionTypes.Read);

                if (request.IsValid())
                {
                    TrackPath path = await dataService.Get<TrackPath>(item => item.Location == request.Path);

                    if (path != null)
                    {
                        message = $"'{path.Location}' has already been added. Run {nameof(MusicController)} -> {nameof(Refresh)} instead.";
                        result = new StatusCodeResult((int)HttpStatusCode.Conflict) /*, message)*/;
                        await transactionService.UpdateTransactionCompleted(transaction, message);
                    }
                    else if (existingTransaction == null)
                    {
                        IEnumerable<string> directories = fileService.EnumerateDirectories(request.Path, recursive: request.Recursive);

                        transaction.Message = JsonConvert.SerializeObject(request.Recursive ? directories : Enumerable.Empty<string>().Append(request.Path));
                        await transactionService.UpdateTransactionInProcess(transaction);
                        backgroundTaskQueue.QueueBackgroundWorkItem(async task => await fileService.ReadDirectory(transaction, request.Path, request.Recursive)
                                                                                                   .ContinueWith(task => musicService.ClearData()));
                    }
                    else
                    {
                        message = $"{nameof(TransactionTypes.Read)} is already running. See transaction #{existingTransaction.Id}";
                        result = new StatusCodeResult((int)HttpStatusCode.Conflict);
                        await transactionService.UpdateTransactionCompleted(transaction, message);
                    }
                }
                else
                {
                    message = $"{nameof(HttpStatusCode.BadRequest)}: {JsonConvert.SerializeObject(request)}";
                    result = new StatusCodeResult((int)HttpStatusCode.BadRequest);
                    await transactionService.UpdateTransactionErrored(transaction, new Exception(message));
                }
            }
            catch(Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
                result = new StatusCodeResult((int)HttpStatusCode.InternalServerError);
            }

            return result;
        }

        public async Task<IActionResult> Refresh(bool deleteFiles = false)
        {
            Transaction transaction = null;
            StatusCodeResult result = new StatusCodeResult((int)HttpStatusCode.Accepted);

            try
            {
                transaction = await transactionService.GetNewTransaction(deleteFiles ? TransactionTypes.RefreshMusicWithDelete : TransactionTypes.RefreshMusic);
                await fileService.CheckForMusicUpdates(transaction).ContinueWith(task => musicService.ClearData());
            }
            catch (Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
                result = new StatusCodeResult((int)HttpStatusCode.InternalServerError);
            }

            return result;
        }

        public async Task<IActionResult> UpdateConfiguration([FromBody] MusicConfiguration musicConfiguration)
        {
            if (ModelState.IsValid)
            {
                Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Music));

                if (configuration == null)
                {
                    configuration = new Configuration() { Type = nameof(MediaPages.Music), JsonData = JsonConvert.SerializeObject(musicConfiguration) };
                    await dataService.Insert(configuration);
                }
                else
                {
                    musicConfiguration.MusicPaths = musicConfiguration.MusicPaths.Distinct(StringComparer.OrdinalIgnoreCase);
                    configuration.JsonData = JsonConvert.SerializeObject(musicConfiguration);
                    await dataService.Update(configuration);
                }
            }
            
            return NoContent();
        }

        public async Task<JsonResult> GetSong(int id)
        {
            Track track = await dataService.Get<Track>(item => item.Id == id, default, item => item.Album, item => item.Artist, item => item.Genre);
            Song song = new Song
            {
                Id = track.Id,
                Title = track.Title,
                Album = track.Album?.Title,
                Artist = track.Artist?.Name,
                Genre = track.Genre?.Name,
                Position = track.Position
            };

            return Json(song, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }

        public async Task UpdateSong(Song song)
        {
            if (ModelState.IsValid)
            {
                Track track = await dataService.Get<Track>(item => item.Id == song.Id);
                Album album = await dataService.Get<Album>(item => item.Title == song.Album.Trim());
                Artist artist = await dataService.Get<Artist>(item => item.Name == song.Artist.Trim());
                Genre genre = await dataService.Get<Genre>(item => item.Name == song.Genre.Trim());
                
                if (track != null)
                {
                    if (artist == null)
                    {
                        artist = new Artist(song.Artist.Trim());
                        await dataService.Insert(artist);
                    }

                    if (genre == null)
                    {
                        genre = new Genre(song.Genre.Trim());
                        await dataService.Insert(genre);
                    }

                    if (album == null)
                    {
                        album = new Album(song.Album.Trim()) { ArtistId = artist.Id, GenreId = genre.Id };
                        await dataService.Insert(album);
                    }
                    
                    track.Title = song.Title;
                    track.AlbumId = album.Id;
                    track.ArtistId = artist.Id;
                    track.GenreId = genre.Id;
                    track.Position = song.Position;
                    await dataService.Update(track);
                    musicService.ClearData();
                }
            }
        }

        public async Task<IActionResult> Upload(AddNewSongModalViewModel viewModel)
        {
            IActionResult result = default(IActionResult);

            if (ModelState.IsValid)
            {
                Configuration musicConfiguration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Music));
                string fileName = viewModel.MusicFile.FileName,
                       filePath = Path.Combine(viewModel.MusicPath, fileName);
                IEnumerable<string> musicPaths = musicConfiguration.GetConfigurationObject<MusicConfiguration>().MusicPaths;

                if (Directory.Exists(viewModel.MusicPath) && !IO_File.Exists(filePath))
                {
                    IEnumerable<DirectoryInfo> musicPathInfos = musicPaths.Select(path => new DirectoryInfo(path));
                    DirectoryInfo targetPathInfo = new DirectoryInfo(viewModel.MusicPath);
                    bool isSafePath = musicPathInfos.Any(info => fileService.EnumerateDirectories(info.FullName, recursive: true)
                                                                            .Any(item => item.Equals(targetPathInfo.FullName)));

                    if (isSafePath)
                    {
                        using (Stream stream = IO_File.OpenWrite(filePath)) { await viewModel.MusicFile.CopyToAsync(stream); }
                        await fileService.ReadMediaFile(filePath);
                        musicService.ClearData();
                        result = NoContent();
                    }
                    else
                    {
                        ModelState.AddModelError("Message", $"'{viewModel.MusicPath}' is not a valid path");
                        result = new BadRequestObjectResult(ModelState);
                    }
                }
                else
                {
                    if (Directory.Exists(viewModel.MusicPath))
                    {
                        ModelState.AddModelError("Message", $"'{fileName}' already exists in the '{viewModel.MusicPath}'");
                    }
                    else
                    {
                        ModelState.AddModelError("Message", $"'{viewModel.MusicPath}' not found or does not exist");
                    }

                    result = new BadRequestObjectResult(ModelState);
                }
            }
            else
            {
                result = new BadRequestObjectResult(ModelState);
            }

            return result;
        }

        public async Task<IActionResult> GetAlbums()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Music));

            musicViewModel.Configuration = configuration?.GetConfigurationObject<MusicConfiguration>() ?? new MusicConfiguration();
            musicViewModel.AlbumGroups = await musicService.GetAlbumGroups(musicViewModel.Configuration.SelectedAlbumSort);
            musicViewModel.Playlists = await dataService.GetList<Playlist>();

            return PartialView("Albums", musicViewModel);
        }

        public async Task<IActionResult> GetArtists()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Music));

            musicViewModel.Configuration = configuration?.GetConfigurationObject<MusicConfiguration>() ?? new MusicConfiguration();
            musicViewModel.ArtistGroups = await musicService.GetArtistGroups(musicViewModel.Configuration.SelectedArtistSort);
            musicViewModel.Playlists = await dataService.GetList<Playlist>();

            return PartialView("Artists", musicViewModel);
        }

        public async Task<IActionResult> GetSongs()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Music));

            musicViewModel.Configuration = configuration?.GetConfigurationObject<MusicConfiguration>() ?? new MusicConfiguration();
            musicViewModel.SongGroups = await musicService.GetSongGroups(musicViewModel.Configuration.SelectedSongSort);
            musicViewModel.Playlists = await dataService.GetList<Playlist>();

            return PartialView("Songs", musicViewModel);
        }

        public async Task<IActionResult> MusicConfiguration()
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Music));

            musicViewModel.Configuration = configuration?.GetConfigurationObject<MusicConfiguration>() ?? new MusicConfiguration();

            return Json(musicViewModel.Configuration, new JsonSerializerOptions { PropertyNamingPolicy = null });
        }

        public async Task<IActionResult> SearchAlbums(string query)
        {
            IEnumerable<IGrouping<string, Album>> albumGroups = await musicService.GetAlbumGroups(AlbumSort.None);
            IEnumerable<Album> albums = albumGroups.SelectMany(group => group).AsParallel().Where(album => album.Title.Contains(query, StringComparison.OrdinalIgnoreCase));

            musicViewModel.IsSearchResponse = true;
            musicViewModel.AlbumGroups = albums.OrderBy(album => album.Title).GroupBy(album => "Albums");
            musicViewModel.Playlists = await dataService.GetList<Playlist>();

            return PartialView("Albums", musicViewModel);
        }

        public async Task<IActionResult> SearchArtists(string query)
        {
            IEnumerable<IGrouping<string, Artist>> artistGroups = await musicService.GetArtistGroups(ArtistSort.None);
            IEnumerable<Artist> artists = artistGroups.SelectMany(group => group).AsParallel().Where(artist => artist.Name.Contains(query, StringComparison.OrdinalIgnoreCase));

            musicViewModel.IsSearchResponse = true;
            musicViewModel.ArtistGroups = artists.OrderBy(artist => artist.Name).GroupBy(artist => "Artists");
            musicViewModel.Playlists = await dataService.GetList<Playlist>();

            return PartialView("Artists", musicViewModel);
        }

        public async Task<IActionResult> SearchSongs(string query)
        {
            IEnumerable<IGrouping<string, Track>> songGroups = await musicService.GetSongGroups(SongSort.None);
            IEnumerable<Track> songs = songGroups.SelectMany(group => group).AsParallel().Where(song => song.Title.Contains(query, StringComparison.OrdinalIgnoreCase));

            musicViewModel.IsSearchResponse = true;
            musicViewModel.SongGroups = songs.OrderBy(song => song.Title).GroupBy(song => "Songs");
            musicViewModel.Playlists = await dataService.GetList<Playlist>();

            return PartialView("Songs", musicViewModel);
        }

        public async Task<IActionResult> GetMusicDirectory(string path)
        {
            IActionResult result = default;

            try
            {
                MusicDirectory musicDirectory = await musicService.GetMusicDirectory(path);

                result = PartialView("~/Views/Shared/Controls/MusicDirectory.cshtml", musicDirectory);
            }
            catch (Exception ex)
            {
                result = StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }

            return result;
        }

        public async Task<IActionResult> GetDirectorySelector(string path)
        {
            MusicDirectory musicDirectory = await musicService.GetMusicDirectory(path);

            return PartialView("~/Views/Shared/Controls/DirectorySelector.cshtml", musicDirectory);
        }

        public async Task<bool> IsScanCompleted(int id)
        {
            return await dataService.Exists<Transaction>(item => item.Id == id && item.Status == (int)TransactionStatus.Completed);
        }

        public async Task AddMusicDirectory(string path)
        {
            Func<DirectoryInfo, bool> canUse = dirInfo => (dirInfo.Attributes & FileAttributes.Hidden) != FileAttributes.Hidden &&
                                                          (dirInfo.Attributes & FileAttributes.System) != FileAttributes.System;

            if (!string.IsNullOrWhiteSpace(path) && Directory.Exists(path))
            {
                DirectoryInfo directoryInfo =  new DirectoryInfo(path);
                ScanDirectoryRequest request = new ScanDirectoryRequest(directoryInfo.FullName);
                bool pathExists = directoryInfo != null &&
                                  await dataService.Exists<TrackPath>(item => item.Location == directoryInfo.FullName);

                if (!pathExists && canUse(directoryInfo))
                {
                    await Scan(request);
                }
            }
        }

        public async Task RemoveMusicDirectory(int id)
        {
            TrackPath path = await dataService.Get<TrackPath>(item => item.Id == id);

            if (path != null)
            {
                await dataService.Delete<TrackPath>(id);
                musicService.ClearData();
            }
        }

        public async Task<IActionResult> MusicPathValid(string path)
        {
            Configuration configuration = await dataService.Get<Configuration>(item => item.Type == nameof(MediaPages.Music));
            MusicConfiguration musicConfiguration = configuration?.GetConfigurationObject<MusicConfiguration>() ?? new MusicConfiguration();
            IActionResult result = Ok();
            Func<DirectoryInfo, bool> canUse = dirInfo => (dirInfo.Attributes & FileAttributes.Hidden) != FileAttributes.Hidden &&
                                                          (dirInfo.Attributes & FileAttributes.System) != FileAttributes.System;

            path = path?.Trim();

            if (string.IsNullOrWhiteSpace(path))
            {
                result = Ok("Path is missing.");
            }
            else if (!Directory.Exists(path))
            {
                result = Ok("Path not found/does not exist");
            }
            else if (musicConfiguration.MusicPaths.Contains(path, StringComparer.OrdinalIgnoreCase))
            {
                result = Ok("Path already added.");
            } 
            else if (musicConfiguration.MusicPaths.Any(_path => path.StartsWith(_path, StringComparison.OrdinalIgnoreCase)))
            {
                result = Ok("Use directory selector to add this path.");
            }
            else if (!canUse(new DirectoryInfo(path)))
            {
                result = Ok("Path is either a hidden or system folder and cannot be used.");
            }

            return result;
        }
    }
}