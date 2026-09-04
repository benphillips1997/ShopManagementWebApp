using ShopManagementWebApp.Server.Dtos;

namespace ShopManagementWebApp.Server.Services
{
    public interface IReportService
    {
        ReportDataResponse GetFilteredOrders(ReportFilters filters);
    }
}
