using FluentValidation;
using MusicWebAPI.DTO.UserDto;

namespace MusicWebAPI.DTO.Validators
{
    public class RatingDtoValidator : AbstractValidator<RatingDto>
    {
        public RatingDtoValidator()
        {
            RuleFor(r => r.Value)
                .InclusiveBetween(1, 5)
                .WithMessage("Rating must be between 1 and 5.");
        }
    }
}
