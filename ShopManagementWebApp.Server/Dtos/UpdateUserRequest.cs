using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Dtos
{
    public class UpdateUserRequest
    {
        public required User User { get; set; }
        public string? NewEmail { get; set; }
        public string? CurrentPassword { get; set; }
        public string? NewPassword { get; set; }
        public string? NewFirstName { get; set; }
        public string? NewLastName { get; set; }
        public string? NewAddress { get; set; }
        public string? NewCountry { get; set; }
        public string? NewPhone { get; set; }
    }
}
