namespace CRUD4x.DTOs
{
    public class ProductoUpdateDto
    {
        public string Nombre { get; set; } = null!;
        public decimal Precio { get; set; }
        public int Stock { get; set; }
    }
}
