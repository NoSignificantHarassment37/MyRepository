using Microsoft.AspNetCore.Mvc;
using MyCRUD4x.Data;
using MyCRUD4x.Models;
using MyCRUD4x.DTOs;
using Microsoft.EntityFrameworkCore;

namespace MyCRUD4x.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    /*
     [controller] le dice al enrutador que el nombre del endpoint será el nombre de la clase pero sin lo que esta dentro de []
    necesidad? ninguna, pero me gusta hacerme el chulo.
     */
    public class ClientesController : ControllerBase
    {
        public ClientesController(AppDbContext context) 
        {
            this._context = context;
        }
        private readonly AppDbContext _context;
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteReadDTO>>> GetClientes()
        {
            List<ClienteReadDTO>? clientesAsDTO = await _context.Clientes
                .AsNoTracking()
                .Select(cliente => new ClienteReadDTO
                {
                    Telefono = cliente.Telefono,
                    Direccion = cliente.Direccion,
                    Nombre = cliente.Nombre,
                })
                .ToListAsync();

            return Ok(clientesAsDTO);
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ClienteReadDTO>> GetCliente(int id)
        {
            /*
             Primero se busca el cliente 
             */
            Cliente? cliente = await _context.Clientes
                .AsNoTracking()
                .SingleOrDefaultAsync(cliente => cliente.Id == id);

            if(cliente is null)
            {
                return NotFound();
            }

            ClienteReadDTO clienteAsDTO = new ClienteReadDTO 
            {
                Telefono = cliente.Telefono,
                Direccion = cliente.Direccion,
                Nombre = cliente.Nombre
            };

            return Ok(clienteAsDTO);
        }
        [HttpPost]
        public async Task<ActionResult<ClienteReadDTO>> CreateCliente([FromBody] ClienteCreateDTO cliente)
        {
            Cliente nuevoCliente = new Cliente
            {
                Nombre = cliente.Nombre,
                Telefono = cliente.Telefono,
                Direccion = cliente.Direccion
            };

            _context.Clientes.Add(nuevoCliente);
            await _context.SaveChangesAsync();

            ClienteReadDTO clienteResponse = new ClienteReadDTO
            {
                Nombre = nuevoCliente.Nombre,
                Telefono = cliente.Telefono,
                Direccion = cliente.Direccion
            };

            /*
            Breve explicacion:
            La línea de abajo sigue los estandares de APIs REST, ya que:
            Devuelve la URL por la cuál se puede consultar el recurso creado, por eso nameof(GetCliente)
            Devuelve cómo puede ser consultado, por eso 'new { id = nuevoCliente.Id }'
            Devuelve qué se creó, por eso se devuelve el clienteReadDTO
             */
            return CreatedAtAction(nameof(GetCliente), new { id = nuevoCliente.Id }, clienteResponse);
        }
        [HttpPatch("{id:int}")]
        public async Task<ActionResult<ClienteReadDTO>> ModificarCliente([FromBody] ClienteUpdateDTO dto, int id)
        {
            // Capa de validacion, debería usarse fluent validation.
            if(dto.Nombre.Length > 50)
            {
                return BadRequest(dto.Nombre);
            }
            if(dto.Telefono.Length > 20)
            {
                return BadRequest(dto.Telefono);
            }
            if (dto.Direccion.Length > 25)
            {
                return BadRequest(dto.Direccion);
            }

            // Buscamos el cliente directamente por su clave primaria (int Id)
            Cliente? clienteDB = await _context.Clientes.FindAsync(id);

            // Si es null, significa que no existe.
            if(clienteDB is null)
            {
                return NotFound();
            }

            // Lo encontramos, entonces lo actualizamos con los datos del dto.
            clienteDB.Telefono = dto.Telefono;
            clienteDB.Direccion = dto.Direccion;
            clienteDB.Nombre = dto.Nombre;

            // Creamos el DTO que será devuelto en la respuesta.
            ClienteReadDTO clienteResponse = new ClienteReadDTO
            {
                Telefono = clienteDB.Telefono,
                Direccion = clienteDB.Direccion,
                Nombre = clienteDB.Nombre
            };

            // Finalmente devolvemos el recurso actualizado.
            return Ok(clienteResponse);
        }
        // NOTA: El id:int le dice al enrutador que el parámetro 'id' debe ser un int, por eso el controlador no lo valida.
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> EliminarCliente(int id)
        {
            Cliente? clienteDb = await _context.Clientes.FindAsync(id);

            if(clienteDb is null )
            {
                return NotFound();
            }

            _context.Clientes.Remove(clienteDb);
            await _context.SaveChangesAsync();  

            return NoContent();
        }
    }
}
