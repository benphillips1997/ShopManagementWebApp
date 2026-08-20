namespace ShopManagementWebApp.Server.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public required Product Product { get; set; }
        public int Count { get; set; }
        public double CostAtPurchase { get; set; }
    }
}
