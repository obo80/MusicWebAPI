using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MusicWebAPI.Data;
using MusicWebAPI.DTO.UserDto;
using MusicWebAPI.Exceptions;
using MusicWebAPI.Services.Interfaces;

namespace MusicWebAPI.Services
{
    public class UserService :IUserService
    {
        private readonly MusicWebDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;

        public UserService(MusicWebDbContext dbContext, IMapper mapper, ILogger<UserService> logger)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsers()
        {
            var users = await _dbContext.Users
                .Include(u => u.Role)
                .ToListAsync();

            var usersDto = _mapper.Map<List<UserDto>>(users);
            return usersDto;
        }
        public async Task<UserDto> GetUserById(int id)
        {
            var user = await _dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == id);
            if (user is null)
                throw new NotFoundException("User not found");
            
            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public async Task<UserDto> UpdateUserById(int id, UpdateUserDto dto)
        {
            var updatedUser = await _dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == id);
            if (updatedUser is null) 
                throw new NotFoundException("User not found");


            if (!String.IsNullOrEmpty(dto.Name))    //empty name - do not update
            {
                if (await _dbContext.Users.AnyAsync(u => u.Name == dto.Name && u.Id != id))
                {
                    throw new BadRequestException("Name is already in use");
                }
                updatedUser.Name = dto.Name;
            }

            if (!String.IsNullOrEmpty(dto.Email))  //empty email - do not update
            {
                if (await _dbContext.Users.AnyAsync(u => u.Email == dto.Email && u.Id != id))
                {
                    throw new BadRequestException("Email is already in use");
                }
                updatedUser.Email = dto.Email;
            }
            
            if (dto.RoleId.HasValue)
                updatedUser.RoleId = dto.RoleId.Value;

            await _dbContext.SaveChangesAsync();
            var userDto = _mapper.Map<UserDto>(updatedUser);
            return userDto;
        }

        public async Task DeleteUserById(int id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }


    }
}
