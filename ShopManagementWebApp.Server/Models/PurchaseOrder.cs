namespace ShopManagementWebApp.Server.Models
{
    public class PurchaseOrder
    {
        public int Id { get; set; }
        public int SupplierId { get; set; }
        public Supplier Supplier { get; set; }
        public Enums.PurchaseOrderStatus Status { get; set; }
        public DateTime TimeCreated { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int Quantity { get; set; }
        public double CostPerItem { get; set; }
    }
}
