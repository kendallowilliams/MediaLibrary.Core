﻿using System;
using System.Collections.Generic;

namespace MediaLibrary.DAL.Models
{
    public partial class Configuration
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string JsonData { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ModifyDate { get; set; }
    }
}
