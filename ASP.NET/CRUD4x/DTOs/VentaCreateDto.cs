namespace CRUD4x.DTOs
{
    public class VentaCreateDto
    {
        public DateTime Fecha { get; set; }
        public decimal Total { get; set; }
        public int ClienteId { get; set; }
    }
}
