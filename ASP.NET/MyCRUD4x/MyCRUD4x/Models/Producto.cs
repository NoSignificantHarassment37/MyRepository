using MyCRUD4x.Utilidades;
namespace MyCRUD4x.Models
{
    public class Producto
    { 
        public int Id { get; set; }
        public Guid PublicId { get; set; } = GuidUtils.CreateVersion7();
        public string Nombre { get; set; } = string.Empty;
        public double Precio { get; set; }
        public int Stock { get; set; }
    }
}
