using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;
using ShopManagementWebApp.Server.Services;

namespace ShopManagementWebApp.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService) 
        {
            _productService = productService;
        }

        [HttpGet("GetProducts")]
        public List<Product> GetProducts()
        {
            return _productService.GetProducts();
        }

        [HttpGet("GetProduct/{id}")]
        public Product? GetProduct(int id)
        {
            return _productService.GetProduct(id);
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPost("AddProduct")]
        public bool AddProduct([FromBody] Product product)
        {
            return _productService.AddProduct(product);
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpPost("UpdateProduct")]
        public bool UpdateProduct([FromBody] UpdateProductDto product)
        {
            return _productService.UpdateProduct(product);
        }

        [Authorize(Roles = "SuperAdmin")]
        [HttpDelete("DeleteProduct/{id}")]
        public bool DeleteProduct(int id)
        {
            return _productService.DeleteProduct(id);
        }
    }
}
