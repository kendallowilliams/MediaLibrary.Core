using System;
using System.Threading.Tasks;

namespace MediaLibrary.BLL.Services.Interfaces
{
    public interface ILogService
    {
        Task Info(string message);

        Task Warn(string message);

        Task Error(string message);

        Task Error(Exception ex);

        Task Error(AggregateException ex);

        Task Trace(string message);

        Task Debug(string message);

        Task Fatal(string message);

        Task Fatal(Exception ex);

        Task Fatal(AggregateException ex);

        Task Log<T>(T entity, string message);

        Task Log<TOld, TNew>(TOld oldEntity, TNew newEntity, string message)
            where TOld : class
            where TNew : class;
    }
}
