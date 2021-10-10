﻿using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using MediaLibrary.DAL.Models;
using MediaLibrary.BLL.Services.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using System.Linq.Expressions;

namespace MediaLibrary.BLL.Services
{
    public class GenreService : IGenreService
    {
        private readonly IDataService dataService;

        public GenreService(IDataService dataService)
        {
            this.dataService = dataService;
        }

        public async Task<int?> AddGenre(string strGenres)
        {
            int? id = default(int?);

            if (!string.IsNullOrWhiteSpace(strGenres))
            {
                object parameters = new { name = strGenres };
                Genre dbGenre = await dataService.Get<Genre>(item => item.Name == strGenres),
                      genre = new Genre(strGenres);

                if (dbGenre != null) { id = dbGenre.Id; }
                else
                {
                    await dataService.Insert(genre);
                    id = genre.Id;
                }
            }

            return id;
        }
    }
}