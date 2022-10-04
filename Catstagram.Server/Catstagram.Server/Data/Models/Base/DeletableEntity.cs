using System;

namespace Catstagram.Server.Data.Models.Base
{
    public class DeletableEntity: Entity, IDeletableEntity
    {
        public DateTime? DeletedOn { get; set; }

        public string DeletedBy { get; set; }

        public bool IsDeleted { get; set; }
    }
}
