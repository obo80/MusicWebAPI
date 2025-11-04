namespace MusicWebAPI.Utils.GetFromQueryOptions
{
    public class FromQueryOptions
    {
        public string? SearchPhrase { get; set; }
        public int PageNumber { get; set; } = 1; //default value
        public int PageSize { get; set; } = 0; //0 means all items
        public string? SortBy { get; set; }
        public SortDirection? SortDirection { get; set; }
    }
}
