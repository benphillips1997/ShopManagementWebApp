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
        private readonly ProductService _service;

        public ProductController(ShopManagementDbContext context, ProductService productService) 
        {
            _context = context;
            _service = productService;
        }

        [HttpGet(Name = "GetProducts")]
        public List<Product> GetProducts()
        {
            return _service.GetProducts();
        }

        [HttpGet(Name = "GetProduct")]
        public Product? GetProduct(int id)
        {
            return _service.GetProduct(id);
        }

        [HttpPost(Name = "AddProduct")]
        public bool AddProduct(Product product)
        {
            return _service.AddProduct(product);
        }

        [HttpPost(Name = "UpdateProduct")]
        public bool UpdateProduct(Product product)
        {
            return _service.UpdateProduct(product);
        }

        [HttpDelete(Name = "DeleteProduct")]
        public bool DeleteProduct(int id)
        {
            return _service.DeleteProduct(id);
        }
    }
}
