export default interface IListItem<IdType, ValueType> {
    Id: IdType;
    Name?: string;
    Value?: ValueType;
    IsSelected: boolean;
}