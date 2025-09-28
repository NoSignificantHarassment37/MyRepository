using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUD4x.Models;
using CRUD4x.DTOs;
using CRUD4x.Data;

namespace CRUD4x.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VentasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VentasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/ventas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VentaReadDto>>> GetVentas()
        {
            var ventas = await _context.Ventas
                .AsNoTracking()
                .Select(v => new VentaReadDto
                {
                    VentaId = v.VentaId,
                    Fecha = v.Fecha,
                    Total = v.Total,
                    ClienteId = v.ClienteId
                })
                .ToListAsync();

            return Ok(ventas);
        }

        // GET: api/ventas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VentaReadDto>> GetVenta(int id)
        {
            var venta = await _context.Ventas
                .AsNoTracking()
                .FirstOrDefaultAsync(v => v.VentaId == id);

            if (venta == null)
                return NotFound();

            var dto = new VentaReadDto
            {
                VentaId = venta.VentaId,
                Fecha = venta.Fecha,
                Total = venta.Total,
                ClienteId = venta.ClienteId
            };

            return Ok(dto);
        }

        // POST: api/ventas
        [HttpPost]
        public async Task<ActionResult<VentaReadDto>> CreateVenta([FromBody] VentaCreateDto dto)
        {
            var venta = new Venta
            {
                Fecha = dto.Fecha,
                Total = dto.Total,
                ClienteId = dto.ClienteId
            };

            _context.Ventas.Add(venta);
            await _context.SaveChangesAsync();

            var readDto = new VentaReadDto
            {
                VentaId = venta.VentaId,
                Fecha = venta.Fecha,
                Total = venta.Total,
                ClienteId = venta.ClienteId
            };

            return CreatedAtAction(nameof(GetVenta), new { id = venta.VentaId }, readDto);
        }

        // PUT: api/ventas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVenta(int id, [FromBody] VentaUpdateDto dto)
        {
            var venta = await _context.Ventas.FindAsync(id);

            if (venta == null)
                return NotFound();

            venta.Fecha = dto.Fecha;
            venta.Total = dto.Total;
            venta.ClienteId = dto.ClienteId;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Ventas.Any(v => v.VentaId == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/ventas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenta(int id)
        {
            var venta = await _context.Ventas.FindAsync(id);

            if (venta == null)
                return NotFound();

            _context.Ventas.Remove(venta);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
