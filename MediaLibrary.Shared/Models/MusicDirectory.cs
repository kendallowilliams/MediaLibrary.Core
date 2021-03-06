using MediaLibrary.Shared.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MediaLibrary.Shared.Models
{
    public class MusicDirectory
    {
        public MusicDirectory(string path)
        {
            Path = path;
            SubDirectories = Enumerable.Empty<MusicDirectory>();
        }

        public MusicDirectory(string path, IEnumerable<string> subDirectoryPaths) : this(path)
        {
            SubDirectories = subDirectoryPaths.OrderBy(item => item)
                                              .Select(item => new MusicDirectory(item))
                                              .ToList();
        }

        public MusicDirectory(string path, IEnumerable<string> subDirectoryPaths, IEnumerable<ITrackPath> includedTrackPaths) : this(path)
        {
            SubDirectories = subDirectoryPaths.OrderBy(item => item)
                                              .Select(item => new MusicDirectory(item)
                                              {
                                                  Id = includedTrackPaths.FirstOrDefault(_path => _path.Location.Equals(item, StringComparison.OrdinalIgnoreCase))?.Id
                                              })
                                              .ToList();
        }

        public string Path { get; set; }

        public int? Id { get; set; }

        public int? TransactionId { get; set; }

        public IEnumerable<MusicDirectory> SubDirectories { get; set; }

        public bool HasFiles { get; set; }
        public bool HasDirectories { get; set; }
        public bool IsLoading { get; set; }
    }
}