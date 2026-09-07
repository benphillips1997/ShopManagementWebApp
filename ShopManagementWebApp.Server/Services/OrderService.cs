using Azure;
using Microsoft.EntityFrameworkCore;
using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;
using static ShopManagementWebApp.Server.Enums;

namespace ShopManagementWebApp.Server.Services
{
    public class OrderService : IOrderService
    {
        private readonly ShopManagementDbContext _context;
        private readonly IProductService _productService;
        private readonly IPaymentService _paymentService;

        public OrderService(ShopManagementDbContext context, IProductService productService, IPaymentService paymentService)
        {
            _context = context;
            _productService = productService;
            _paymentService = paymentService;
        }

        public List<Order> GetOrders(int userId)
        {
            return _context.Orders.Include(o => o.Items).ThenInclude(i => i.Product).Where(o => o.UserId == userId).ToList();
        }

        public Order? GetOrder(int id)
        {
            return _context.Orders.Include(o => o.Items).ThenInclude(i => i.Product).FirstOrDefault(x => x.Id == id);
        }

        public ProcessOrderResponseDto ProcessOrder(ProcessOrderRequestDto requestDetails)
        {
            requestDetails.Order.PaymentStatus = PaymentStatus.Pending;
            requestDetails.Order.OrderStatus = OrderStatus.Processing;

            int orderId;
            var response = new ProcessOrderResponseDto
            {
                Success = true
            };

            try
            {
                orderId = CreateOrder(requestDetails.Order);
            }
            catch (Exception error)
            {
                response.Success = false;
                response.ErrorMessage = "Error creating order: " + error.Message;
                return response;
            }

            try
            {
                response = _paymentService.ProcessPayment(requestDetails);
            }
            catch (Exception error)
            {
                response.Success = false;
                response.ErrorMessage = "Error making payment: " + error.Message;
            }

            if (response.Success)
            {
                var updateOrderBody = new UpdateOrderDto
                {
                    Id = orderId,
                    PaymentStatus = PaymentStatus.Successful,
                    OrderStatus = OrderStatus.Confirmed
                };

                bool success = UpdateOrder(updateOrderBody);

                if (!success)
                {
                    response.Success = false;
                    response.ErrorMessage = "Order creation and payment were successful but status could not be updated to confirmed";
                }
            }
            else
            {
                var updateOrderBody = new UpdateOrderDto
                {
                    Id = orderId,
                    PaymentStatus = PaymentStatus.Failed
                };

                bool success = UpdateOrder(updateOrderBody);

                if (!success)
                {
                    response.ErrorMessage += "\nCould not update order payment status to failed";
                }
            }

            return response;
        }

        public int CreateOrder(Order order)
        {
            foreach (var item in order.Items)
            {
                var trackedProduct = _context.Products.Find(item.Product.Id);
                if (trackedProduct == null) 
                {
                    trackedProduct = _productService.GetProduct(item.ProductId);
                    if (trackedProduct == null) 
                    {
                        throw new Exception("Cannot find product for order item - product id: " + item.ProductId);
                    }
                }
                item.Product = trackedProduct;
            }

            var savedOrder = _context.Orders.Add(order);
            _context.SaveChanges();

            return savedOrder.Entity.Id;
        }

        public bool UpdateOrder(UpdateOrderDto order)
        {
            if (order == null) { return false; }

            var orderToUpdate = _context.Orders.FirstOrDefault(x => x.Id == order.Id);

            if (orderToUpdate == null) { return false; }

            if (order.TotalCost != null)
            {
                orderToUpdate.TotalCost = order.TotalCost.Value;
            }

            if (order.OrderDate != null)
            {
                orderToUpdate.OrderDate = order.OrderDate.Value;
            }

            if (order.OrderAddress != null)
            {
                orderToUpdate.OrderAddress = order.OrderAddress;
            }

            if (order.OrderCountry != null)
            {
                orderToUpdate.OrderCountry = order.OrderCountry;
            }

            if (order.PaymentStatus != null)
            {
                orderToUpdate.PaymentStatus = order.PaymentStatus.Value;
            }

            if (order.OrderStatus != null)
            {
                orderToUpdate.OrderStatus = order.OrderStatus.Value;
            }

            if (order.Items != null)
            {
                orderToUpdate.Items = new List<OrderItem>();
                foreach (OrderItem item in order.Items)
                {
                    orderToUpdate.Items.Add(item);
                }
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
