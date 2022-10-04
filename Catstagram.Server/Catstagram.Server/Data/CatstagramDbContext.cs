


namespace Catstagram.Server.Data
{
    using Catstagram.Server.Data.Models;
    using Catstagram.Server.Data.Models.Base;
    using Catstagram.Server.Infrastructure.Services;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;

    public class CatstagramDbContext : IdentityDbContext<User>
    {
        private readonly ICurrentUserService currentUser;

        public CatstagramDbContext(
            DbContextOptions<CatstagramDbContext> options)
            : base(options)
               => this.currentUser = currentUser;

        public DbSet<Cat> Cats { get; set; }

        public override int SaveChanges()
        {
            this.ApplyAuditInformation();
            return base.SaveChanges();
        }

        public override int SaveChanges(bool acceptAllChangesOnSuccess)
        {
            this.ApplyAuditInformation();
            return base.SaveChanges(acceptAllChangesOnSuccess);
        }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())//new CancellationToken()
        {
            this.ApplyAuditInformation();
            return base.SaveChangesAsync(cancellationToken);
        }
        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            this.ApplyAuditInformation();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<Cat>()
                .HasOne(c => c.User)
                .WithMany(u => u.Cats)
                .HasForeignKey(c => c.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            base.OnModelCreating(builder);
        }
        private void ApplyAuditInformation()
            =>this.ChangeTracker
                .Entries()
                .ToList()
                .ForEach(entry =>
                {
                    var userName = this.currentUser?.GetUserName();

                    if (entry.Entity is IDeletableEntity deletableEntity)
                    {
                       if(entry.State == EntityState.Deleted)
                        {
                            deletableEntity.DeletedOn = DateTime.UtcNow;
                            deletableEntity.DeletedBy = userName;
                            deletableEntity.IsDeleted = true;

                            entry.State = EntityState.Modified;
                        }
                    }

                    if (entry.Entity is IEntity entity)
                    {
                        if(entry.State == EntityState.Added)
                        {
                            entity.CreatedOn = DateTime.UtcNow;
                            entity.CreatedBy = userName;
                        }
                        else if(entry.State == EntityState.Modified)
                        {
                            entity.ModifiedOn = DateTime.UtcNow;
                            entity.ModifiedBy = userName;
                        }
                    }


                });

    }
}
