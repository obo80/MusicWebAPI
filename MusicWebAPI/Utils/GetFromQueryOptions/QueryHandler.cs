using MusicWebAPI.Entities;
using MusicWebAPI.Entities.User;
using System.Linq.Expressions;
using System.Security.Cryptography.Xml;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Net.Mime.MediaTypeNames;

namespace MusicWebAPI.Utils.GetFromQueryOptions
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

        private IQueryable<T> ApplyQueryOptions(IQueryable<Album> query)
        {
            var albumQuery = ApplySearchPhrase(query);
            SearchPhraseFilteredItems = albumQuery.Count();
            albumQuery = ApplySorting(albumQuery);
            var paginatedQuery = ApplyPagination((IQueryable<T>)albumQuery);
            return paginatedQuery;
        }

        private IQueryable<T> ApplyQueryOptions(IQueryable<Song> query)
        {
            var songQuery = ApplySearchPhrase(query);
            SearchPhraseFilteredItems = songQuery.Count();
            songQuery = ApplySorting(songQuery);
            var paginatedQuery = ApplyPagination((IQueryable<T>)songQuery);
            return paginatedQuery;
        }

        private IQueryable<T> ApplyQueryOptions(IQueryable<User> query)
        {
            var userQuery = ApplySearchPhrase(query);
            SearchPhraseFilteredItems = userQuery.Count();
            userQuery = ApplySorting(userQuery);
            var paginatedQuery = ApplyPagination((IQueryable<T>)userQuery);
            return paginatedQuery;
        }

        #region Search Phrase

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

        private IQueryable<User> ApplySearchPhrase(IQueryable<User> queryable)
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
            return queryable;
        }
        #endregion


        #region Sorting
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
                outputQuery = _queryOptions.SortDirection == SortDirection.ASC || _queryOptions.SortDirection is null
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

        private IQueryable<Album> ApplySorting(IQueryable<Album> inputQuery)
        {
            var outputQuery = inputQuery;
            if (!string.IsNullOrEmpty(_queryOptions.SortBy))
            {
                var columnSelector = new Dictionary<string, Expression<Func<Album, object>>>
                {
                    {nameof (Album.Title), a => a.Title },
                    {nameof (Album.AverageRating), a => a.AverageRating },
                    {nameof (Album.Ratings.Count), a => a.Ratings.Count }
                };
                var selectedColumn = columnSelector[_queryOptions.SortBy];
                outputQuery = _queryOptions.SortDirection == SortDirection.ASC || _queryOptions.SortDirection is null
                    ? inputQuery.OrderBy(selectedColumn)
                    : inputQuery.OrderByDescending(selectedColumn);

            }
            //default sorting by title
            else
            {
                outputQuery = inputQuery.OrderBy(a => a.Title);
            }
            return outputQuery;

        }

        private IQueryable<Song> ApplySorting(IQueryable<Song> inputQuery)
        {
            var outputQuery = inputQuery;
            if (!string.IsNullOrEmpty(_queryOptions.SortBy))
            {
                var columnSelector = new Dictionary<string, Expression<Func<Song, object>>>
                {
                    {nameof (Song.Title), s => s.Title },
                    {nameof (Song.AverageRating), s => s.AverageRating },
                    {nameof (Song.Ratings.Count), s => s.Ratings.Count }
                };
                var selectedColumn = columnSelector[_queryOptions.SortBy];
                outputQuery = _queryOptions.SortDirection == SortDirection.ASC || _queryOptions.SortDirection is null
                    ? inputQuery.OrderBy(selectedColumn)
                    : inputQuery.OrderByDescending(selectedColumn);

            }
            //default sorting by title
            else
            {
                outputQuery = inputQuery.OrderBy(a => a.Title);
            }
            return outputQuery;

        }
        private IQueryable<User> ApplySorting(IQueryable<User> inputQuery)
        {
            var outputQuery = inputQuery;
            if (!string.IsNullOrEmpty(_queryOptions.SortBy))
            {
                var columnSelector = new Dictionary<string, Expression<Func<User, object>>>
                {
                    {nameof (User.Name), u => u.Name },
                    {nameof (User.Email), u => u.Email },
                    {nameof (User.Role), u => u.Role }
                };
                var selectedColumn = columnSelector[_queryOptions.SortBy];
                outputQuery = _queryOptions.SortDirection == SortDirection.ASC || _queryOptions.SortDirection is null
                    ? inputQuery.OrderBy(selectedColumn)
                    : inputQuery.OrderByDescending(selectedColumn);

            }
            //default sorting by User name
            else
            {
                outputQuery = inputQuery.OrderBy(u => u.Name);
            }
            return outputQuery;

        }
        #endregion

        #region Pagination
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
        #endregion  

    }
}
