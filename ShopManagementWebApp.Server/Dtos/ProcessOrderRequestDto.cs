using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Dtos
{
    public class ProcessOrderRequestDto
    {
        public required double AmountToPay { get; set; }
        public required Order Order { get; set; }
        public string Currency { get; set; } = "gbp";
    }
}
