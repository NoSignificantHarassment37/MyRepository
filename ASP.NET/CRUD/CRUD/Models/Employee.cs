using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRUD.Models;

public class Employee
{
    // No me gusta usar data anotations para validar datos, pero para un CRUD sencillo no esta mal.
    [Key]
    public int Id { get; set; }
    [Required]
    [MaxLength(50)]
    public string Nombre { get; set; } = string.Empty;
    [Required]
    [Range(0,100)]
    public int Edad {  get; set; }
    [Required]
    [MaxLength(50)]
    public string Departamente { get; set; } = string.Empty;
    [Required]
    [MaxLength(50)]
    public string Direccion { get; set; } = string.Empty;
    [Required]
    public DateTime FechaDeCreacion { get; set; } = DateTime.UtcNow;
}
