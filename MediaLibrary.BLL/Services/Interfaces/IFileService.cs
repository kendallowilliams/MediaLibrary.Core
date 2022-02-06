using MediaLibrary.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IFileService
    {
        string PodcastFolder { get; }

        string RootFolder { get; }

        void Write(string path, string data);

        void Write(string path, byte[] data);

        Task ReadDirectory(Transaction transaction, string path, bool recursive = false);

        Task CheckForMusicUpdates(Transaction transaction);

        Task ReadMediaFile(string path);

        void Delete(string path);

        IEnumerable<string> EnumerateDirectories(string path, string searchPattern = "*", bool recursive = false);

        IEnumerable<string> EnumerateFiles(string path, string searchPattern = "*", bool recursive = false);

        bool CanUseDirectory(string path);
    }
}
