using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services
{
    public interface IOrderService
    {
        List<Order> GetOrders();
        Order? GetOrder(int id);
        bool AddOrder(Order order);
        bool UpdateOrder(Order order);
        bool DeleteOrder(int id);
    }
}
