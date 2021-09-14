﻿using Fody;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Services.Interfaces;
using MediaLibrary.Shared.Services.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.WebUI.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static MediaLibrary.Shared.Enums;
using MediaLibrary.Shared.Models;
using Microsoft.Extensions.Caching.Memory;

namespace MediaLibrary.WebUI.Services
{
    [ConfigureAwait(false)]
    [Export(typeof(IMusicUIService))]
    public class MusicUIService : BaseUIService, IMusicUIService
    {
        private readonly Lazy<IDataService> lazyDataService;
        private readonly Lazy<IFileService> lazyFileService;
        private readonly Lazy<ITransactionService> lazyTransactionService;
        private readonly IConfiguration configuration;
        private IDataService dataService => lazyDataService.Value;
        private IFileService fileService => lazyFileService.Value;
        private ITransactionService transactionService => lazyTransactionService.Value;
        private readonly IMemoryCache memoryCache;

        [ImportingConstructor]
        public MusicUIService(Lazy<IDataService> dataService, Lazy<IFileService> fileService, Lazy<ITransactionService> transactionService,
                              IConfiguration configuration, IMemoryCache memoryCache) : base()
        {
            this.lazyDataService = dataService;
            this.lazyFileService = fileService;
            this.lazyTransactionService = transactionService;
            this.configuration = configuration;
            this.memoryCache = memoryCache;
        }

        public async Task<IEnumerable<Track>> Songs() => await dataService.GetList<Track>();
        public async Task<IEnumerable<Artist>> Artists() => await dataService.GetList<Artist>();
        public async Task<IEnumerable<Album>> Albums() => await dataService.GetList<Album>();

        public async Task<IEnumerable<IGrouping<string, Track>>> GetSongGroups(SongSort sort)
        {
            IEnumerable<IGrouping<string, Track>> groups = null;
            memoryCache.TryGetValue(nameof(CacheKeys.Tracks), out IEnumerable<Track> songs);

            if (songs == null)
            {
                songs = (await dataService.GetList<Track>(default, default,
                                                          song => song.Album,
                                                          song => song.Artist,
                                                          song => song.Genre))?.OrderBy(song => song.Title);
                memoryCache.Set(nameof(CacheKeys.Tracks), songs);
            }

            switch(sort)
            {
                case SongSort.Album:
                    groups = songs.GroupBy(song => song.Album.Title).OrderBy(group => group.Key);
                    break;
                case SongSort.Artist:
                    groups = songs.GroupBy(song => song.Artist?.Name ?? "Unknown Artist").OrderBy(group => group.Key);
                    break;
                case SongSort.DateAdded:
                    groups = songs.GroupBy(song => song.CreateDate.ToString("yyyy-MM-dd")).OrderByDescending(group => DateTime.Parse(group.Key));
                    break;
                case SongSort.Genre:
                    groups = songs.GroupBy(song => song.Genre?.Name ?? "Unknown Genre").OrderBy(group => group.Key);
                    break;
                case SongSort.AtoZ:
                    groups = GetSongsAtoZ(songs);
                    break;
                default:
                    groups = songs.GroupBy(song => "Songs");
                    break;
            }

            return groups;
        }

        public async Task<IEnumerable<IGrouping<string, Album>>> GetAlbumGroups(AlbumSort sort)
        {
            IEnumerable<IGrouping<string, Album>> groups = null;
            memoryCache.TryGetValue(nameof(CacheKeys.Albums), out IEnumerable<Album> albums);

            if (albums == null)
            {
                albums = (await dataService.GetList<Album>(default, default, album => album.Artist, album => album.Tracks))
                                                         .Where(album => album.Tracks.Any());
                memoryCache.Set(nameof(CacheKeys.Albums), albums);
            }

            switch (sort)
            {
                case AlbumSort.AtoZ:
                    groups = GetAlbumsAtoZ(albums.OrderBy(album => album.Title));
                    break;
                default:
                    groups = albums.GroupBy(album => "Albums");
                    break;
            }

            return groups;
        }

        public async Task<IEnumerable<IGrouping<string, Artist>>> GetArtistGroups(ArtistSort sort)
        {
            IEnumerable<IGrouping<string, Artist>> groups = null;
            memoryCache.TryGetValue(nameof(CacheKeys.Artists), out IEnumerable<Artist> artists);

            if (artists == null)
            {
                artists = (await dataService.GetList<Artist>(default, default, artist => artist.Albums))
                                            .Where(artist => artist.Albums.Any());
                memoryCache.Set(nameof(CacheKeys.Artists), artists);
            }

            switch (sort)
            {
                case ArtistSort.AtoZ:
                    groups = GetArtistsAtoZ(artists.OrderBy(artist => artist.Name));
                    break;
                default:
                    groups = artists.GroupBy(artist => "Artists");
                    break;
            }

            return groups;
        }

        private IEnumerable<IGrouping<string, Track>> GetSongsAtoZ(IEnumerable<Track> songs)
        {
            return songs.GroupBy(track => getCharLabel(track.Title)).OrderBy(group => group.Key);
        }

        private IEnumerable<IGrouping<string, Album>> GetAlbumsAtoZ(IEnumerable<Album> albums)
        {
            return albums.GroupBy(album => getCharLabel(album.Title)).OrderBy(group => group.Key);
        }

        private IEnumerable<IGrouping<string, Artist>> GetArtistsAtoZ(IEnumerable<Artist> artists)
        {
            return artists.GroupBy(artist => getCharLabel(artist.Name)).OrderBy(group => group.Key);
        }

        public void ClearData()
        {
            memoryCache.Remove(nameof(CacheKeys.Artists));
            memoryCache.Remove(nameof(CacheKeys.Albums));
            memoryCache.Remove(nameof(CacheKeys.Tracks));
        }

        public async Task<MusicDirectory> GetMusicDirectory(string path)
        {
            IEnumerable<Transaction> existingTransactions = await transactionService.GetActiveTransactionsByType(TransactionTypes.Read);
            var transactionData = existingTransactions.Where(item => !string.IsNullOrWhiteSpace(item.Message))
                                                      .Select(item => new { item.Id, Directories = JsonConvert.DeserializeObject<IEnumerable<string>>(item.Message) });
            IEnumerable<string> directories = Enumerable.Empty<string>(),
                                activeDirectories = transactionData.SelectMany(item => item.Directories);
            IEnumerable<TrackPath> includedTrackPaths = Enumerable.Empty<TrackPath>();
            MusicDirectory musicDirectory = default;
            string rootPath = configuration["RootPath"],
                   targetPath = string.IsNullOrWhiteSpace(path) ? rootPath : path;
            DirectoryInfo rootPathInfo = new DirectoryInfo(rootPath),
                          targetPathInfo = new DirectoryInfo(targetPath);
            bool isSafePath = fileService.EnumerateDirectories(rootPathInfo.FullName, recursive: true)
                                         .Any(item => item.Equals(targetPathInfo.FullName));

            if (!isSafePath) /*then*/ targetPathInfo = rootPathInfo;
            directories = Directory.EnumerateDirectories(targetPathInfo.FullName);
            includedTrackPaths = await dataService.GetList<TrackPath>(item => directories.Contains(item.Location));
            musicDirectory = new MusicDirectory(targetPathInfo.FullName, directories.OrderBy(item => item, StringComparer.OrdinalIgnoreCase), includedTrackPaths);
            if (!rootPathInfo.FullName.Equals(targetPathInfo.FullName, StringComparison.OrdinalIgnoreCase)) /*then*/
                musicDirectory.SubDirectories = musicDirectory.SubDirectories.Prepend(new MusicDirectory(Path.Combine(targetPathInfo.FullName, "..")));

            foreach (var directory in musicDirectory.SubDirectories)
            {
                IEnumerable<string> allFiles = fileService.EnumerateFiles(directory.Path, recursive: false),
                                    fileTypes = configuration["FileTypes"].Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

                directory.HasFiles = allFiles.Where(file => fileTypes.Contains(Path.GetExtension(file), StringComparer.OrdinalIgnoreCase)).Any();
                directory.IsLoading = activeDirectories.Contains(directory.Path, StringComparer.OrdinalIgnoreCase);
                directory.TransactionId = transactionData.FirstOrDefault(item => item.Directories.Contains(directory.Path, StringComparer.OrdinalIgnoreCase))?.Id;
                directory.HasDirectories = fileService.EnumerateDirectories(directory.Path).Any();
            }

            return musicDirectory;
        }
    }
}