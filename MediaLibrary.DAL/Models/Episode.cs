﻿using System;
using System.Collections.Generic;

namespace MediaLibrary.DAL.Models
{
    public partial class Episode
    {
        public Episode()
        {
            PlaylistEpisodes = new HashSet<PlaylistEpisode>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public int SeriesId { get; set; }
        public int? Season { get; set; }
        public string Path { get; set; }
        public int PlayCount { get; set; }
        public int Progress { get; set; }
        public DateTime? LastPlayedDate { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ModifyDate { get; set; }

        public virtual Series Series { get; set; }
        public virtual ICollection<PlaylistEpisode> PlaylistEpisodes { get; set; }
    }
}
