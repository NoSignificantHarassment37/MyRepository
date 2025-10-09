﻿namespace MyCRUD4x.Models
{
    public class DetalleVenta
    {
        public int Id { get; set; }
        public int VentaId { get; set; }
        public Venta Venta { get; set; } = null!;
        public int ProductoId { get; set; }
        public Producto Producto { get; set; } = null!;
        public int Cantidad { get; set; }
        public double SubTotal { get; set; }
    }
}
