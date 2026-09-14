namespace ShopManagementWebApp.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public double Cost { get; set; }
        public string? ImageSource { get; set; }
        public int Stock { get; set; }
        public bool IsListed { get; set; }
    }
}
