using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;
using MediaLibrary.Shared.Models;
using System;
using TagLib;

namespace MediaLibrary.BLL.Services
{
    public class Id3Service : IId3Service
    {
        public Id3Service()
        {
        }

        public MediaData ReadFromFile(string path)
        {
            MediaData mediaData = default;

            try
            {
                File file = File.Create(path);
                Tag tag = file.Tag;
                string fileName = System.IO.Path.GetFileName(file.Name);
                MediaData data = new MediaData
                {
                    Album = tag.Album?.Trim(),
                    Artists = tag.JoinedPerformers?.Trim(),
                    AlbumArtists = tag.JoinedAlbumArtists?.Trim(),
                    Comment = tag.Comment?.Trim(),
                    Copyright = tag.Copyright?.Trim(),
                    FileName = fileName,
                    Duration = (file.Properties.MediaTypes != MediaTypes.None) ? file.Properties.Duration.TotalSeconds : 0,
                    Title = tag.Title?.Trim() ?? fileName,
                    Track = tag.Track,
                    TrackCount = tag.TrackCount,
                    Year = tag.Year,
                    Genres = tag.JoinedGenres?.Trim()
                };

                mediaData = data;
            }
            catch (Exception ex)
            {
                if (ex is UnsupportedFormatException)
                {

                }
            }

            return mediaData;
        }

        public void WriteToFile(Song song, string path)
        {
            try
            {
                File file = File.Create(path);
                Tag tag = file.Tag;

                tag.Album = song.Album?.Trim();
                tag.Performers = [song.Artist];
                tag.Title = song.Title;
                tag.Track = song.Position.HasValue ? (uint)song.Position.Value : 0;
                tag.Genres = [song.Genre];

                file.Save();
            }
            catch (Exception ex)
            {
                if (ex is UnsupportedFormatException)
                {

                }
            }
        }
    }
}