using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services
{
    public interface IOrderService
    {
        List<Order> GetOrders(int userId = -1);
        Order? GetOrder(int id);
        ProcessOrderResponseDto ProcessOrder(ProcessOrderRequestDto requestDetails);
        int CreateOrder(Order order);
        bool UpdateOrder(UpdateOrderDto order);
        bool DeleteOrder(int id);
    }
}
