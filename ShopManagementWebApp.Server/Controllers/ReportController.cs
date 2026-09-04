using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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

        [HttpGet("GetFilteredOrders")]
        public ReportDataResponse GetFilteredOrders([FromBody] ReportFilters filters)
        {
            return _reportService.GetFilteredOrders(filters);
        }
    }
}
