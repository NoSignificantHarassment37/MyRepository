namespace CRUD4x.DTOs
{
    public class ProductoCreateDto
    {
        public string Nombre { get; set; } = null!;
        public decimal Precio { get; set; }
        public int Stock { get; set; }
    }
}
