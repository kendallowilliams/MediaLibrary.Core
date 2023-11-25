using MediaLibrary.BLL.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using TagLib;
using MediaLibrary.DAL.Models;

namespace MediaLibrary.BLL.Services
{
    public class Id3Service : IId3Service
    {
        public Id3Service()
        {
        }

        public MediaData ProcessFile(string path)
        {
            MediaData mediaData = default(MediaData);

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


    }
}