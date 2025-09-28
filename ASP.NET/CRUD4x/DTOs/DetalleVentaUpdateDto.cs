namespace CRUD4x.DTOs
{
    public class DetalleVentaUpdateDto
    {
        public int VentaId { get; set; }
        public int ProductoId { get; set; }
        public int Cantidad { get; set; }
        public decimal Subtotal { get; set; }
    }
}
