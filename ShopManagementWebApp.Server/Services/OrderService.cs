using Microsoft.EntityFrameworkCore;
using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly ShopManagementDbContext _context;

        public OrderService(ShopManagementDbContext context)
        {
            _context = context;
        }

        public List<Order> GetOrders(int userId = -1)
        {
            return _context.Orders.Where(o => o.User.Id == userId || userId == -1).ToList();
        }

        public Order? GetOrder(int id)
        {
            return _context.Orders.FirstOrDefault(x => x.Id == id);
        }

        public bool AddOrder(Order order)
        {
            if (order == null) { return false; }

            _context.Orders.Add(order);
            _context.SaveChanges();

            return true;
        }

        public bool UpdateOrder(Order order)
        {
            if (order == null) { return false; }

            var orderToUpdate = _context.Orders.FirstOrDefault(x => x.Id == order.Id);

            if (orderToUpdate == null) { return false; }

            orderToUpdate.TotalCost = order.TotalCost;
            orderToUpdate.OrderDate = order.OrderDate;
            orderToUpdate.OrderStatus = order.OrderStatus;
            orderToUpdate.OrderAddress = order.OrderAddress;
            orderToUpdate.Items = new List<OrderItem>();

            foreach (OrderItem item in order.Items)
            {
                orderToUpdate.Items.Add(item);
            }

            _context.SaveChanges();

            return true;
        }

        public bool DeleteOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault(x => x.Id == id);

            if (order == null) { return false; }

            _context.Orders.Remove(order);
            _context.SaveChanges();

            return true;
        }
    }
}
