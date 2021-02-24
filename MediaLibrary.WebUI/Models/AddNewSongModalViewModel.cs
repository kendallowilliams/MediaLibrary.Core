using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace MediaLibrary.WebUI.Models
{
    public class AddNewSongModalViewModel
    {
        public AddNewSongModalViewModel()
        {
        }

        [Required]
        public IFormFile MusicFile { get; set; }

        [Required]
        public string MusicPath { get; set; }
    }
}
