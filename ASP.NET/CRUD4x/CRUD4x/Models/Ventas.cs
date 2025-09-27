using System.ComponentModel.DataAnnotations;
namespace CRUD4x.Models
{
    public class Ventas
    {
        [Key]
        public int Id { get; set; }
        public DateTime Fecha { get; set; }
        public double Total { get; set; }
        public int ClienteId { get; set; }
        public Clientes Clientes { get; set; } = null!;
    }
}
