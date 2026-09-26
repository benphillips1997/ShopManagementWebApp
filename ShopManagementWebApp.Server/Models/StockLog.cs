namespace ShopManagementWebApp.Server.Models
{
    public class StockLog
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public required Product Product { get; set; }
        public int StockChange { get; set; }
        public Enums.StockChangeReason StockChangeReason { get; set; }
        public DateTime TimeStamp { get; set; } = DateTime.Now;
        public User? UserResponsible { get; set; }
    }
}
