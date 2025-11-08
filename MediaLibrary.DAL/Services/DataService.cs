using MediaLibrary.DAL.DbContexts;
using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.DAL.Services.Interfaces;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace MediaLibrary.DAL.Services
{
    public class DataService : IDataService
    {
        private int timeout;
        private readonly IConfiguration configuration;
        private readonly IDbContextFactory<MediaLibraryEntities> dbContextFactory;

        public DataService(IConfiguration configuration, IDbContextFactory<MediaLibraryEntities> dbContextFactory)
        {
            timeout = 120;
            this.configuration = configuration;
            this.dbContextFactory = dbContextFactory;
        }

        public string GetDbServer()
        {
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder(configuration.GetConnectionString("MediaLibrary"));

            return builder.DataSource;
        }

        public string GetDbName()
        {
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder(configuration.GetConnectionString("MediaLibrary"));

            return builder.InitialCatalog;
        }

        public async Task<IEnumerable<T>> GetList<T>(Expression<Func<T, bool>> expression = null,
                                                     CancellationToken token = default(CancellationToken),
                                                     params Expression<Func<T, object>>[] includes) where T : class, IDataModel
        {
            IEnumerable<T> results = Enumerable.Empty<T>();

            using (var db = dbContextFactory.CreateDbContext())
            {
                IQueryable<T> query = db.Set<T>();

                db.Database.SetCommandTimeout(timeout);

                foreach (var include in includes)
                {
                    query = query.Include(include);
                }

                results = await (expression != null ? query.Where(expression) : query).ToListAsync(token);
            }

            return results;
        }

        public async Task<T> Get<T>(Expression<Func<T, bool>> expression = null,
                                    CancellationToken token = default(CancellationToken),
                                    params Expression<Func<T, object>>[] includes) where T : class, IDataModel
        {
            T result = default(T);

            using (var db = dbContextFactory.CreateDbContext())
            {
                IQueryable<T> query = db.Set<T>();

                db.Database.SetCommandTimeout(timeout);

                foreach (var include in includes)
                {
                    query = query.Include(include);
                }

                result = await (expression != null ? query.Where(expression) : query).FirstOrDefaultAsync(token);
            }

            return result;
        }

        public async Task<IEnumerable<T>> GetListAlt<T>(Expression<Func<T, bool>> expression = null,
                                             CancellationToken token = default(CancellationToken),
                                             params string[] includePaths) where T : class, IDataModel
        {
            IEnumerable<T> results = Enumerable.Empty<T>();

            using (var db = dbContextFactory.CreateDbContext())
            {
                IQueryable<T> query = db.Set<T>();

                db.Database.SetCommandTimeout(timeout);

                foreach (var include in includePaths)
                {
                    query = query.Include(include);
                }

                results = await (expression != null ? query.Where(expression) : query).ToListAsync(token);
            }

            return results;
        }

        public async Task<T> GetAlt<T>(Expression<Func<T, bool>> expression = null,
                                    CancellationToken token = default(CancellationToken),
                                    params string[] includePaths) where T : class, IDataModel
        {
            T result = default(T);

            using (var db = dbContextFactory.CreateDbContext())
            {
                IQueryable<T> query = db.Set<T>();

                db.Database.SetCommandTimeout(timeout);

                foreach (var include in includePaths)
                {
                    query = query.Include(include);
                }

                result = await (expression != null ? query.Where(expression) : query).FirstOrDefaultAsync(token);
            }

            return result;
        }

        public async Task<int> Insert<T>(T entity, CancellationToken token = default(CancellationToken)) where T : class, IDataModel
        {
            int result = default(int);

            using (var db = dbContextFactory.CreateDbContext())
            {
                db.Database.SetCommandTimeout(timeout);
                entity.ModifyDate = DateTime.Now;
                entity.CreateDate = DateTime.Now;
                db.Set<T>().Add(entity);
                result = await db.SaveChangesAsync(token);
            }

            return result;
        }

        public async Task<int> Insert<T>(IEnumerable<T> entities, CancellationToken token = default(CancellationToken)) where T : class, IDataModel
        {
            int result = default(int);
            IList<T> items = entities.ToList();

            using (var db = dbContextFactory.CreateDbContext())
            {
                foreach (var item in items)
                {
                    item.CreateDate = DateTime.Now;
                    item.ModifyDate = DateTime.Now;
                }

                db.Database.SetCommandTimeout(timeout);
                db.Set<T>().AddRange(items);
                result = await db.SaveChangesAsync(token);
            }

            return result;
        }

        public async Task<int> Delete<T>(object id, CancellationToken token = default(CancellationToken)) where T : class, IDataModel
        {
            int result = default(int);

            using (var db = dbContextFactory.CreateDbContext())
            {
                DbSet<T> set = null;
                T entity = null;

                db.Database.SetCommandTimeout(timeout);
                set = db.Set<T>();
                entity = await set.FindAsync(id);
                set.Remove(entity);
                result = await db.SaveChangesAsync(token);
            }

            return result;
        }

        public async Task<int> Delete<T>(T entity, CancellationToken token = default(CancellationToken)) where T : class, IDataModel
        {
            return await Delete<T>(entity?.Id, token);
        }

        public async Task<int> DeleteAll<T>(Expression<Func<T, bool>> expression = null, CancellationToken token = default(CancellationToken)) where T : class, IDataModel
        {
            int result = default(int);

            if (expression != null)
            {
                using (var db = dbContextFactory.CreateDbContext())
                {
                    DbSet<T> set = null;

                    db.Database.SetCommandTimeout(timeout);
                    set = db.Set<T>();
                    set.RemoveRange(set.Where(expression));
                    result = await db.SaveChangesAsync(token);
                }
            }
            else
            {
                result = await DeleteAll<T>(token: token);
            }

            return result;
        }

        public async Task<int> Update<T>(T entity, CancellationToken token = default(CancellationToken)) where T : class, IDataModel
        {
            int result = default(int);

            using (var db = dbContextFactory.CreateDbContext())
            {
                db.Database.SetCommandTimeout(timeout);
                entity.ModifyDate = DateTime.Now;
                db.Set<T>().Update(entity);
                result = await db.SaveChangesAsync(token);
            }

            return result;
        }

        public async Task<int> Count<T>(Expression<Func<T, bool>> expression = null, CancellationToken token = default(CancellationToken)) where T : class, IDataModel
        {
            int result = default(int);

            using (var db = dbContextFactory.CreateDbContext())
            {
                db.Database.SetCommandTimeout(timeout);
                result = expression != null ? await db.Set<T>().CountAsync(expression, token) : await db.Set<T>().CountAsync(token);
            }

            return result;
        }

        public async Task<bool> Exists<T>(Expression<Func<T, bool>> expression = null, CancellationToken token = default(CancellationToken)) where T : class, IDataModel
        {
            bool result = default(bool);

            using (var db = dbContextFactory.CreateDbContext())
            {
                db.Database.SetCommandTimeout(timeout);
                result = (expression != null ? await db.Set<T>().FirstOrDefaultAsync(expression, token) : await db.Set<T>().FirstOrDefaultAsync(token)) != null;
            }

            return result;
        }

        public async Task<int> Execute(string sql, CancellationToken token = default(CancellationToken), params object[] parameters)
        {
            int result = default(int);

            using (var db = dbContextFactory.CreateDbContext())
            {
                db.Database.SetCommandTimeout(timeout);
                result = await db.Database.ExecuteSqlRawAsync(sql, parameters, token);
            }

            return result;
        }

        public async Task<IEnumerable<TReturn>> SelectWhere<T, TReturn>(Expression<Func<T, TReturn>> selector,
            Expression<Func<T, bool>> predicate = default,
            CancellationToken token = default)
            where T : class, IDataModel
        {
            var result = default(IEnumerable<TReturn>);

            using (var db = dbContextFactory.CreateDbContext())
            {
                db.Database.SetCommandTimeout(timeout);
                predicate = predicate != default ? predicate : (t) => true;
                result = await db.Set<T>().Where(predicate).Select(selector).ToListAsync();
            }

            return result;
        }

        public SqlParameter CreateParameter(string name, object value) => new SqlParameter(name, value);

        public async Task<TResult> Max<TEntity, TResult>(Expression<Func<TEntity, TResult>> expression,
                                                         CancellationToken token = default(CancellationToken)) where TEntity : class
        {
            TResult result = default(TResult);

            using (var db = dbContextFactory.CreateDbContext())
            {
                var dbSet = db.Set<TEntity>();
                bool isEmpty = !dbSet.Any();

                db.Database.SetCommandTimeout(timeout);

                if (!isEmpty)
                {
                    result = await db.Set<TEntity>().MaxAsync(expression);
                }
            }

            return result;
        }
    }
}