using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MusicWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class ratingEnities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "SongRatings",
                newName: "LastUpdateUserId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "ArtistRatings",
                newName: "LastUpdateUserId");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "AlbumRatings",
                newName: "LastUpdateUserId");

            migrationBuilder.AddColumn<double>(
                name: "AverageRating",
                table: "Songs",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "CreateUserId",
                table: "SongRatings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedAt",
                table: "SongRatings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "AverageRating",
                table: "Artists",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "CreateUserId",
                table: "ArtistRatings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedAt",
                table: "ArtistRatings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "AverageRating",
                table: "Albums",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "CreateUserId",
                table: "AlbumRatings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "LastUpdatedAt",
                table: "AlbumRatings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AverageRating",
                table: "Songs");

            migrationBuilder.DropColumn(
                name: "CreateUserId",
                table: "SongRatings");

            migrationBuilder.DropColumn(
                name: "LastUpdatedAt",
                table: "SongRatings");

            migrationBuilder.DropColumn(
                name: "AverageRating",
                table: "Artists");

            migrationBuilder.DropColumn(
                name: "CreateUserId",
                table: "ArtistRatings");

            migrationBuilder.DropColumn(
                name: "LastUpdatedAt",
                table: "ArtistRatings");

            migrationBuilder.DropColumn(
                name: "AverageRating",
                table: "Albums");

            migrationBuilder.DropColumn(
                name: "CreateUserId",
                table: "AlbumRatings");

            migrationBuilder.DropColumn(
                name: "LastUpdatedAt",
                table: "AlbumRatings");

            migrationBuilder.RenameColumn(
                name: "LastUpdateUserId",
                table: "SongRatings",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "LastUpdateUserId",
                table: "ArtistRatings",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "LastUpdateUserId",
                table: "AlbumRatings",
                newName: "UserId");
        }
    }
}
