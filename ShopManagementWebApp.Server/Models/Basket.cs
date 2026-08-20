namespace ShopManagementWebApp.Server.Models
{
    public class Basket
    {
        public int Id { get; set; }
        public List<BasketItem> Items { get; set; } = new List<BasketItem>();
    }
}
