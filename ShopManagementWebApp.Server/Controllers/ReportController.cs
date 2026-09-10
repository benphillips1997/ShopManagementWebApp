using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Services;

namespace ShopManagementWebApp.Server.Controllers
{
    [Authorize(Roles = "Admin,SuperAdmin")]
    [Route("api/[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        [HttpPost("GetFilteredOrders")]
        public ReportDataResponse GetFilteredOrders([FromBody] ReportFilters filters)
        {
            return _reportService.GetFilteredOrders(filters);
        }
    }
}
