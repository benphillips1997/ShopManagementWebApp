using ShopManagementWebApp.Server.Dtos;

namespace ShopManagementWebApp.Server.Services.Interfaces
{
    public interface IReportService
    {
        ReportDataResponse GetFilteredOrders(ReportFilters filters);
    }
}
