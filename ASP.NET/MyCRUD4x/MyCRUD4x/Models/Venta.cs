namespace MyCRUD4x.Models
{
    public class Venta
    {
        public int Id { get; set; } 
        public DateTime Fecha { get; set; }
        public double Total { get; set; }
        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; } = null!;
        public List<DetalleVenta> DetalleVenta { get; set; } = new();
    }
}
