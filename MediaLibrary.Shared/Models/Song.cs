namespace MediaLibrary.Shared.Models
{
    public class Song
    {
        public Song() { }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Album { get; set; }
        public string Artist { get; set; }
        public string Genre { get; set; }
        public int? Position { get; set; }
    }
}