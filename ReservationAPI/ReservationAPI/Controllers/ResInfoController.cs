using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReservationAPI.Data;
using ReservationAPI.Entities;
using ReservationAPI.Migrations;
using System.Xml.Linq;

namespace ReservationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResInfoController : ControllerBase
    {
        private readonly DataContext _context;

        public ResInfoController(DataContext context)
        {
            _context = context;
        }

        // Generates a random 4-digit numeric confirmation ID
        private string GenerateRandomConfirmationId()
        {
            const string chars = "0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, 4)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        // Checks for reservation conflict on a given date
        private async Task<bool> IsConflictAsync(DateTime newResDate, int reservationId = 0)
        {
            var existingReservations = await _context.ReservedInfos
                .Where(r => r.Id != reservationId) // exclude this one 
                .ToListAsync();

            
            return existingReservations.Any(r =>
                r.ResDate.Date == newResDate.Date // Check if the dates match
                                                  
            );
        }


        // GET: api/ResInfo/GetReserved
        // Returns a list of all reservations
        [HttpGet("GetReserved")]
        public async Task<ActionResult<List<ResInfo>>> GetReserved()
        {
            var reserves = await _context.ReservedInfos.ToListAsync();

            return Ok(reserves);
        }


        // GET: api/ResInfo/GetReservation/{confirmationId}
        // Returns a single reservation by confirmation ID
        [HttpGet("GetReservation/{confirmationId}")]
        public async Task<ActionResult<ResInfo>> GetReservation(string confirmationId)
        {
            
            var reservation = await _context.ReservedInfos
                                             .FirstOrDefaultAsync(r => r.ConfirmationId == confirmationId);

           
            if (reservation == null)
            {
                return NotFound("Reservation not found.");
            }

            return Ok(reservation);
        }

        // POST: api/ResInfo/AddReservation
        // Adds a new reservation if the date is available
        [HttpPost("AddReservation")]
        public async Task<ActionResult<List<ResInfo>>> AddReservation(ResInfo reserved)
        {
            if (await IsConflictAsync(reserved.ResDate))
            {
                return BadRequest("Reservation conflict! The selected date is already reserved.");
            }

            reserved.ConfirmationId = GenerateRandomConfirmationId();
            _context.ReservedInfos.Add(reserved);
            await _context.SaveChangesAsync();

            var result = new
            {
                Message = $"Reservation Successful! Here is your confirmation ID: {reserved.ConfirmationId}",
                Reservation = reserved
            };

            return CreatedAtAction(nameof(GetReserved), new { id = reserved.Id }, result);


        }

        // DELETE: api/ResInfo/CancelReservation/{confirmationId}
        // Cancels a reservation by confirmation ID
        [HttpDelete("CancelReservation/{confirmationId}")]
        public async Task<ActionResult> CancelReservation(string confirmationId)
        {

            var reservation = await _context.ReservedInfos
        .FirstOrDefaultAsync(r => r.ConfirmationId == confirmationId);

            if (reservation == null)
            {
                return NotFound($"Reservation with confirmation ID {confirmationId} not found."); 
            }

            _context.ReservedInfos.Remove(reservation); 
            await _context.SaveChangesAsync(); 

            return Ok($"Reservation with confirmation ID {confirmationId} has been successfully canceled."); 

        }

    }

}


