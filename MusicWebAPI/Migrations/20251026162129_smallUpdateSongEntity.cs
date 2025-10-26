using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MusicWebAPI.Migrations
{
    /// <inheritdoc />
    public partial class smallUpdateSongEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "releasedYear",
                table: "Songs",
                newName: "ReleasedYear");

            migrationBuilder.RenameColumn(
                name: "releasedYear",
                table: "Albums",
                newName: "ReleasedYear");

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "Songs",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ReleasedYear",
                table: "Songs",
                newName: "releasedYear");

            migrationBuilder.RenameColumn(
                name: "ReleasedYear",
                table: "Albums",
                newName: "releasedYear");

            migrationBuilder.AlterColumn<int>(
                name: "AlbumId",
                table: "Songs",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
