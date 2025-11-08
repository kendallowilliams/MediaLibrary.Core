using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

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
