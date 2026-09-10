namespace ShopManagementWebApp.Server.Dtos
{
    public class ReportFilters
    {
        public DateTime? OrderDateStart { get; set; }
        public DateTime? OrderDateEnd { get; set; }
        public Enums.OrderStatus OrderStatus { get; set; } = Enums.OrderStatus.NotSet;
        public Enums.PaymentStatus PaymentStatus { get; set; } = Enums.PaymentStatus.NotSet;
    }
}
