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
            Failed = 0,
            Pending = 1,
            Successful = 2,
            Delivered = 3
        }
    }
}
