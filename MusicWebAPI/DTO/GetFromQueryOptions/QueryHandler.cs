using MusicWebAPI.DTO.GetQuery;
using MusicWebAPI.Entities;
using MusicWebAPI.Entities.User;
using System.Linq.Expressions;
using System.Security.Cryptography.Xml;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Net.Mime.MediaTypeNames;

namespace MusicWebAPI.DTO.GetFromQueryOptions
{
    public class QueryHandler<T>
    {
        private readonly FromQueryOptions _queryOptions;
        private IQueryable<T> returnQuery;
        public int SearchPhraseFilteredItems { get; set; }

        public QueryHandler(FromQueryOptions queryOptions)
        {
            _queryOptions = queryOptions;
        }


        public IQueryable<T> ApplyQueryOptions(IQueryable<T> inputQuery)
        {

            if (_queryOptions is not null)
            {
                if (inputQuery is IQueryable<Artist> artistQuery)
                {
                    returnQuery = ApplyQueryOptions(artistQuery);
                }
                if (inputQuery is IQueryable<Album> albumQuery)
                {
                    returnQuery = ApplyQueryOptions(albumQuery);
                }
                if (inputQuery is IQueryable<Song> songQuery)
                {
                    returnQuery = ApplyQueryOptions(songQuery);
                }
                if (inputQuery is IQueryable<User> userQuery)
                {
                    returnQuery = ApplyQueryOptions(userQuery);
                }
                return returnQuery;
            }
            else 
            {
                return inputQuery;
            }

        }

        private IQueryable<T> ApplyQueryOptions(IQueryable<Artist> query)
        {
            var artistQuery = ApplySearchPhrase(query);
            SearchPhraseFilteredItems = artistQuery.Count();
            artistQuery = ApplySorting(artistQuery);
            var paginatedQuery = ApplyPagination((IQueryable<T>) artistQuery);
            return paginatedQuery;
        }

        private IQueryable<Artist> ApplySorting(IQueryable<Artist> inputQuery)
        {
            var outputQuery = inputQuery;
            if (!string.IsNullOrEmpty(_queryOptions.SortBy))
            {
                var columnSelector = new Dictionary<string, Expression<Func<Artist, object>>>
                {
                    {nameof (Artist.Name), a => a.Name },
                    {nameof (Artist.AverageRating), a => a.AverageRating },
                    {nameof (Artist.Ratings.Count), a => a.Ratings.Count }
                };
                var selectedColumn = columnSelector[_queryOptions.SortBy];
                outputQuery = (_queryOptions.SortDirection == SortDirection.ASC || _queryOptions.SortDirection is null)
                    ? inputQuery.OrderBy(selectedColumn)
                    : inputQuery.OrderByDescending(selectedColumn);

            }
            //default sorting by name
            else 
            {
                outputQuery = inputQuery.OrderBy(a => a.Name); 
            }
            return outputQuery;

        }

        private IQueryable<T> ApplyQueryOptions(IQueryable<User> userQuery)
        {
            throw new NotImplementedException();
        }

        private IQueryable<T> ApplyQueryOptions(IQueryable<Song> songQuery)
        {
            throw new NotImplementedException();
        }

        private IQueryable<T> ApplyQueryOptions(IQueryable<Album> albumQuery)
        {
            throw new NotImplementedException();
        }



        private IQueryable<Artist> ApplySearchPhrase(IQueryable<Artist> queryable)
        {
            // Apply search phrase filtering
            if (!string.IsNullOrEmpty(_queryOptions.SearchPhrase))
            {
                var lowerSearchPhrase = _queryOptions.SearchPhrase.ToLower();
                queryable = queryable.Where(a => a.Name.ToLower().Contains(lowerSearchPhrase));
            }           
            return queryable;
        }
        private IQueryable<Album> ApplySearchPhrase(IQueryable<Album> queryable)
        {
            // Apply search phrase filtering
            if (!string.IsNullOrEmpty(_queryOptions.SearchPhrase))
            {
                var lowerSearchPhrase = _queryOptions.SearchPhrase.ToLower();
                queryable = queryable.Where(a => a.Title.ToLower().Contains(lowerSearchPhrase));
            }
            return queryable;
        }

        private IQueryable<Song> ApplySearchPhrase(IQueryable<Song> queryable)
        {
            // Apply search phrase filtering
            if (!string.IsNullOrEmpty(_queryOptions.SearchPhrase))
            {
                var lowerSearchPhrase = _queryOptions.SearchPhrase.ToLower();
                queryable = queryable.Where(a => a.Title.ToLower().Contains(lowerSearchPhrase));
            }
            return queryable;
        }

        private IQueryable<T> ApplySearchPhrase(IQueryable<User> queryable)
        {
            // Apply search phrase filtering
            if (!string.IsNullOrEmpty(_queryOptions.SearchPhrase))
            {
                var lowerSearchPhrase = _queryOptions.SearchPhrase.ToLower();
                queryable = queryable.Where(u => u.Name.ToLower().Contains(lowerSearchPhrase)|| 
                                            u.FirstName.ToLower().Contains(lowerSearchPhrase)||
                                            u.LastName.ToLower().Contains(lowerSearchPhrase) ||
                                            u.Email.ToLower().Contains(lowerSearchPhrase));
            }
            return (IQueryable<T>)queryable;
        }


        private IQueryable<T> ApplyPagination(IQueryable<T> queryable)
        {
            // Apply pagination
            if (_queryOptions.PageSize > 0)
            {
                queryable = queryable
                    .Skip((_queryOptions.PageNumber - 1) * _queryOptions.PageSize)
                    .Take(_queryOptions.PageSize);
            }
            return queryable;
        }

    }
}
