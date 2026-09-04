using ShopManagementWebApp.Server.Dtos;

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
            var response = new ReportDataResponse();

            return response;
        }
    }
}
