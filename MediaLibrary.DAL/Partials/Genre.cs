using MediaLibrary.DAL.Models;
using MediaLibrary.DAL.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MediaLibrary.DAL.Models
{
    public partial class Genre: IDataModel
    {
        public Genre(string name): base()
        {
            Name = name;
        }

        public Genre(int id, string name): base()
        {
            Id = id;
            Name = name;
        }
    }
}
