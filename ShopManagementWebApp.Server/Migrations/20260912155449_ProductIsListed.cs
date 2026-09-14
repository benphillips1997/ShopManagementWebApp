using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ShopManagementWebApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class ProductIsListed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsListed",
                table: "Products",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsListed",
                table: "Products");
        }
    }
}
