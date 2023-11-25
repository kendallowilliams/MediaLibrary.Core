using MediaLibrary.BLL.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Configuration;
using static MediaLibrary.Shared.Enums;
using MediaLibrary.Shared.Models.Configurations;

namespace MediaLibrary.BLL.Services
{
    public class FileService : IFileService
    {
        private readonly IDataService dataService;
        private readonly IId3Service id3Service;
        private readonly IArtistService artistService;
        private readonly IAlbumService albumService;
        private readonly IGenreService genreService;
        private readonly ITrackService trackService;
        private readonly ITransactionService transactionService;
        private readonly IConfiguration configuration;

        public FileService(IId3Service id3Service, IArtistService artistService, IAlbumService albumService,
                           IGenreService genreService, ITrackService trackService, ITransactionService transactionService,
                           IDataService dataService, IConfiguration configuration)
        {
            this.id3Service = id3Service;
            this.artistService = artistService;
            this.albumService = albumService;
            this.genreService = genreService;
            this.trackService = trackService;
            this.transactionService = transactionService;
            this.dataService = dataService;
            this.configuration = configuration;
        }

        public string PodcastFolder { get => Path.Combine(RootFolder, "Podcast"); }

        public string RootFolder { get => Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.CommonMusic, Environment.SpecialFolderOption.Create), "MediaLibrary"); }

        public IEnumerable<string> EnumerateDirectories(string path, string searchPattern = "*", bool recursive = false)
        {
            SearchOption searchOption = recursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly;
            DirectoryInfo directoryInfo = Directory.Exists(path) ? new DirectoryInfo(path) : default;
            Func<DirectoryInfo, bool> canUse = dirInfo => (dirInfo.Attributes & FileAttributes.Hidden) != FileAttributes.Hidden &&
                                                          (dirInfo.Attributes & FileAttributes.System) != FileAttributes.System;

            return directoryInfo != null && canUse(directoryInfo) ?
                Directory.EnumerateDirectories(path, searchPattern, searchOption) :
                Enumerable.Empty<string>();
        }

        public IEnumerable<string> EnumerateFiles(string path, string searchPattern = "*", bool recursive = false)
        {
            SearchOption searchOption = recursive ? SearchOption.AllDirectories : SearchOption.TopDirectoryOnly;
            DirectoryInfo directoryInfo = Directory.Exists(path) ? new DirectoryInfo(path) : default;
            Func<DirectoryInfo, bool> canUse = dirInfo => (dirInfo.Attributes & FileAttributes.Hidden) != FileAttributes.Hidden &&
                                                          (dirInfo.Attributes & FileAttributes.System) != FileAttributes.System;

            return directoryInfo != null && canUse(directoryInfo) ?
                Directory.EnumerateFiles(path, searchPattern, searchOption) : 
                Enumerable.Empty<string>();
        }

        public void Write(string path, byte[] data) => File.WriteAllBytes(path, data);

        public void Write(string path, string data) => File.WriteAllText(path, data);

        public bool Exists(string path) => File.Exists(path);

        public void Delete(string path)
        {
            if (File.Exists(path)) { File.Delete(path); }
        }

        public async Task ReadDirectory(Transaction transaction, string path, bool recursive = false)
        {
            try
            {
                IEnumerable<string> fileTypes = configuration["FileTypes"].Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries),
                                    allFiles = EnumerateFiles(path, recursive: recursive);
                var fileGroups = allFiles.Where(file => fileTypes.Contains(Path.GetExtension(file), StringComparer.OrdinalIgnoreCase))
                                         .GroupBy(file => Path.GetDirectoryName(file), StringComparer.OrdinalIgnoreCase);

                foreach (var group in fileGroups.Where(item => Directory.Exists(item.Key)))
                {
                    foreach (string file in group) { await AddMediaFile(file); }
                }

                await transactionService.UpdateTransactionCompleted(transaction);
            }
            catch(Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }
        }

        public async Task AddMediaFile(string path, CancellationToken token = default)
        {
            MediaData data = id3Service.ProcessFile(path);
            int? genreId = await genreService.AddGenre(data?.Genres, token),
                artistId = await artistService.AddArtist(data.Artists, token),
                albumId = await albumService.AddAlbum(new Album(data, artistId, genreId), token),
                pathId = await trackService.AddPath(Path.GetDirectoryName(path), token);
            Track track = new Track(data, pathId, genreId, albumId, artistId);

            await dataService.Insert(track, token);
        }

        public async Task CheckForMusicUpdates(Transaction transaction, CancellationToken token = default)
        {
            try
            {
                var musicConfiguration = await dataService.Get<Configuration>(item => item.Type == ConfigurationTypes.Music, token)
                                                          .ContinueWith(task => task.Result.GetConfigurationObject<MusicConfiguration>() ?? 
                                                                                new MusicConfiguration());
                IEnumerable<string> fileTypes = configuration["FileTypes"].Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries),
                                    configPaths = musicConfiguration.MusicPaths;
                IEnumerable<TrackPath> savedPaths = await dataService.GetList<TrackPath>(token: token, includes: path => path.Tracks),
                                       validPaths = savedPaths.Where(_path => _path.Tracks.Any()),
                                       emptyPaths = savedPaths.Where(_path => !_path.Tracks.Any()),
                                       invalidPaths = savedPaths.Where(_path => !configPaths.Any(p => _path.Location.StartsWith(p, StringComparison.OrdinalIgnoreCase)));
                IEnumerable<Album> albumsToDelete = Enumerable.Empty<Album>();
                IEnumerable<Artist> artistsToDelete = Enumerable.Empty<Artist>();

                foreach (TrackPath path in validPaths)
                {
                    IEnumerable<Track> tracks = path.Tracks;
                    IEnumerable<string> existingFiles = tracks.Select(track => Path.Combine(path.Location, track.FileName)),
                                        files = EnumerateFiles(path.Location).Where(file => fileTypes.Contains(Path.GetExtension(file), StringComparer.OrdinalIgnoreCase)),
                                        deletedFiles = existingFiles.Where(file => !File.Exists(file)),
                                        existingDirectories = savedPaths.Where(_path => !path.Equals(_path) && 
                                                                                        _path.Location.StartsWith(path.Location))
                                                                        .Select(_path => _path.Location);

                    if (transaction.Type == TransactionTypes.RefreshMusicWithDelete)
                    {
                        foreach (string file in deletedFiles)
                        {
                            Transaction deleteTransaction = null;

                            try
                            {
                                Track song = tracks.FirstOrDefault(track => track.FileName.Equals(Path.GetFileName(file), StringComparison.OrdinalIgnoreCase));

                                deleteTransaction = await transactionService.GetNewTransaction(TransactionTypes.RemoveTrack);
                                deleteTransaction.Message = $"Attempting to remove song [ID: {song?.Id}]...";
                                await dataService.Update(deleteTransaction, token);
                                await dataService.Delete(song, token);
                                await transactionService.UpdateTransactionCompleted(deleteTransaction, $"Song [ID: {song?.Id}] removed.");
                            }
                            catch (Exception ex)
                            {
                                await transactionService.UpdateTransactionErrored(deleteTransaction, ex);
                            }
                        }

                        foreach (var _path in invalidPaths) { await dataService.Delete<TrackPath>(_path.Id, token); }
                    }

                    path.LastScanDate = DateTime.Now;
                    await dataService.Update(path, token);
                }

                foreach (TrackPath path in emptyPaths) { await dataService.Delete<TrackPath>(path.Id, token); }
                albumsToDelete = await dataService.GetList<Album>(album => album.Tracks.Count() == 0, token, album => album.Tracks);
                artistsToDelete = await dataService.GetList<Artist>(artist => artist.Tracks.Count() == 0, token, artist => artist.Tracks);
                foreach (Album album in albumsToDelete) { await dataService.Delete<Album>(album.Id, token); }
                foreach (Artist artist in artistsToDelete) { await dataService.Delete<Artist>(artist.Id, token); }
                await transactionService.UpdateTransactionCompleted(transaction);
            }
            catch (Exception ex)
            {
                await transactionService.UpdateTransactionErrored(transaction, ex);
            }
        }

        public bool CanUseDirectory(string path)
        {
            Func<DirectoryInfo, bool> canUse = dirInfo => (dirInfo.Attributes & FileAttributes.Hidden) != FileAttributes.Hidden &&
                                                          (dirInfo.Attributes & FileAttributes.System) != FileAttributes.System;

            return !string.IsNullOrWhiteSpace(path) && Directory.Exists(path) && canUse(new DirectoryInfo(path));
        }
    }
}