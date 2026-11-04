using Microsoft.EntityFrameworkCore;
using MojiZadaci.Api.Data;
using MojiZadaci.Api.Models;

namespace MojiZadaci.Api.Endpoints;

public static class TaskEndpoints
{
    const int MaxTextLength = 500;

    public static void MapTaskEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/tasks");

        // GET /api/tasks - svi zadaci
        group.MapGet("/", async (AppDbContext db) =>
            await db.Tasks.OrderBy(t => t.CreatedAt).ToListAsync());

        // POST /api/tasks - novi zadatak { text }
        group.MapPost("/", async (CreateTaskRequest req, AppDbContext db) =>
        {
            var text = req.Text?.Trim();
            if (!IsValidText(text))
                return Results.BadRequest(new { error = $"Polje \"text\" je obavezno (1-{MaxTextLength} karaktera)." });

            var task = new TaskItem { Text = text! };
            db.Tasks.Add(task);
            await db.SaveChangesAsync();
            return Results.Created($"/api/tasks/{task.Id}", task);
        });

        // PATCH /api/tasks/{id} - izmena { text?, done? }
        group.MapPatch("/{id:guid}", async (Guid id, UpdateTaskRequest req, AppDbContext db) =>
        {
            var task = await db.Tasks.FindAsync(id);
            if (task is null)
                return Results.NotFound(new { error = "Zadatak nije pronađen." });

            if (req.Text is not null)
            {
                var text = req.Text.Trim();
                if (!IsValidText(text))
                    return Results.BadRequest(new { error = $"Polje \"text\" mora imati 1-{MaxTextLength} karaktera." });
                task.Text = text;
            }
            if (req.Done is not null)
                task.Done = req.Done.Value;

            await db.SaveChangesAsync();
            return Results.Ok(task);
        });

        // DELETE /api/tasks/{id} - brisanje
        group.MapDelete("/{id:guid}", async (Guid id, AppDbContext db) =>
        {
            var deleted = await db.Tasks.Where(t => t.Id == id).ExecuteDeleteAsync();
            return deleted == 0
                ? Results.NotFound(new { error = "Zadatak nije pronađen." })
                : Results.NoContent();
        });
    }

    static bool IsValidText(string? text) =>
        !string.IsNullOrWhiteSpace(text) && text.Length <= MaxTextLength;
}
