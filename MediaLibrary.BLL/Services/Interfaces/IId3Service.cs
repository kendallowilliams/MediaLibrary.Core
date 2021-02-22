﻿using MediaLibrary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TagLib;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IId3Service
    {
        Task<MediaData> ProcessFile(string path);
    }
}
