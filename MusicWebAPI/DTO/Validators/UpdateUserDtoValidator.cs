using FluentValidation;
using MusicWebAPI.Data;
using MusicWebAPI.DTO.UserDto;

namespace MusicWebAPI.DTO.Validators
{
    public class UpdateUserDtoValidator : AbstractValidator<UpdateUserDto>
    {
        public UpdateUserDtoValidator(MusicWebDbContext dbContext)
        {
            RuleFor(x => x.RoleId).GreaterThan(0).LessThanOrEqualTo(dbContext.Roles.Count());

            //RuleFor(x => x.Email)
            //    .Custom((value, context) =>
            //    {
            //        var emailInUse = dbContext.Users
            //        .Where(u => u.Id != context.InstanceToValidate.Id)
            //        .Any(u => u.Email == value);
            //        if (emailInUse)
            //        {
            //            context.AddFailure("Email", "Email is already in use");
            //        }
            //    });


            RuleFor(x => x.Email)
                .EmailAddress().When(x => !String.IsNullOrEmpty(x.Email))
                .WithMessage("Invalid email format");
        }
    }
}
