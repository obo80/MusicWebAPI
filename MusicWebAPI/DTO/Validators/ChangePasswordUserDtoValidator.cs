using FluentValidation;
using MusicWebAPI.Data;
using MusicWebAPI.DTO.UserDto;

namespace MusicWebAPI.DTO.Validators
{
    public class ChangePasswordUserDtoValidator : AbstractValidator<ChangePasswordDto>
    {
        public ChangePasswordUserDtoValidator(MusicWebDbContext dbContext)
        {

            RuleFor(x => x.Password)
                .NotEmpty().WithMessage("Password is required.")
                .MinimumLength(6).WithMessage("Password must be at least 6 characters long.");

            RuleFor(x => x.NewPassword)
                .NotEmpty().WithMessage("New Password is required.")
                .MinimumLength(6).WithMessage("New Password must be at least 6 characters long.");

            RuleFor(x => x.ConfirmPassword)
                .NotEmpty().WithMessage("Confirm Password is required.")
                .Equal(x => x.NewPassword).WithMessage("Passwords do not match.");
        }
    }
}
