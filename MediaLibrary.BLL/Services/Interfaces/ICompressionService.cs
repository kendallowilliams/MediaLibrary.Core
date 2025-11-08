using System.Collections.Generic;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface ICompressionService
    {
        Task<byte[]> CreateArchive(IEnumerable<string> files);

        Task<byte[]> CreateArchive(IDictionary<string, byte[]> files);
    }
}
