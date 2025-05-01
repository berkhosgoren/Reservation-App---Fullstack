using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ReservationAPI.Migrations
{
    /// <inheritdoc />
    public partial class confirmationIdAd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ConfirmationId",
                table: "ReservedInfos",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConfirmationId",
                table: "ReservedInfos");
        }
    }
}
