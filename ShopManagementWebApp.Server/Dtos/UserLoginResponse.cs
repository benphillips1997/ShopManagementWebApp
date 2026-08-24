using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Dtos
{
    public class UserLoginResponse
    {
        public User? User { get; set; }
        public string? ErrorMessage { get; set; }
        public bool Success { get; set; }
    }
}
