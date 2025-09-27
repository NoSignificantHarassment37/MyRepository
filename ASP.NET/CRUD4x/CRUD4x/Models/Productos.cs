using System.ComponentModel.DataAnnotations;
namespace CRUD4x.Models
{
    public class Productos
    {
        [Key]
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public double Precio { get; set; }
        public int Stock { get; set; }
    }
}
