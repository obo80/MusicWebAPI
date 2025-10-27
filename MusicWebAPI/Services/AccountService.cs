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
        private readonly IPasswordHasher<User> _passwordHasher;
        private readonly AuthenticationSettings _authenticationSettings;

        public AccountService(MusicWebDbContext dbContext, IPasswordHasher<User> passwordHasher, AuthenticationSettings authenticationSettings)
        {
            _dbContext = dbContext;
            _passwordHasher = passwordHasher;
            _authenticationSettings = authenticationSettings;
        }
        public async Task RegisterUser(RegisterUserDto dto)
        {
            var newUser = new User()
            {
                Name = dto.Name,
                Email = dto.Email,
                RoleId = dto.RoleId

            };

            var hashedPassword =  _passwordHasher.HashPassword(newUser, dto.Password);
            newUser.PasswordHash = hashedPassword;
            await _dbContext.Users.AddAsync(newUser);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<string> GenerateJWT(LoginDto dto)
        {
            var user = await _dbContext.Users
                .Include(u => u.Role)
                .FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user is null) 
            {
                throw new BadRequestException("Invalid username or password");
            }
            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
            if (result == PasswordVerificationResult.Failed)
            {
                throw new BadRequestException("Invalid username or password");
            }

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
    }
}
