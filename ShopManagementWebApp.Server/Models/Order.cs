using System.ComponentModel.DataAnnotations.Schema;

namespace ShopManagementWebApp.Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public double TotalCost { get; set; }
        public DateTime OrderDate { get; set; }
        public Enums.OrderStatus OrderStatus { get; set; }
        public Enums.PaymentStatus PaymentStatus { get; set; }
        public required string OrderAddress { get; set; }
        public required string OrderCountry { get; set; }
        public List<OrderItem> Items { get; set; } = new List<OrderItem>();

        [NotMapped]
        public User? User { get; set; }
    }
}
