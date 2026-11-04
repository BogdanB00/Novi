using Microsoft.EntityFrameworkCore;
using MojiZadaci.Api.Data;
using MojiZadaci.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// Baza: SQLite fajl (putanja u appsettings.json -> ConnectionStrings:Default)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")));

// Greske se vracaju kao JSON (ProblemDetails) umesto HTML stranice
builder.Services.AddProblemDetails();

var app = builder.Build();

// Napravi bazu i tabele ako ne postoje
using (var scope = app.Services.CreateScope())
{
    scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.EnsureCreated();
}

app.UseExceptionHandler(new ExceptionHandlerOptions
{
    // Neispravan zahtev (npr. los JSON) je greska klijenta (400), ne servera (500)
    StatusCodeSelector = ex => ex is BadHttpRequestException bad ? bad.StatusCode : 500,
});
app.UseStatusCodePages();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok" }));
app.MapTaskEndpoints();

app.Run();
