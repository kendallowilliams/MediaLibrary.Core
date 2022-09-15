using MediaLibrary.DAL.Models.Interfaces;
using MediaLibrary.Shared.Models.Configurations;
using MediaLibrary.Shared.Models.Interfaces;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.DAL.Models
{
    public partial class Configuration : IDataModel
    {
        public ConfigurationTypes Type { get; set; }

        public T GetConfigurationObject<T>() where T: IConfiguration, new()
        {
            return !string.IsNullOrWhiteSpace(JsonData) ? JsonConvert.DeserializeObject<T>(JsonData) : new T();
        }

        public object GetConfigurationObject(Type type)
        {
            bool hasInterface = type.GetInterface(nameof(IConfiguration)) != null;

            return hasInterface && !string.IsNullOrWhiteSpace(JsonData) ? JsonConvert.DeserializeObject(JsonData, type) : Activator.CreateInstance(type);
        }

        public void SetConfigurationObject<T>(T entity) where T : IConfiguration, new()
        {
            JsonData = JsonConvert.SerializeObject(entity);
        }
    }
}
