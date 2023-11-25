using MediaLibrary.DAL.DbContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface IGenreService
    {
        Task<int?> AddGenre(string genres, CancellationToken token = default);
    }
}
