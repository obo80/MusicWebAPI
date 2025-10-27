using FluentValidation;
using MusicWebAPI.Data;
using MusicWebAPI.DTO.UserDto;

namespace MusicWebAPI.DTO.Validators
{
    public class RegisterUserDtoValidator : AbstractValidator<RegisterUserDto>
    {

        public RegisterUserDtoValidator(MusicWebDbContext dbContext)
        {


            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format");

            RuleFor(x => x.Email)
                .Custom((value, context) =>
                {
                    var emailInUse = dbContext.Users.Any(u => u.Email == value);
                    if (emailInUse)
                    {
                        context.AddFailure("Email", "Email is already in use");
                    }
                });

            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required");

            RuleFor(x => x.Name)
                .Custom((value, context) =>
                {
                    var nameInUse = dbContext.Users.Any(u => u.Name == value);
                    if (nameInUse)
                    {
                        context.AddFailure("Name", "Name is already in use");
                    }
                });


            RuleFor(x => x.Password)
                .MinimumLength(6).WithMessage("Password needs at least 6 characters");

            RuleFor(x => x.ConfirmPassword).Equal(e => e.Password)
                .WithMessage("Password does not match");
        }
    }
}
