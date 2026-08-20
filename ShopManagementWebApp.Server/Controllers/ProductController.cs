using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Models;
using ShopManagementWebApp.Server.Services;

namespace ShopManagementWebApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ShopManagementDbContext _context;
        private readonly IProductService _service;

        public ProductController(ShopManagementDbContext context, IProductService productService) 
        {
            _context = context;
            _service = productService;
        }

        [HttpGet("/api/GetProducts")]
        public IEnumerable<Product> GetProducts()
        {
            return _service.GetProducts();
        }

        [HttpGet("/api/GetProduct({id})")]
        public Product? GetProduct(int id)
        {
            return _service.GetProduct(id);
        }

        [HttpPost("/api/AddProduct")]
        public bool AddProduct([FromBody] Product product)
        {
            return _service.AddProduct(product);
        }

        [HttpPost("/api/UpdateProduct")]
        public bool UpdateProduct([FromBody] Product product)
        {
            return _service.UpdateProduct(product);
        }

        [HttpDelete("/api/DeleteProduct({id})")]
        public bool DeleteProduct(int id)
        {
            return _service.DeleteProduct(id);
        }
    }
}
