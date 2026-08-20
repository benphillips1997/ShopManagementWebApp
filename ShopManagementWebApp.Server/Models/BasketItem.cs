namespace ShopManagementWebApp.Server.Models
{
    public class BasketItem
    {
        public int Id { get; set; }
        public required Product Product { get; set; }
        public int Count { get; set; }
    }
}
