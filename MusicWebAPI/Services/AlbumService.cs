using AutoMapper;
using MusicWebAPI.Data;
using MusicWebAPI.Services.Interfaces;

namespace MusicWebAPI.Services
{
    public class AlbumService : IAlbumService
    {
        private readonly MusicWebDbContext _dbContext;
        private readonly IMapper _mapper;

        public AlbumService(MusicWebDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
    }
}
