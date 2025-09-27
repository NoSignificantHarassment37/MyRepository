using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CRUD4x.Models
{
    public class Clientes
    {
        [Key]
        public int ClienteId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Direccion {  get; set; } = string.Empty;
        public string Telefono { get; set; } = string.Empty;
    }
}
