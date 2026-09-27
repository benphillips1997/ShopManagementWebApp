using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;

namespace ShopManagementWebApp.Server.Services.Interfaces
{
    public interface IUserService
    {
        List<User>? GetUsers(int loggedInUserId);
        User? GetUser(int userId, int? loggedInUserId = null);
        bool AddUser(User user);
        bool UpdateUser(UpdateUserRequest requestDetails);
        bool DeleteUser(int id);
        UserLoginResponse Login(LoginRequest request);
    }
}
