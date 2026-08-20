namespace ShopManagementWebApp.Server.Models
{
    public class Order
    {
        public int Id { get; set; }
        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
        public double TotalCost { get; set; }
        public DateTime OrderDate { get; set; }
        public Enums.OrderStatus OrderStatus { get; set; }
        public required string OrderAddress { get; set; }
        public required User User { get; set; }
    }
}
