using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using MusicWebAPI.Data;
using MusicWebAPI.DTO.UserDto;
using MusicWebAPI.Entities.User;
using MusicWebAPI.Exceptions;
using MusicWebAPI.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MusicWebAPI.Services
{
    public class AccountService : IAccountService
    {
        private readonly MusicWebDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;

        public AccountService(MusicWebDbContext dbContext,IMapper mapper, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }
        public async Task<UserDto> RegisterUser(RegisterUserDto dto)
        {
            var newUser = new User()
            {
                Name = dto.Name,
                Email = dto.Email,
                RoleId = 1 //default role 'User' - new created user cannot assign himself higher role

            };

            var hashedPassword =  _passwordHasher.HashPassword(newUser, dto.Password);
            newUser.PasswordHash = hashedPassword;
            await _dbContext.Users.AddAsync(newUser);
            await _dbContext.SaveChangesAsync();
            var newUserDto = _mapper.Map<UserDto>(newUser);
            return newUserDto;
        }

        public async Task<string> Login(LoginDto dto)
        {
            var user = await _dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user is null)
            {
                throw new BadRequestException("Invalid username or password");
            }
            var passwordHash = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (passwordHash == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Invalid username or password");
            }
            var token = GenerateJwtToken(user);
            return token;

        }

        private string GenerateJwtToken(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role.Name),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_authenticationSettings.JwtKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expires = DateTime.Now.AddDays(_authenticationSettings.JwtExpireDays);

            var token = new JwtSecurityToken(
                _authenticationSettings.JwtIssuer,
                _authenticationSettings.JwtIssuer,
                claims,
                expires: expires,
                signingCredentials: cred);

            var tokenHandler = new JwtSecurityTokenHandler();
            
            return tokenHandler.WriteToken(token);
        }

        public async Task<UserDto> GetCurrentUser(string authorization)
        {
            var userId = GetUserIdFromClaims(authorization);
            var user = await _dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            return _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> UpdateCurrentUser(UpdateCurrentUserDto dto, string authorization)
        {
            var userId = GetUserIdFromClaims(authorization);
            var updatedUser = await _dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Id == userId);
            if (updatedUser is null)
                throw new NotFoundException("User not found");            

            if (!String.IsNullOrEmpty(dto.Name))    //empty name - do not update
            {
                if (await _dbContext.Users.AnyAsync(u => u.Name == dto.Name && u.Id != userId))
                {
                    throw new BadRequestException("Name is already in use");
                }
                updatedUser.Name = dto.Name;
            }

            if (!String.IsNullOrEmpty(dto.Email))  //empty email - do not update
            {
                if (await _dbContext.Users.AnyAsync(u => u.Email == dto.Email && u.Id != userId))
                {
                    throw new BadRequestException("Email is already in use");
                }
                updatedUser.Email = dto.Email;
            }
            updatedUser.FirstName = dto.FirstName;
            updatedUser.LastName = dto.LastName;


            await _dbContext.SaveChangesAsync();

            var userDto = _mapper.Map<UserDto>(updatedUser);
            return userDto;
        }

        public async Task DeleteCurrentUser(string authorization)
        {
            var userId = GetUserIdFromClaims(authorization);
            var user = await _dbContext.Users.FindAsync(userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();
        }

        private int GetUserIdFromClaims(string authorization)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwt = authorization.Replace("Bearer ", "");
            var token = handler.ReadJwtToken(jwt);
            var userIdClaim = token.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim is null)
            {
                throw new BadRequestException("Invalid token");
            }
            return int.Parse(userIdClaim.Value);
        }
        public async Task ChangePassword(ChangePasswordDto dto, string authorization)
        {
            var userId = GetUserIdFromClaims(authorization);
            var user =  _dbContext.Users.Find(userId);
            if (user is null)
            {
                throw new NotFoundException("User not found");
            }
            var passwordVerificationResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (passwordVerificationResult == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Current password is incorrect");
            }
            var newHashedPassword = _passwordHasher.HashPassword(user, dto.NewPassword);
            user.PasswordHash = newHashedPassword;
            await _dbContext.SaveChangesAsync();
        }

    }
}
