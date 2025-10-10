using Microsoft.EntityFrameworkCore;
using MyCRUD4x.Data;

/*
El pipeline es una cadena de middleware components (también llamados middlewares) que procesan las peticiones y respuestas HTTP.
Cada middleware puede actuar antes o después de que la solicitud llegue al controlador, según si invoca o no al siguiente middleware en la cadena.

El Program.cs es el encargado de arrancar la aplicación, y está dividido en dos fases:

1️⃣ Fase de configuración — controlada por una instancia de WebApplicationBuilder ('builder').
2️⃣ Fase de configuración del middleware — controlada por una instancia de WebApplication ('app').
*/

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// 💾 1. Obtenemos el string de conexión.
string? connectionString = builder.Configuration.GetConnectionString("MySQLConnection");

// 🧩 2. Registramos servicios.
builder.Services.AddControllers(); // <-- necesario para habilitar los controladores

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
});

// ⚙️ 3. Creamos la aplicación.
WebApplication app = builder.Build();

// 🛠️ 4. Configuramos el middleware.
app.UseDefaultFiles();
app.UseStaticFiles();

// 🔍 6. Endpoint de prueba.
app.MapGet("/api/test", () => new { message = "Funciona?" });
/* app.MapControllers() registra y activa todas las rutas definidas en tus controladores que usan atributos de ruta 
(como [Route], [HttpGet], [HttpPost], etc.) y conecta esas rutas al pipeline HTTP. */
app.MapControllers();

// 🚀 7. Arrancamos el servidor.
app.Run();

