using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Dtos
{
    public class ReportDataResponse
    {
        public List<Order> Orders { get; set; } = new List<Order>();
        public bool Success { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
