using Microsoft.EntityFrameworkCore;
using CarMarketAPI.Models;

namespace CarMarketAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<CarImage> CarImages { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<ContactRequest> ContactRequests { get; set; }

    }
}
