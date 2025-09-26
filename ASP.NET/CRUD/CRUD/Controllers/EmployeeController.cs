using System.ComponentModel.DataAnnotations;
using CRUD.Data;
using CRUD.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.JSInterop.Infrastructure;

namespace CRUD.Controllers
{
    public class EliminarEmpleadoDTO
    {
        public string NumeroDeDocumento { get; set; } = string.Empty;
    }
    public class ModificarEmpleadoDTO
    {
        public string NumeroDeDocumento { get; set; } = string.Empty;
        public string Direccion {  get; set; } = string.Empty;
    }
    public class CrearEmpleadoDTO
    {
        public TipoDeDocumento TipoDeDocumento { get; set; }
        public string NumeroIdentificacion { get; set; } = string.Empty;
        public string Nombre { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public int Edad { get; set; }
        public string CiudadNacimiento { get; set; } = string.Empty;
        public string Direccion { get; set; } = string.Empty;
    }
    [ApiController]
    [Route("Empleados")]
    public class EmployeeController : ControllerBase
    { 
        public EmployeeController(AppDbContext DbContext) 
        {
            this.Database = DbContext;
        }
        private readonly AppDbContext Database;
        [HttpGet("Obtener")]
        public async Task<IActionResult> Obtener()
        {
            List<Employee> empleados = await Database.Employees.ToListAsync();
            return Ok(empleados);
        }
        [HttpPost("Crear")]
        public async Task<IActionResult> Crear([FromBody] CrearEmpleadoDTO dto)
        {
            if(dto.Nombre.Length > 50)
            {
                return BadRequest(new { message="El nombre no puede tener mas de 50 caracteres de longitud." });
            }
            if(dto.Edad > 120 || dto.Edad < 0)
            {
                return BadRequest(new { message="La edad no puede ser mayor a 120 años ni menor a 0 años." });
            }
            if(!dto.Email.Contains('@'))
            {
                return BadRequest(new { message="El correo es invalido. Debe contener '@'." });
            }
            if(dto.NumeroIdentificacion.Length > 12)
            {
                return BadRequest(new { message="El documento no puede contener mas de 12 digitos." });
            }
            if (!dto.NumeroIdentificacion.All(char.IsDigit))
            {
                return BadRequest(new { message = "El numero de documento deben ser solo digitos." });
            }
            if(dto.Direccion.Length > 15)
            {
                return BadRequest(new { message = "La direccion no puede tener mas de 15 caracteres." });
            }
            if(dto.CiudadNacimiento.Length > 15)
            {
                return BadRequest(new { message = "La ciudad de nacimiento no puede contener mas de 15 caracteres de longitud." });
            }
            Employee empleado = new Employee { 
                CiudadNacimiento = dto.CiudadNacimiento,
                Direccion = dto.Direccion,
                Edad = dto.Edad,
                Nombre = dto.Nombre,
                NumeroIdentificacion = dto.NumeroIdentificacion,
                TipoDeDocumento = dto.TipoDeDocumento
            };
            Database.Employees.Add(empleado);
            await Database.SaveChangesAsync();
            return Ok(new { message="El empleado se creó correctamente." });
        }
        [HttpDelete("Eliminar")]
        public async Task<IActionResult> Eliminar([FromBody] EliminarEmpleadoDTO dto)
        {
            Console.WriteLine("Se ha llamado el controlador.");
            if (string.IsNullOrWhiteSpace(dto.NumeroDeDocumento) || dto.NumeroDeDocumento.Length > 12)
            {
                return BadRequest(new { message= "El numero de documento debe tener menos de 12 caracteres." });
            }
            Employee? empleadoAEliminar = Database.Employees.FirstOrDefault(em => em.NumeroIdentificacion == dto.NumeroDeDocumento);
            
            if(empleadoAEliminar is null)
            {
                return BadRequest(new { message = "No existe un empleado con ese numero de documento." });
            }
            else
            {
                Database.Employees.Remove(empleadoAEliminar);
                await Database.SaveChangesAsync();
                return Ok(new { message="El empleado se ha eliminado correctamente." });
            }
        }
        /*
        [HttpPut("Modificar")]
        public async Task<IActionResult> Modificar([FromBody] ModificarEmpleadoDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.NumeroDeDocumento))
            {
                return BadRequest(new { message="Error al deserializar el documento o el documento eran espacios en blanco." });
            }
            if(dto.NumeroDeDocumento.Length > 12)
            {
                return BadRequest(new { message = "El documento no pueden ser mas de 12 caracteres." });
            }

        }
        */
    }
}
