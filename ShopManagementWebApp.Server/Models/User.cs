using System.ComponentModel.DataAnnotations.Schema;

namespace ShopManagementWebApp.Server.Models
{
    public class User
    {
        public int Id { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public Enums.UserType UserType { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public string? Country { get; set; }
        public string? Phone { get; set; }
        public List<Order> Orders { get; set; } = new List<Order>();
        public required Basket Basket { get; set; }
    }
}
