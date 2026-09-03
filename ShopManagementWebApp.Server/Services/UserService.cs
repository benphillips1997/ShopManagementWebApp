using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using ShopManagementWebApp.Server.Dtos;
using ShopManagementWebApp.Server.Models;
using System.Security.Claims;
using System.Text;

namespace ShopManagementWebApp.Server.Services
{
    public class UserService : IUserService
    {
        private readonly ShopManagementDbContext _context;
        private readonly IConfiguration _configuration;

        public UserService(ShopManagementDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public UserLoginResponse Login(LoginRequest request)
        {
            var response = new UserLoginResponse()
            {
                Success = true
            };

            var foundUser = _context.Users.Include(u => u.Basket).ThenInclude(b => b.Items).ThenInclude(i => i.Product).FirstOrDefault(x => x.Email == request.Email);

            if (foundUser == null)
            {
                response.Success = false;
                response.ErrorMessage = "User does not exist";

                return response;
            }

            bool passwordMatch = VerifyPassword(ref foundUser, foundUser.Password, request.Password);

            if (passwordMatch)
            {
                response.User = foundUser;
                response.User.Password = string.Empty;
                response.Token = GenerateJwtToken(foundUser);
            }
            else
            {
                response.Success = false;
                response.ErrorMessage = "Incorrect password";
            }            

            return response;
        }

        public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public User? GetUser(int id)
        {
            var user = _context.Users.Include(u => u.Basket).ThenInclude(b => b.Items).ThenInclude(i => i.Product).FirstOrDefault(x => x.Id == id);

            return user;
        }

        public bool AddUser(User user)
        {
            if (user == null) { return false; }

            if (user.Basket == null) { user.Basket = new Basket(); }

            if (_context.Users.FirstOrDefault(u => u.Email == user.Email) != null)
            {
                return false;
            }

            user.Password = HashPassword(user, user.Password);

            _context.Users.Add(user);
            _context.SaveChanges();

            return true;
        }

        public bool UpdateUser(UpdateUserRequest requestDetails)
        {
            if (requestDetails == null) { return false; }

            var userToUpdate = _context.Users.FirstOrDefault(x => x.Id == requestDetails.UserId);

            if (userToUpdate == null) { return false; }

            if (!string.IsNullOrEmpty(requestDetails.NewPassword) && !string.IsNullOrEmpty(requestDetails.CurrentPassword))
            {
                bool passwordMatch = VerifyPassword(ref userToUpdate, userToUpdate.Password, requestDetails.CurrentPassword);
                if (passwordMatch)
                {
                    userToUpdate.Password = HashPassword(userToUpdate, requestDetails.NewPassword);
                }
                else
                {
                    return false;
                }
            }

            if (requestDetails.NewEmail != null)
            {
                userToUpdate.Email = requestDetails.NewEmail;
            }

            if (requestDetails.NewFirstName != null)
            {
                userToUpdate.FirstName = requestDetails.NewFirstName;
            }

            if (requestDetails.NewLastName != null)
            {
                userToUpdate.LastName = requestDetails.NewLastName;
            }

            if (requestDetails.NewAddress != null)
            {
                userToUpdate.Address = requestDetails.NewAddress;
            }

            if (requestDetails.NewCountry != null)
            {
                userToUpdate.Country = requestDetails.NewCountry;
            }

            if (requestDetails.NewPhone != null)
            {
                userToUpdate.Phone = requestDetails.NewPhone;
            }

            _context.SaveChanges();

            return true;
        }

        public bool DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == id);

            if (user == null) { return false; }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return true;
        }

        private string HashPassword(User user, string password)
        {
            if (string.IsNullOrEmpty(password))
            {
                throw new Exception("Password does not contain any characters");
            }

            var hasher = new PasswordHasher<User>();
            string hash = hasher.HashPassword(user, password);

            return hash;
        }

        private bool VerifyPassword(ref User user, string hashedPassword, string providedPassword)
        {
            if (String.IsNullOrEmpty(providedPassword)) { return false; }

            var hasher = new PasswordHasher<User>();
            PasswordVerificationResult result = hasher.VerifyHashedPassword(user, hashedPassword, providedPassword);

            if (result == PasswordVerificationResult.SuccessRehashNeeded)
            {
                string newHash = HashPassword(user, providedPassword);
                user.Password = newHash;
                _context.SaveChanges();
                return true;
            }

            return result == PasswordVerificationResult.Success;
        }

        private string GenerateJwtToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Name, $"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Role, user.UserType.ToString())
            };

            var descriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(int.Parse(_configuration["Jwt:ExpiryMinutes"]!)),
                Issuer = _configuration["Jwt:Issuer"],
                Audience = _configuration["Jwt:Audience"],
                SigningCredentials = credentials
            };

            var handler = new JsonWebTokenHandler();
            var token = handler.CreateToken(descriptor);

            return token;
        }
    }
}
