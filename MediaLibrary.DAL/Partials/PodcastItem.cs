using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.DAL.Partials.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaLibrary.DAL.Models
{
    public partial class PodcastItem: IPlayableItem, IPodcastItemJSON
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
    }
}
