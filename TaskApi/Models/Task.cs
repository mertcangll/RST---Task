using System;
using System.ComponentModel.DataAnnotations;

namespace TaskApi.Models
{

    public class Task
    {

        [Key] // Specifies that this property is the primary key.
        public int Id { get; set; }

        [Required] // Ensures this field is not null.
        [MaxLength(100)] // Limits the title length to 100 characters.
        public string Title { get; set; }

        [MaxLength(500)] // Optional, limits the description length to 500 characters.
        public string Description { get; set; }

        [Required] // Ensures this field is always provided.
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow; // Defaults to the current UTC time.
    }
}
