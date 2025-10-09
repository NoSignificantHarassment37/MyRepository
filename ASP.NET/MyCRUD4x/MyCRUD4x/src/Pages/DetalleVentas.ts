// api.ts
export const apiUrl = "api/detalleventas";

// --- Tipos ---
interface DetalleVenta {
    detalleVentaId: number;
    ventaId: number;
    productoId: number;
    cantidad: number;
    subtotal: number;
}

// --- Referencias DOM ---
const form = document.getElementById("detalle-form") as HTMLFormElement;
const tbody = document.getElementById("detalles-tbody") as HTMLTableSectionElement;
const inputId = document.getElementById("detalle-id") as HTMLInputElement;
const inputVentaId = document.getElementById("ventaId") as HTMLInputElement;
const inputProductoId = document.getElementById("productoId") as HTMLInputElement;
const inputCantidad = document.getElementById("cantidad") as HTMLInputElement;
const inputSubtotal = document.getElementById("subtotal") as HTMLInputElement;

// --- Listeners ---
document.addEventListener("DOMContentLoaded", loadDetalles);
form.addEventListener("submit", handleSubmit);

// --- Funciones ---
async function loadDetalles(): Promise<void> {
    try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error("Error al obtener detalles");

        const detalles: DetalleVenta[] = await res.json();

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

            const btnEditar = row.querySelector(".editar") as HTMLButtonElement;
            const btnEliminar = row.querySelector(".eliminar") as HTMLButtonElement;

            btnEditar.addEventListener("click", () => editDetalle(d));
            btnEliminar.addEventListener("click", () => deleteDetalle(d.detalleVentaId));

            tbody.appendChild(row);
        }
    } catch (error) {
        console.error("Error cargando detalles:", error);
    }
}

async function handleSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();

    const id = inputId.value ? parseInt(inputId.value) : null;
    const data: Omit<DetalleVenta, "detalleVentaId"> = {
        ventaId: parseInt(inputVentaId.value),
        productoId: parseInt(inputProductoId.value),
        cantidad: parseInt(inputCantidad.value),
        subtotal: parseFloat(inputSubtotal.value),
    };

    try {
        const method = id ? "PUT" : "POST";
        const url = id ? `${apiUrl}/${id}` : apiUrl;

        const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error(`Error en ${method}`);

        resetForm();
        await loadDetalles();
    } catch (error) {
        console.error("Error guardando detalle:", error);
    }
}

function editDetalle(detalle: DetalleVenta): void {
    inputId.value = detalle.detalleVentaId.toString();
    inputVentaId.value = detalle.ventaId.toString();
    inputProductoId.value = detalle.productoId.toString();
    inputCantidad.value = detalle.cantidad.toString();
    inputSubtotal.value = detalle.subtotal.toString();
}

async function deleteDetalle(id: number): Promise<void> {
    if (!confirm("�Est�s seguro de eliminar este detalle?")) return;

    try {
        const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (!res.ok) throw new Error("Error al eliminar detalle");
        await loadDetalles();
    } catch (error) {
        console.error("Error eliminando detalle:", error);
    }
}

function resetForm(): void {
    form.reset();
    inputId.value = "";
}
