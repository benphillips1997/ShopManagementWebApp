namespace ShopManagementWebApp.Server
{
    public class Enums
    {
        public enum UserType
        {
            Customer = 0,
            Admin = 1,
            SuperAdmin = 2
        }

        public enum OrderStatus
        {
            NotSet = 0,
            Cancelled = 1,
            Processing = 2,
            Confirmed = 3,
            Shipped = 4,
            Returned = 5
        }

        public enum PaymentStatus
        {
            NotSet = 0,
            Failed = 1,
            Pending = 2,
            Successful = 3,
            Refunded = 4
        }

        public enum StockChangeReason
        {
            NotSet = 0,
            Sale = 1,
            Return = 2,
            PurchaseOrder = 3,
            ManualAdjustment = 4
        }

        public enum PurchaseOrderStatus
        {
            NotSet = 0,
            Draft = 1,
            Sent = 2,
            Received = 3,
            Cancelled = 4,
            Returned = 5
        }
    }
}
