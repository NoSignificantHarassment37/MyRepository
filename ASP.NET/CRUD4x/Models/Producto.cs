using System.ComponentModel.DataAnnotations.Schema;

namespace CRUD4x.Models
{
    public class Producto
    {
        public int ProductoId { get; set; } 
        public string Nombre { get; set; } = null!;
        [Column(TypeName = "decimal(18,2)")]
        public decimal Precio { get; set; }
        public int Stock {  get; set; }

    }
}
