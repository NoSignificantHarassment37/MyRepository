const API_URL = "http://localhost:5193/api/clientes"; // Cambia el puerto si tu app usa otro
const form = document.getElementById("clienteForm");
const tableBody = document.getElementById("clientesTable");
const formTitle = document.getElementById("form-title");

let editMode = false;
let editId = null;

// Cargar clientes al inicio
window.onload = cargarClientes;

async function cargarClientes() {
    tableBody.innerHTML = "";
    const response = await fetch(API_URL);
    const clientes = await response.json();

    clientes.forEach(cliente => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="col text-center border-2 border-dark">${cliente.clienteId}</td>
            <td class="col text-center border-2 border-dark">${cliente.nombre}</td>
            <td class="col text-center border-2 border-dark">${cliente.direccion}</td>
            <td class="col text-center border-2 border-dark">${cliente.telefono}</td>
            <td class="actions col text-center border-2 border-dark">
                <button class="edit" onclick="editarCliente(${cliente.clienteId}, '${cliente.nombre}', '${cliente.direccion}', '${cliente.telefono}')">Editar</button>
                <button class="delete" onclick="eliminarCliente(${cliente.clienteId})">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Crear o actualizar cliente
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const cliente = {
        nombre: document.getElementById("nombre").value,
        direccion: document.getElementById("direccion").value,
        telefono: document.getElementById("telefono").value
    };

    if (editMode) {
        await fetch(`${API_URL}/${editId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });
        editMode = false;
        editId = null;
        formTitle.textContent = "Crear Cliente";
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cliente)
        });
    }

    form.reset();
    cargarClientes();
});

// Editar cliente
function editarCliente(id, nombre, direccion, telefono) {
    document.getElementById("nombre").value = nombre;
    document.getElementById("direccion").value = direccion;
    document.getElementById("telefono").value = telefono;
    editMode = true;
    editId = id;
    formTitle.textContent = "Editar Cliente";
}

// Eliminar cliente
async function eliminarCliente(id) {
    if (confirm("¿Seguro que quieres eliminar este cliente?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarClientes();
    }
}

function vaciarFormulario(e) {
    
}