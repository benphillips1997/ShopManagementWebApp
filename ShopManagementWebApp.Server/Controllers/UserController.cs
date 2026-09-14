using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
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
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
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

            return Ok(user);
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpGet("GetUsers")]
        public ActionResult<List<User>> GetUsers()
        {
            var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var userId))
            {
                return Unauthorized();
            }

            var users = _userService.GetUsers(userId);
            if (users == null)
            {
                return NotFound();
            }

            return Ok(users);
        }

        [Authorize]
        [HttpGet("GetUser/{userId}")]
        public ActionResult<User> GetUser(int userId)
        {
            var userIdClaim = User.FindFirst(JwtRegisteredClaimNames.Sub)?.Value;
            if (userIdClaim == null || !int.TryParse(userIdClaim, out var loggedInUserId))
            {
                return Unauthorized();
            }

            var user = _userService.GetUser(userId, loggedInUserId);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("AddUser")]
        public bool AddUser([FromBody] User user)
        {
            return _userService.AddUser(user);
        }

        [Authorize]
        [HttpPost("UpdateUser")]
        public bool UpdateUser([FromBody] UpdateUserRequest requestDetails)
        {
            return _userService.UpdateUser(requestDetails);
        }

        [Authorize(Roles = "Admin,SuperAdmin")]
        [HttpDelete("DeleteUser")]
        public bool DeleteUser(int id)
        {
            return _userService.DeleteUser(id);
        }
    }
}
