using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Models;
using ShopManagementWebApp.Server.Services;

namespace ShopManagementWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ShopManagementDbContext _context;
        private readonly IProductService _productService;

        public ProductController(ShopManagementDbContext context, IProductService productService) 
        {
            _context = context;
            _productService = productService;
        }

        [HttpGet("GetProducts")]
        public IEnumerable<Product> GetProducts()
        {
            return _productService.GetProducts();
        }

        [HttpGet("GetProduct/{id}")]
        public Product? GetProduct(int id)
        {
            return _productService.GetProduct(id);
        }

        [HttpPost("AddProduct")]
        public bool AddProduct([FromBody] Product product)
        {
            return _productService.AddProduct(product);
        }

        [HttpPost("UpdateProduct")]
        public bool UpdateProduct([FromBody] Product product)
        {
            return _productService.UpdateProduct(product);
        }

        [HttpDelete("/api/DeleteProduct/{id}")]
        public bool DeleteProduct(int id)
        {
            return _productService.DeleteProduct(id);
        }
    }
}
