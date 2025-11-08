using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.DAL.Partials.Interfaces;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using IO_File = System.IO.File;

namespace MediaLibrary.DAL.Models
{
    public partial class PodcastItem : IPlayableItem, IPodcastItemJSON
    {
        public PodcastItem(string title, string description, string url, long length, DateTime publishDate, int podcastId) : base()
        {
            Title = title;
            Url = url;
            Description = description;
            Length = (int)length;
            PublishDate = publishDate;
            PodcastId = podcastId;
        }

        public bool IsDownloaded { get => !string.IsNullOrWhiteSpace(this.File) && IO_File.Exists(this.File); }

        [NotMapped]
        public bool IsDownloading { get; set; }

        public bool IsPlayed { get => LastPlayedDate.HasValue; }

        public bool IsStarted { get => Progress != 0; }
    }
}
