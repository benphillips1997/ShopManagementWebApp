using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services
{
    public class ReportService : IReportService
    {
        private readonly ShopManagementDbContext _context;

        public ReportService(ShopManagementDbContext context)
        {
            _context = context;
        }

        public ReportDataResponse GetFilteredOrders(ReportFilters filters)
        {
            var response = new ReportDataResponse
            {
                Orders = new List<Order>(),
                Success = false
            };

            response.Orders = _context.Orders.Where(o => (filters.OrderDateStart == null || o.OrderDate >= filters.OrderDateStart) &&
                (filters.OrderDateEnd == null || o.OrderDate <= filters.OrderDateEnd.Value.AddDays(1)) &&
                (filters.OrderStatus == Enums.OrderStatus.NotSet || filters.OrderStatus == o.OrderStatus) &&
                (filters.PaymentStatus == Enums.PaymentStatus.NotSet || filters.PaymentStatus == o.PaymentStatus)).ToList();

            response.Success = true;

            return response;
        }
    }
}
