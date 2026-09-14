namespace ShopManagementWebApp.Server.Dtos
{
    public class UpdateProductDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public double? Cost { get; set; }
        public string? ImageSource { get; set; }
        public int? Stock { get; set; }
        public bool? IsListed { get; set; }
    }
}
