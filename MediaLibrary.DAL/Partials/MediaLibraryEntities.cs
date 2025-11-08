using MediaLibrary.DAL.Models;
using Microsoft.EntityFrameworkCore;

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
