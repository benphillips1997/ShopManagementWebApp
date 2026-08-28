using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;
using ShopManagementWebApp.Server.Services;

namespace ShopManagementWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ShopManagementDbContext _context;
        private readonly IUserService _service;

        public UserController(ShopManagementDbContext context, IUserService userService)
        {
            _context = context;
            _service = userService;
        }

        [HttpPost("/api/Login")]
        public UserLoginResponse Login([FromBody] LoginRequest request)
        {
            return _service.Login(request);
        }

        [HttpGet("/api/GetUsers")]
        public IEnumerable<User> GetUsers()
        {
            return _service.GetUsers();
        }

        [HttpGet("/api/GetUser/{id}")]
        public User? GetUser(int id)
        {
            return _service.GetUser(id);
        }

        [HttpPost("/api/AddUser")]
        public bool AddUser([FromBody] User user)
        {
            return _service.AddUser(user);
        }

        [HttpPost("/api/UpdateUser")]
        public bool UpdateUser([FromBody] UpdateUserRequest requestDetails)
        {
            return _service.UpdateUser(requestDetails);
        }

        [HttpDelete("/api/DeleteUser")]
        public bool DeleteUser(int id)
        {
            return _service.DeleteUser(id);
        }
    }
}
