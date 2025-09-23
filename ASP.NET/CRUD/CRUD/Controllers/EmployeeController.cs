using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CRUD.Models;
using CRUD.Data;

namespace CRUD.Controllers
{
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
    }
}
