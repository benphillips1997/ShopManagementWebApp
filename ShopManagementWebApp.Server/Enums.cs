namespace ShopManagementWebApp.Server
{
    public class Enums
    {
        public enum UserType
        {
            Customer = 0,
            Admin = 1,
            SuperAdmin = 2,
            Guest = 3
        }

        public enum OrderStatus
        {            
            Delivered = 0,
            Returned = 1,
            Cancelled = 2,
            Shipped = 3,
            Refunded = 4
        }

        public enum PaymentStatus
        {
            Failed = 0,
            Pending = 1,
            Successful = 2
        }
    }
}
