using System.ComponentModel.DataAnnotations.Schema;

namespace CRUD4x.Models
{
    public class Venta
    {
        public int VentaId { get; set; }
        public DateTime Fecha {  get; set; }
        [Column(TypeName = "decimal(18,2)")]
        public decimal Total { get; set; }
        public int ClienteId { get; set; }
        public Cliente? Cliente { get; set; } // ❓ permite null
        public List<DetalleVenta> DetalleVentas { get; set; } = new(); // ✅ inicialización por defecto

    }
}
