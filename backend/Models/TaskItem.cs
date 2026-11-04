namespace MojiZadaci.Api.Models;

// Jedan zadatak. Ime "TaskItem" da se ne bi mesalo sa System.Threading.Tasks.Task.
public class TaskItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Text { get; set; } = "";
    public bool Done { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// Telo zahteva za POST /api/tasks
public record CreateTaskRequest(string? Text);

// Telo zahteva za PATCH /api/tasks/{id} - sva polja su opciona
public record UpdateTaskRequest(string? Text, bool? Done);
