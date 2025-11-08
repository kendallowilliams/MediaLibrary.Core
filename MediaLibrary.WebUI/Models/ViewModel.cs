using MediaLibrary.WebUI.Models.Interfaces;

namespace MediaLibrary.WebUI.Models
{
    public abstract class ViewModel<TConfig> : IViewModel where TConfig : new()
    {
        public ViewModel()
        {
            Configuration = new TConfig();
        }

        public TConfig Configuration { get; set; }
    }
}