﻿using MediaLibrary.BLL.Services.Interfaces;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services
{
    public class CompressionService : ICompressionService
    {
        public async Task<byte[]> CreateArchive(IEnumerable<string> files)
        {
            byte[] data = null;

            using (var stream = new MemoryStream())
            {
                using (var archive = new ZipArchive(stream, ZipArchiveMode.Create))
                {
                    foreach (var file in files)
                    {
                        var entry = archive.CreateEntry(Path.GetFileName(file));
                        using (var writer = new StreamWriter(entry.Open()))
                        {
                            await File.OpenRead(file).CopyToAsync(writer.BaseStream);
                        }
                    }
                }

                data = stream.ToArray();
            }

            return data;
        }

        public async Task<byte[]> CreateArchive(IDictionary<string, byte[]> files)
        {
            byte[] data = null;

            using (var stream = new MemoryStream())
            {
                using (var archive = new ZipArchive(stream, ZipArchiveMode.Create))
                {
                    foreach (var file in files)
                    {
                        var entry = archive.CreateEntry(file.Key);
                        using (var writer = new StreamWriter(entry.Open()))
                        {
                            await writer.BaseStream.WriteAsync(file.Value);
                        }
                    }
                }

                data = stream.ToArray();
            }

            return data;
        }
    }
}
