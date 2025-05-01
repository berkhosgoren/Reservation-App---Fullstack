namespace ReservationAPI.Entities
{
    // Represents a reservation record
    public class ResInfo
    {
        public int Id { get; set; }
        public required string Name { get; set; } = string.Empty;
        public required string Surname { get; set; } =string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;

        // Reason for reservation
        public required string ResCause { get; set; }

        // Timestamp when the reservation was created
        public DateTime CreatedTime { get; set; } = DateTime.UtcNow;

        // Date of the reservation
        public DateTime ResDate { get; set; }

        // Unique confirmation ID (4-digit string)
        public string ConfirmationId { get; set; } = Guid.NewGuid().ToString();

    }
}
