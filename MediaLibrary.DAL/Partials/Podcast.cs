﻿using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaLibrary.DAL.Models
{
    public partial class Podcast: IDataModel
    {
        public Podcast(string title, string url, string imageUrl, string description, string author) : this()
        {
            Title = title;
            Url = url;
            ImageUrl = imageUrl;
            Description = description;
            Author = author;
        }
    }
}
