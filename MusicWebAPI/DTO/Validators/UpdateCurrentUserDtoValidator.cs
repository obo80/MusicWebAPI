using FluentValidation;
using MusicWebAPI.Data;
using MusicWebAPI.DTO.UserDto;

namespace MusicWebAPI.DTO.Validators
{
    public class UpdateCurrentUserDtoValidator : AbstractValidator<UpdateCurrentUserDto>
    {
        public UpdateCurrentUserDtoValidator(MusicWebDbContext dbContext)
        {
            RuleFor (x => x.Email)
                .EmailAddress().When(x => !String.IsNullOrEmpty(x.Email))
                .WithMessage("Invalid email format");
        }
    }
}
