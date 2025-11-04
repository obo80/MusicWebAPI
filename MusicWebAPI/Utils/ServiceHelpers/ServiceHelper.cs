using MusicWebAPI.Exceptions;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace MusicWebAPI.Utils.ServiceHelpers
{
    public class ServiceHelper
    {
        public static int GetUserIdFromClaims(string authorization)
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

        public static double CountAverageRating(IEnumerable<int> ratingValues)
        {
            if (ratingValues == null || !ratingValues.Any())
            {
                throw new ArgumentException("Ratings collection is empty");
            }
            int sum = 0;
            int count = 0;
            foreach (var rating in ratingValues)
            {
                sum += rating;
                count++;
            }
            var result = (double)sum / count;
            return result;
        }

    }


    
}
