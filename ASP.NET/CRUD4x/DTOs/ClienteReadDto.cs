namespace CRUD4x.DTOs
{
    public class ClienteReadDto
    {
        public int ClienteId { get; set; }
        public string Nombre { get; set; } = null!;
        public string Direccion { get; set; } = null!;
        public string Telefono { get; set; } = null!;
    }
}
