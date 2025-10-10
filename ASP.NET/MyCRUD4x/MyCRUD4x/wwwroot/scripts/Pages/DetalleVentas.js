// src/pages/DetalleVentas.ts
var apiUrl = "api/detalleventas";
var form = document.getElementById("detalle-form");
var tbody = document.getElementById("detalles-tbody");
var inputId = document.getElementById("detalle-id");
var inputVentaId = document.getElementById("ventaId");
var inputProductoId = document.getElementById("productoId");
var inputCantidad = document.getElementById("cantidad");
var inputSubtotal = document.getElementById("subtotal");
document.addEventListener("DOMContentLoaded", loadDetalles);
form.addEventListener("submit", handleSubmit);
async function loadDetalles() {
  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error("Error al obtener detalles");
    const detalles = await res.json();
    tbody.innerHTML = "";
    for (const d of detalles) {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${d.detalleVentaId}</td>
                <td>${d.ventaId}</td>
                <td>${d.productoId}</td>
                <td>${d.cantidad}</td>
                <td>${d.subtotal.toFixed(2)}</td>
                <td>
                    <button class="editar">Editar</button>
                    <button class="eliminar">Eliminar</button>
                </td>
            `;
      const btnEditar = row.querySelector(".editar");
      const btnEliminar = row.querySelector(".eliminar");
      btnEditar.addEventListener("click", () => editDetalle(d));
      btnEliminar.addEventListener("click", () => deleteDetalle(d.detalleVentaId));
      tbody.appendChild(row);
    }
  } catch (error) {
    console.error("Error cargando detalles:", error);
  }
}
async function handleSubmit(event) {
  event.preventDefault();
  const id = inputId.value ? parseInt(inputId.value) : null;
  const data = {
    ventaId: parseInt(inputVentaId.value),
    productoId: parseInt(inputProductoId.value),
    cantidad: parseInt(inputCantidad.value),
    subtotal: parseFloat(inputSubtotal.value)
  };
  try {
    const method = id ? "PUT" : "POST";
    const url = id ? `${apiUrl}/${id}` : apiUrl;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`Error en ${method}`);
    resetForm();
    await loadDetalles();
  } catch (error) {
    console.error("Error guardando detalle:", error);
  }
}
function editDetalle(detalle) {
  inputId.value = detalle.detalleVentaId.toString();
  inputVentaId.value = detalle.ventaId.toString();
  inputProductoId.value = detalle.productoId.toString();
  inputCantidad.value = detalle.cantidad.toString();
  inputSubtotal.value = detalle.subtotal.toString();
}
async function deleteDetalle(id) {
  if (!confirm("\uFFFDEst\uFFFDs seguro de eliminar este detalle?")) return;
  try {
    const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar detalle");
    await loadDetalles();
  } catch (error) {
    console.error("Error eliminando detalle:", error);
  }
}
function resetForm() {
  form.reset();
  inputId.value = "";
}
export {
  apiUrl
};
//# sourceMappingURL=DetalleVentas.js.map
