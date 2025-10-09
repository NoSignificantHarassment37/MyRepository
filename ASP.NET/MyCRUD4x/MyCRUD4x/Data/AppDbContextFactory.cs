using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Internal;
namespace MyCRUD4x.Data
{
    /*
     Esta clase está destinada a ser usada solo en tiempo de diseño y desarrollo, en producción es basura.

    Su función es permitir manejar migraciones y actualizar la base de datos cuando el programa no está corriendo.
     */
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            //Cargamos configuracion de appsettings.json, esta parte es mas comodidad, podrias colocar manualmente la cadena de conexion. 
            IConfiguration config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            // Obtenemos la cadena de mysql desde las cadenas de conexion, puede arrojar null si no se encuentra.
            string connectionString = config.GetConnectionString("MySQLConnection") ?? throw new Exception("No se ha encontrado MySQLConnection dentro de connectionstrings en appsettings.json");

            // Una vez tenemos la cadena de conexion, instanciamos le pasamos al DbContextOptionsBuilder qué SGBD y que cadena de conexion deberá usar.
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}
