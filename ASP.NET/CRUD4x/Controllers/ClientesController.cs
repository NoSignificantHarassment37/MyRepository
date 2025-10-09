using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUD4x.Models;
using CRUD4x.DTOs;
using CRUD4x.Data;

namespace CRUD4x.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ClientesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/clientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClienteReadDto>>> GetClientes()
        {
            var clientes = await _context.Clientes
                .AsNoTracking()
                .Select(c => new ClienteReadDto
                {
                    ClienteId = c.ClienteId,
                    Nombre = c.Nombre,
                    Direccion = c.Direccion,
                    Telefono = c.Telefono
                })
                .ToListAsync();

            return Ok(clientes);
        }

        // GET: api/clientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClienteReadDto>> GetCliente(int id)
        {
            var cliente = await _context.Clientes
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.ClienteId == id);
            /*
             Esto me parece importante comentarlo.

            Ambos metodos, FindAsync y FirstOrDefaultAsync buscan y devuelven un elemento de la base de datos en base a una condicion, PERO:
            
            FindAsync busca en base a la clave primaria. Busca primero en el change tracking del contexto, y luego en la base de datos,
            no se permite modificadores como .where, .select, .asnotracking.

            FirstOrDefault busca en base a una condicion,
             */

            if (cliente == null)
                return NotFound();

            var dto = new ClienteReadDto
            {
                ClienteId = cliente.ClienteId,
                Nombre = cliente.Nombre,
                Direccion = cliente.Direccion,
                Telefono = cliente.Telefono
            };

            return Ok(dto);
        }

        // POST: api/clientes
        [HttpPost]
        public async Task<ActionResult<ClienteReadDto>> CreateCliente([FromBody] ClienteCreateDto dto)
        {
            var cliente = new Cliente
            {
                Nombre = dto.Nombre,
                Direccion = dto.Direccion,
                Telefono = dto.Telefono
            };

            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();

            var readDto = new ClienteReadDto
            {
                ClienteId = cliente.ClienteId,
                Nombre = cliente.Nombre,
                Direccion = cliente.Direccion,
                Telefono = cliente.Telefono
            };

            return CreatedAtAction(nameof(GetCliente), new { id = cliente.ClienteId }, readDto);
        }

        // PUT: api/clientes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCliente(int id, [FromBody] ClienteUpdateDto dto)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
                return NotFound();

            cliente.Nombre = dto.Nombre;
            cliente.Direccion = dto.Direccion;
            cliente.Telefono = dto.Telefono;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/clientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);

            if (cliente == null)
                return NotFound();

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
