using System.ComponentModel.DataAnnotations;

namespace Catstagram.Server.Features.Cats.Models
{

    //this is the information what we get when we call the get(mine()) method
    public class CatListingServiceModel
    {
        public int Id { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        public string Description { get; set; }

    }
}
