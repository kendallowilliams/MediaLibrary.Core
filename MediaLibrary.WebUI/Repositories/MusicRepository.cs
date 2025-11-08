using MediaLibrary.Shared.Models;
using MediaLibrary.Shared.Models.Interfaces;
using System.Collections.Generic;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.WebUI.Repositories
{
    public static class MusicRepository
    {
        public static IEnumerable<IListItem<object, AlbumSort>> GetAlbumSortItems()
        {
            yield return new ListItem<object, AlbumSort>(null, "A to Z", AlbumSort.AtoZ);
        }

        public static IEnumerable<IListItem<object, ArtistSort>> GetArtistSortItems()
        {
            yield return new ListItem<object, ArtistSort>(null, "A to Z", ArtistSort.AtoZ);
        }

        public static IEnumerable<IListItem<object, SongSort>> GetSongSortItems()
        {
            yield return new ListItem<object, SongSort>(null, "Date added", SongSort.DateAdded);
            yield return new ListItem<object, SongSort>(null, "A to Z", SongSort.AtoZ);
            yield return new ListItem<object, SongSort>(null, nameof(SongSort.Album), SongSort.Album);
            yield return new ListItem<object, SongSort>(null, nameof(SongSort.Artist), SongSort.Artist);
            yield return new ListItem<object, SongSort>(null, nameof(SongSort.Genre), SongSort.Genre);
        }
    }
}