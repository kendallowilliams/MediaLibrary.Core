using MediaLibrary.Shared.Models.Interfaces;

namespace MediaLibrary.Shared.Models
{
    public class ListItem<T_ID, T_Value> : IListItem<T_ID, T_Value>
    {
        public ListItem() { }

        public ListItem(T_ID id, string name, T_Value value = default(T_Value))
        {
            Id = id;
            Name = name;
            Value = value;
        }

        public T_ID Id { get; set; }
        public string Name { get; set; }
        public T_Value Value { get; set; }
        public bool IsSelected { get; set; }
    }
}
