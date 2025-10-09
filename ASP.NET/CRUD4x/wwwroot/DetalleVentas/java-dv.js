const apiUrl = "http://localhost:5193/api/detalleventas"; // Ajusta tu puerto

document.addEventListener("DOMContentLoaded", loadDetalles);
document.getElementById("detalle-form").addEventListener("submit", handleSubmit);

async function loadDetalles() {
    const res = await fetch(apiUrl);
    const detalles = await res.json();

    const tbody = document.getElementById("detalles-tbody");
    tbody.innerHTML = "";

    detalles.forEach(d => {
        const row = document.createElement("tr");

        row.innerHTML = `
                    <td>${d.detalleVentaId}</td>
                    <td>${d.ventaId}</td>
                    <td>${d.productoId}</td>
                    <td>${d.cantidad}</td>
                    <td>${d.subtotal.toFixed(2)}</td>
                    <td>
                        <button class="editar" onclick='editDetalle(${JSON.stringify(d)})'>Editar</button>
                        <button class="eliminar" onclick='deleteDetalle(${d.detalleVentaId})'>Eliminar</button>
                    </td>
                `;

        tbody.appendChild(row);
    });
}

async function handleSubmit(event) {
    event.preventDefault();

    const id = document.getElementById("detalle-id").value;
    const ventaId = parseInt(document.getElementById("ventaId").value);
    const productoId = parseInt(document.getElementById("productoId").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const subtotal = parseFloat(document.getElementById("subtotal").value);

    const data = { ventaId, productoId, cantidad, subtotal };

    if (id) {
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    } else {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
    }

    resetForm();
    loadDetalles();
}

function editDetalle(detalle) {
    document.getElementById("detalle-id").value = detalle.detalleVentaId;
    document.getElementById("ventaId").value = detalle.ventaId;
    document.getElementById("productoId").value = detalle.productoId;
    document.getElementById("cantidad").value = detalle.cantidad;
    document.getElementById("subtotal").value = detalle.subtotal;
}

async function deleteDetalle(id) {
    if (!confirm("¿Estás seguro de eliminar este detalle?")) return;

    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    loadDetalles();
}

function resetForm() {
    document.getElementById("detalle-form").reset();
    document.getElementById("detalle-id").value = "";
}