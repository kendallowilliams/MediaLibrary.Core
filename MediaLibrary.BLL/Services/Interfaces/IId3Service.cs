using MediaLibrary.DAL.Models;
using MediaLibrary.Shared.Models;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IId3Service
    {
        MediaData ReadFromFile(string path);
        void WriteToFile(Song song, string path);
    }
}
