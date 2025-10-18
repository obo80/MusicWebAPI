using AutoMapper;
using MusicWebAPI.DTO;
using MusicWebAPI.Entities;

namespace MusicWebAPI.Mapping
{
    public class MappingProfile :Profile
    {
        public MappingProfile()
        {
            CreateMap<Artist, ArtistDto>();
            CreateMap<Album, AlbumDto>();
            CreateMap<Song, SongDto>();

            CreateMap<CreateArtistDto, Artist>();
        }
    }
}
