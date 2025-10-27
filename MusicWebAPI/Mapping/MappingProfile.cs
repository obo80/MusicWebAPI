using AutoMapper;
using MusicWebAPI.DTO;
using MusicWebAPI.DTO.UserDto;
using MusicWebAPI.Entities;
using MusicWebAPI.Entities.User;

namespace MusicWebAPI.Mapping
{
    public class MappingProfile :Profile
    {
        public MappingProfile()
        {
            CreateMap<Artist, ArtistDto>();
            CreateMap<Album, AlbumDto>();
            CreateMap<Song, SongDto>();
            CreateMap<User, UserDto>()
                .ForMember(dto => dto.RoleName, c => c.MapFrom(u => u.Role.Name));

            CreateMap<CreateArtistDto, Artist>();
            CreateMap<CreateAlbumDto, Album>();
            CreateMap<CreateSongDto, Song>();



        }
    }
}
