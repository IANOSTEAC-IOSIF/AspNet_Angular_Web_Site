namespace Catstagram.Server.Features.Cats
{
    using Catstagram.Server.Features.Cats.Models;
    using static Infrastructure.WebConstants;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using Catstagram.Server.Infrastructure.Services;

    [Authorize]
    public class CatsController : ApiController
    {
        private readonly ICatService cats;
        private readonly ICurrentUserService currentUser;

        public CatsController(
            ICatService cats,
            ICurrentUserService currentUser)
        {
            this.cats = cats;
            this.currentUser = currentUser;
        }


            [HttpGet]
        public async Task<IEnumerable<CatListingServiceModel>> Mine()
        {
            var userId = this.currentUser.GetId();

            var userName = this.currentUser.GetUserName();
            return await this.cats.ByUser(userId);
        }

        [HttpGet]
        [Route(Id)]
        public async Task<ActionResult<CatDetailsServiceModel>> Details(int id)
            =>  await this.cats.Details(id);


        [HttpPost]
        public async Task<ActionResult> Create(CreateCatRequestModel model)
        {
            var userId = this.currentUser.GetId();
            var userName = this.currentUser.GetUserName();

            var id = await this.cats.Create(
                model.ImageUrl,
                model.Description,
                userId);

            return Created(nameof(this.Create), id);
        }

        [HttpPut]
        public async Task<ActionResult> Update(UpdateCatRequestModel model)
        {
            var userId = this.currentUser.GetId();
            var updated = await this.cats.Update(
                model.Id,
                model.Description,
                userId);
            if (!updated)
            {
                return BadRequest();
            }
            
            return Ok();
        }

        [HttpDelete]
        [Route(Id)]
        public async Task<ActionResult> Delete(int id)
        {
            var userId = this.currentUser.GetId();
            var deleted = await this.cats.Delete(id,userId);
            if (!deleted)
            {
                return BadRequest();
            }

            return Ok();

        }
    }
}