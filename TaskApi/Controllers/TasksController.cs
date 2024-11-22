using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskApi.Data;
using TaskApi.Models;

namespace TaskApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly TaskContext _context;

        public TasksController(TaskContext context)
        {
            _context = context;
        }

        // GET: api/tasks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskApi.Models.Task>>> GetTasks(
            string? sortBy = null,      // Sorting field
            bool descending = false,   // Sorting order
            string? filter = null,     // Filtering by title or description
            int page = 1,              // Pagination: page number
            int pageSize = 10)         // Pagination: items per page
        {

            var tasksQuery = _context.Tasks.AsQueryable();

            if (!string.IsNullOrWhiteSpace(filter))
            {
                tasksQuery = tasksQuery.Where(t =>
                    t.Title.Contains(filter) ||
                    t.Description.Contains(filter));
            }

            // Sorting
            tasksQuery = sortBy switch
            {
                "title" => descending ? tasksQuery.OrderByDescending(t => t.Title) : tasksQuery.OrderBy(t => t.Title),
                "createdAt" => descending ? tasksQuery.OrderByDescending(t => t.CreatedAt) : tasksQuery.OrderBy(t => t.CreatedAt),
                _ => tasksQuery // Default: no sorting
            };

            // Pagination
            var totalTasks = await tasksQuery.CountAsync();
            var tasks = await tasksQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            // Return paginated response
            return Ok(new
            {
                TotalItems = totalTasks,
                Page = page,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalTasks / (double)pageSize),
                Data = tasks
            });
        }

        // GET: api/tasks/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskApi.Models.Task>> GetTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // POST: api/tasks
        [HttpPost]
        public async Task<ActionResult<TaskApi.Models.Task>> CreateTask(TaskApi.Models.Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        // PUT: api/tasks/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, TaskApi.Models.Task updatedTask)
        {
            if (id != updatedTask.Id)
            {
                return BadRequest();
            }

            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            // Update task properties
            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.CreatedAt = updatedTask.CreatedAt;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tasks.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
