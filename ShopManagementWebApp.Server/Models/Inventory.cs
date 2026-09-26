namespace ShopManagementWebApp.Server.Models
{
    public class Inventory
    {
        public int ProductId { get; set; }
        public required Product Product { get; set; }
        public int Quantity { get; set; }
        public int AmountReserved { get; set; }
        public int LowStockPoint { get; set; }
    }
}
