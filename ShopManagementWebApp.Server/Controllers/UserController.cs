using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;
using ShopManagementWebApp.Server.Services;
using System.IdentityModel.Tokens.Jwt;

namespace ShopManagementWebApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ShopManagementDbContext _context;
        private readonly IUserService _userService;

        public UserController(ShopManagementDbContext context, IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        [HttpPost("Login")]
        public UserLoginResponse Login([FromBody] LoginRequest request)
        {
            return _userService.Login(request);
        }

        [Authorize]
        [HttpGet("GetUserSession")]
        public ActionResult<User> GetUserSession()
        {
            var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var user = _userService.GetUser(userId);
            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("GetUsers")]
        public IEnumerable<User> GetUsers()
        {
            return _userService.GetUsers();
        }

        [HttpGet("GetUser/{id}")]
        public User? GetUser(int id)
        {
            return _userService.GetUser(id);
        }

        [HttpPost("AddUser")]
        public bool AddUser([FromBody] User user)
        {
            return _userService.AddUser(user);
        }

        [HttpPost("UpdateUser")]
        public bool UpdateUser([FromBody] UpdateUserRequest requestDetails)
        {
            return _userService.UpdateUser(requestDetails);
        }

        [HttpDelete("DeleteUser")]
        public bool DeleteUser(int id)
        {
            return _userService.DeleteUser(id);
        }
    }
}
