using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUD4x.Models;
using CRUD4x.DTOs;
using CRUD4x.Data;


namespace CRUD4x.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DetalleVentasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DetalleVentasController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/detalleventas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetalleVentaReadDto>>> GetDetalleVentas()
        {
            var detalles = await _context.DetalleVentas
                .AsNoTracking()
                .Select(d => new DetalleVentaReadDto
                {
                    DetalleVentaId = d.DetalleVentaId,
                    VentaId = d.VentaId,
                    ProductoId = d.ProductoId,
                    Cantidad = d.Cantidad,
                    Subtotal = d.Subtotal
                })
                .ToListAsync();

            return Ok(detalles);
        }

        // GET: api/detalleventas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DetalleVentaReadDto>> GetDetalleVenta(int id)
        {
            var detalle = await _context.DetalleVentas
                .AsNoTracking()
                .FirstOrDefaultAsync(d => d.DetalleVentaId == id);

            if (detalle == null)
                return NotFound();

            var dto = new DetalleVentaReadDto
            {
                DetalleVentaId = detalle.DetalleVentaId,
                VentaId = detalle.VentaId,
                ProductoId = detalle.ProductoId,
                Cantidad = detalle.Cantidad,
                Subtotal = detalle.Subtotal
            };

            return Ok(dto);
        }

        // POST: api/detalleventas
        [HttpPost]
        public async Task<ActionResult<DetalleVentaReadDto>> CreateDetalleVenta([FromBody] DetalleVentaCreateDto dto)
        {
            // Validar que la Venta y el Producto existen
            var ventaExiste = await _context.Ventas.AnyAsync(v => v.VentaId == dto.VentaId);
            var productoExiste = await _context.Productos.AnyAsync(p => p.ProductoId == dto.ProductoId);

            if (!ventaExiste) return BadRequest("Venta no existe");
            if (!productoExiste) return BadRequest("Producto no existe");

            var detalle = new DetalleVenta
            {
                VentaId = dto.VentaId,
                ProductoId = dto.ProductoId,
                Cantidad = dto.Cantidad,
                Subtotal = dto.Subtotal
                // ❌ No instanciar Producto ni Venta
            };

            _context.DetalleVentas.Add(detalle);
            await _context.SaveChangesAsync();

            var readDto = new DetalleVentaReadDto
            {
                DetalleVentaId = detalle.DetalleVentaId,
                VentaId = detalle.VentaId,
                ProductoId = detalle.ProductoId,
                Cantidad = detalle.Cantidad,
                Subtotal = detalle.Subtotal
            };

            return CreatedAtAction(nameof(GetDetalleVenta), new { id = detalle.DetalleVentaId }, readDto);
        }

        // PUT: api/detalleventas/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDetalleVenta(int id, [FromBody] DetalleVentaUpdateDto dto)
        {
            var detalle = await _context.DetalleVentas.FindAsync(id);

            if (detalle == null)
                return NotFound();

            detalle.VentaId = dto.VentaId;
            detalle.ProductoId = dto.ProductoId;
            detalle.Cantidad = dto.Cantidad;
            detalle.Subtotal = dto.Subtotal;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/detalleventas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetalleVenta(int id)
        {
            var detalle = await _context.DetalleVentas.FindAsync(id);

            if (detalle == null)
                return NotFound();

            _context.DetalleVentas.Remove(detalle);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
