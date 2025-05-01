using Microsoft.EntityFrameworkCore;
using ReservationAPI.Entities;

namespace ReservationAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }



        // Table to store reservation information
        public DbSet <ResInfo> ReservedInfos { get; set; }
        



    }    
}
