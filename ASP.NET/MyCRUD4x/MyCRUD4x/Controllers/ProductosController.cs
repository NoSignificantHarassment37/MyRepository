using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyCRUD4x.Data;
using MyCRUD4x.Models;
namespace MyCRUD4x.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductosController : ControllerBase
    {
        public ProductosController(AppDbContext context) 
        {
            _dbContext = context;
        }
        private AppDbContext _dbContext;
        [HttpGet]
        public async Task<ActionResult<List<Producto>>> ObtenerClientes()
        {
            List<Producto> productos = await _dbContext.Productos.AsNoTracking().ToListAsync();
            return Ok(productos);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> ObtenerCliente(int id)
        {
            Producto? producto = await _dbContext.Productos.FindAsync(id);
            if(producto is null)
            {
                return NotFound();
            }
            return Ok(producto);
        }
    }
}
