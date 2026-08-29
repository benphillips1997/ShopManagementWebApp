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
    }
}
