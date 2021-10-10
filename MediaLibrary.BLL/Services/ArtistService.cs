﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using MediaLibrary.DAL.Services.Interfaces;
using System.Linq.Expressions;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Models;

namespace MediaLibrary.BLL.Services
{
    public class ArtistService : IArtistService
    {
        private readonly IDataService dataService;

        public ArtistService(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<int?> AddArtist(string strArtists)
        {
            int? id = default(int?);

            if (!string.IsNullOrWhiteSpace(strArtists))
            {
                object parameters = new { name = strArtists };
                Artist artist = new Artist(strArtists);
                Artist dbArtist = await dataService.Get<Artist>(item => item.Name == strArtists);

                if (dbArtist != null) { id = dbArtist.Id; }
                else
                {
                    await dataService.Insert(artist);
                    id = artist.Id;
                }
            }

            return id;
        }
    }
}