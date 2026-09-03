using ShopManagementWebApp.Server.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace ShopManagementWebApp.Server.Dtos
{
    public class UpdateOrderDto
    {
        public int Id { get; set; }
        public double? TotalCost { get; set; }
        public DateTime? OrderDate { get; set; }
        public Enums.OrderStatus? OrderStatus { get; set; }
        public Enums.PaymentStatus? PaymentStatus { get; set; }
        public string? OrderAddress { get; set; }
        public string? OrderCountry { get; set; }
        public List<OrderItem>? Items { get; set; }
    }
}
