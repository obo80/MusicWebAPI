# MusicWebAPI

Simple ASP.NET Core Web API for managing songs, albums, artists, ratings and users management.

- Language: C# 13.0  
- Target framework: .NET 9

## Summary
MusicWebAPI provides DTOs, services and controllers to manage songs, albums, artists, per-item ratings and user accounts. It is a small, extensible Web API project intended to be run locally or hosted in a container/VM.

## Requirements
- .NET 9 SDK
- Optional: Visual Studio 2022 (or later) or VS Code
- Optional: a relational database (SQL Server, PostgreSQL, SQLite) depending on the configured provider
- Optional: EF Core tools for database migrations: `dotnet tool install --global dotnet-ef` (if not already installed)

## Quick start (CLI)
1. Clone the repository:  
   ``git clone https://github.com/obo80/MusicWebAPI.git``  
   ``cd MusicWebAPI``

2. Configure the database connection (if applicable) by editing `appsettings.json` or environment variables. Typical key: `ConnectionStrings:MusicWebAPILocalDbConnection`.

3. Configure JWT settings in `appsettings.json` under the `Authentication` section:  
``{ "Authentication": { "JwtKey": "your-very-strong-secret", "JwtIssuer": "MusicWebAPI", "JwtExpireDays": 7 } }``


4. (Optional) Apply EF Core migrations:  
   ``dotnet ef database update --project MusicWebAPI``

5. Run the API:  
   ``dotnet run --project MusicWebAPI``

The API will start on the configured URL (check console output, typically `https://localhost:5001` / `http://localhost:5000`).

## Quick start (Visual Studio)
1. Open the solution in Visual Studio 2022.  
2. Select the `MusicWebAPI` startup project and the __Debug__ configuration.  
3. Start debugging with __F5__ or start without debugging with __Ctrl+F5__.

You can also use __Build > Build Solution__ to compile.

## Authentication & User Management
This project includes built-in user management and JWT-based authentication.

- Authentication is implemented with JWT. Settings are loaded into `AuthenticationSettings` and registered in `Program.cs`.
- Passwords are stored using `IPasswordHasher<User>` (hashed + salted).
- Default roles are seeded by `Seeders/MainSeeder` — `User`, `Creator`, `Admin`.
  - `User` — standard user (can rate/comment/view).
  - `Creator` — can add/edit/delete their own content (used by controllers such as `ArtistController`).
  - `Admin` — full management rights (used by `UserController`).

Role-based authorization is enforced with `[Authorize(Roles = "...")]` attributes on controllers:
- `UserController` (`api/user`) requires `Admin`.
- `ArtistController` requires `Creator` for modifications; anonymous access is allowed for reads.
- Account operations use `[Authorize]` where appropriate.

Authentication-related classes & locations:
- Controllers: `Controllers/AccountController.cs`, `Controllers/UserController.cs`
- Services: `Services/AccountService.cs`, `Services/UserService.cs`
- DTOs: `DTO/UserDto/*` (`RegisterUserDto`, `LoginDto`, `UserDto`, `UpdateUserDto`, etc.)
- Seeder: `Seeders/MainSeeder.cs` (adds roles and genres)
- Settings: `AuthenticationSettings.cs`

## Account endpoints (summary)
- POST `/api/account/register`  
  - Register new user. Input: `RegisterUserDto` (`Name`, `Email`, `Password`, `ConfirmPassword`, optional `FirstName`, `LastName`).  
  - Response: created `UserDto`.

- POST `/api/account/login`  
  - Login with `Email` and `Password` (LoginDto).  
  - Response: JWT token string.

- GET `/api/account/me` (authorized)  
  - Returns current user (`UserDto`). Provide Authorization header.

- PUT `/api/account/me` (authorized)  
  - Update current user (name, email, first/last name). Input: `UpdateCurrentUserDto`.

- POST `/api/account/change-password` (authorized)  
  - Change password. Input: `ChangePasswordDto` (current and new passwords).

- DELETE `/api/account/me` (authorized)  
  - Delete current user account.

Admin-only user management:
- GET `/api/user` (Admin) — paginated list of users (`UserService.GetAllUsers`).
- GET `/api/user/{id}` (Admin) — get user by id.
- PUT `/api/user/{id}` (Admin) — update user (role assignment allowed).
- DELETE `/api/user/{id}` (Admin) — delete user.

Note: Exact routes and DTO shapes are defined in `Controllers/` and `DTO/UserDto/`.

## Using the JWT token
After successful login you receive a token. Set the `Authorization` header on subsequent requests:

Authorization: Bearer <token>

Example (curl):
- Register
curl -X POST https://localhost:5001/api/account/register \
  -H "Content-Type: application/json" \
  -d '{"name":"alice","email":"alice@example.com","password":"secret123","confirmPassword":"secret123"}'

- Login
curl -X POST https://localhost:5001/api/account/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret123"}'

- Get current user
curl -H "Authorization: Bearer <token>" https://localhost:5001/api/account/me

## Validation and security notes
- DTO validation is implemented with FluentValidation (see `DTO/Validators`).
- Passwords are validated and hashed, confirm password is checked by `RegisterUserDtoValidator`.
- Ensure `JwtKey` is a secure, random secret in production and not checked into source control.
- For production use: enable HTTPS, set `RequireHttpsMetadata` appropriately and rotate secrets safely (environment variables or secret stores).

## API documentation
Project includes Swagger/OpenAPI, the interactive UI is available at:
`/api/swagger` when running in Development.

## Example requests
Typical DTO for a song (matches `SongDto`):  
`{ "id": 0, "title": "My Song", "description": "Short description", "lenght": 240, "releasedYear": 2023, "albumId": 1, "albumName": "Album Title", "artistId": 1, "artistName": "Artist Name", "averageRating": 4.5 }`

Example: get songs (replace host/port accordingly) 
``curl https://localhost:5001/api/songs``

Example: create a song  
``curl -X POST https://localhost:5001/api/songs``  
 `` -H "Content-Type: application/json"``  
  ``-d '{"title":"New Song","artistId":1,"lenght":180}'``  

Note: Exact endpoint routes depend on the controllers in `Controllers/`. Check those files or the Swagger UI for canonical routes.

## Project structure (high level)
- `Controllers/` — API controllers (expose endpoints)
- `DTO/` — data transfer objects (e.g., `SongDto`, `AlbumDto`, `ArtistDto`, `UserDto`)
- `Entities/` — domain entities and EF models
- `Services/` — business logic (e.g., `SongService`, `AlbumService`, `UserService`, `AccountService`)
- `Utils/` — helper classes and utilities
- `Seeders/` — sample data seeding (`MainSeeder` seeds `Roles` and `Genres`)

## Contributing
Contributions welcome. Open issues or pull requests. Follow repository coding style and include unit tests for new logic.

## License
No license file included in the repository. 


## Live demo / Azure deployment

The API is published to Azure App Service and is available at:

- Live site: https://musicwebapi-app.azurewebsites.net/ (App Service: `musicwebapi-app`)

![Live](https://img.shields.io/website?down_color=red&down_message=down&up_message=up&url=https%3A%2F%2Fmusicwebapi-app.azurewebsites.net)

Deployment details:
- Hosting: Azure App Service (`musicwebapi-app`)
- Target framework: .NET 9
- Recommended: keep production secrets in Azure App Service Configuration or Azure Key Vault and use a staging slot for zero-downtime deployments.
