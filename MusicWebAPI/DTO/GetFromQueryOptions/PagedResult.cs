using Microsoft.EntityFrameworkCore;
using MusicWebAPI.DTO.GetQuery;
using MusicWebAPI.Entities;

namespace MusicWebAPI.DTO.GetFromQueryOptions
{
    public class PagedResult<T>
    {
        public List<T> Items { get; set; }
        public int? TotalPages { get; set; }

        public int? ItemsFrom { get; set; }
        public int? ItemsTo { get; set; }
        public int? TotalItemsCount { get; set; }

        public PagedResult(List<T> items, int totalCount, int pageSize, int pageNumber)
        {
            Items = items;
            TotalItemsCount = totalCount;
            if (pageSize >0)
            {
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
                ItemsFrom = (pageNumber - 1) * pageSize + 1;
                ItemsTo = Math.Min(pageNumber * pageSize, totalCount); 
            }
        }

        public PagedResult(List<T> items, FromQueryOptions queryOptions)
        {
            //Items = GetPagedResult(queryOptions, items).Result;
            Items = items;
            TotalItemsCount = items.Count();
            if (queryOptions.PageSize > 0)
            {
                TotalPages = (int)Math.Ceiling(TotalItemsCount.Value / (double)queryOptions.PageSize);
                ItemsFrom = (queryOptions.PageNumber - 1) * queryOptions.PageSize + 1;
                ItemsTo = Math.Min(queryOptions.PageNumber * queryOptions.PageSize, TotalItemsCount.Value);
            }
        }
    }
}
