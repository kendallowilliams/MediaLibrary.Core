﻿using System;
using System.Collections.Generic;

namespace MediaLibrary.DAL.Models
{
    public partial class Podcast
    {
        public Podcast()
        {
            PodcastItems = new HashSet<PodcastItem>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public DateTime LastUpdateDate { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ModifyDate { get; set; }

        public virtual ICollection<PodcastItem> PodcastItems { get; set; }
    }
}
