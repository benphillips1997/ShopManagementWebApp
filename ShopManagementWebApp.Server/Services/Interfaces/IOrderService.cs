using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services.Interfaces
{
    public interface IOrderService
    {
        List<Order> GetOrders(int userId);
        Order? GetOrder(int id);
        ProcessOrderResponseDto ProcessOrder(ProcessOrderRequestDto requestDetails);
        int CreateOrder(Order order);
        bool UpdateOrder(UpdateOrderDto order);
        bool DeleteOrder(int id);
    }
}
