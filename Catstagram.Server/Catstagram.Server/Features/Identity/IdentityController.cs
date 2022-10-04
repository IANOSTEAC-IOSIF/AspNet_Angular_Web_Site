namespace Catstagram.Server.Features.Identity
{
    using Catstagram.Server.Data.Models;
    using Catstagram.Server.Features.Identity.Models;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using System.Threading.Tasks;

    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly IIdentityService identity;
        private readonly AppSettings appSettings;

        public IdentityController(
            UserManager<User> userManager,
            IIdentityService identity,
            IOptions<AppSettings> appSettings)
        {
            this.userManager = userManager;
            this.identity = identity;
            this.appSettings = appSettings.Value;
        }

        [HttpPost]
        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterRequestModel model)
        {
            var user = new User
            {
                Email = model.Email,
                UserName = model.UserName
            };
            var result = await userManager.CreateAsync(user, model.Password);
            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest(result.Errors);
        }

        [Route(nameof(Login))]
        [HttpPost]
        public async Task<ActionResult<LoginResponseModel>> Login(LoginRequestModel model)
        {
            var user = await userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return Unauthorized();
            }

            var passwordValid = await userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                return Unauthorized();
            }

            var token = this.identity.GenerateJwtToken(
                user.Id,
                user.UserName,
                this.appSettings.Secret);

            return new LoginResponseModel
            {
                Token = token
            };
        }
    }
}
