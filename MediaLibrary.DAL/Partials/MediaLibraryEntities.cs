using MediaLibrary.DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MediaLibrary.Shared.Enums;

namespace MediaLibrary.DAL.DbContexts
{
    public partial class MediaLibraryEntities
    {
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Configuration>()
                        .Property(e => e.Type)
                        .HasConversion<string>();
            modelBuilder.Entity<Playlist>()
                        .Property(e => e.Type)
                        .HasConversion<int>();
            modelBuilder.Entity<Transaction>()
                        .Property(e => e.Type)
                        .HasConversion<int>();
            modelBuilder.Entity<Transaction>()
                        .Property(e => e.Status)
                        .HasConversion<int>();
        }
    }
}
