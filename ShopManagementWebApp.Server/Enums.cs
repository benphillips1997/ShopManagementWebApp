namespace ShopManagementWebApp.Server
{
    public class Enums
    {
        public enum UserType
        {
            Admin,
            Customer
        }

        public enum OrderStatus
        {
            Failed,
            Pending,
            Successful,
            Delivered
        }
    }
}
