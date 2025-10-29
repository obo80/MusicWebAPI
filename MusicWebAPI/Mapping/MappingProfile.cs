using AutoMapper;
using MusicWebAPI.DTO;
using MusicWebAPI.DTO.UserDto;
using MusicWebAPI.Entities;
using MusicWebAPI.Entities.Rating;
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

            CreateMap<RatingDto, ArtistRating>();
            CreateMap<RatingDto, AlbumRating>();
            CreateMap<RatingDto, SongRating>();

            CreateMap<UpdateArtistDto, Artist>();
            CreateMap<UpdateAlbumDto, Album>();
            CreateMap<UpdateSongDto, Song>();

            CreateMap<ArtistRating, RatingDto>();
            CreateMap<AlbumRating, RatingDto>();
            CreateMap<SongRating, RatingDto>();

            CreateMap<RatingDto, ArtistRating>();
            CreateMap<RatingDto, AlbumRating>();
            CreateMap<RatingDto, SongRating>();

        }
    }
}
