using System.ComponentModel.DataAnnotations;
namespace CRUD4x.Models
{
    public class DetalleVentas
    {
        [Key]
        public int Id { get; set; }
        public Ventas VentaId { get; set; } = null!;
        public Producto ProductoId { get; set; } = null!;
        public double Subtotal { get; set; }
    }
}
