﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IProcessorService
    {
        Task RefreshPodcasts();
        Task PerformCleanup();
        Task RefreshMusic();
    }
}
