using MediaLibrary.DAL.Models;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IId3Service
    {
        MediaData ProcessFile(string path);
    }
}
