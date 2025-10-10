// src/Models/Clientes.schema.ts
var z = window.Zod;
var ClienteSchema = z.object({
  nombre: z.string().min(2, "Nombre demasiado corto.").max(50, "Nombre demasiado largo."),
  direccion: z.string().min(5, "Direcci\xF3n demasiado corta.").max(40, "Direcci\xF3n demasiado larga."),
  telefono: z.string().max(12, "Direcci\xF3n demasiado larga.")
});

// src/utils/GetElements.ts
function getElementOrThrow(id, ctor) {
  const el = document.getElementById(id);
  if (!(el instanceof ctor)) {
    throw new Error(`Elemento '${id}' no encontrado o tipo inv\xE1lido`);
  }
  return el;
}

// src/pages/Clientes.ts
var z2 = window.Zod;
var formularioClientes = getElementOrThrow("clientes-form", HTMLFormElement);
var outPutElement = getElementOrThrow("output", HTMLParagraphElement);
var tableBodyElement = getElementOrThrow(
  "table-clientes__body",
  HTMLTableSectionElement
);
var m = document.getElementById("m");
window.addEventListener("load", cargarClientes);
function validarDatosServidor(clientes, schema) {
}
async function cargarClientes() {
  let serverResponse;
  let bodyResponse;
  try {
    serverResponse = await fetch("api/Clientes");
    bodyResponse = await deserializarRespuesta(serverResponse);
    let dataValidated = validarDatosServidor(bodyResponse, ClienteSchema);
    if (dataValidated.success) {
      if (Array.isArray(dataValidated)) {
        dataValidated.forEach((cliente) => {
          const tableRow = document.createElement("tr");
          tableRow.innerHTML = `
            <td>${cliente.Nombre}</td>
            <td>${cliente.Telefono}</td>
            <td>${cliente.Direccion}</td>
          `;
          tableBodyElement.appendChild(tableRow);
        });
      }
    } else {
      console.log("Los datos no pasaron la validaci\xF3n.");
    }
  } catch (error) {
    console.error("Error al hacer la petici\xF3n al servidor.", error);
  }
}
async function deserializarRespuesta(serverResponse) {
  let bodyResponse;
  try {
    bodyResponse = await serverResponse.json();
  } catch (error) {
    console.error("Error al deserializar la respuesta del servidor: ", error);
  }
  return bodyResponse;
}
formularioClientes.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(formularioClientes).entries());
  const validar = ClienteSchema.safeParse(data);
  if (validar.success) {
    const cliente = validar.data;
    let serverResponse = new Response();
    let bodyResponse = {};
    try {
      serverResponse = await fetch("api/Clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
      });
    } catch (error) {
      console.error("Error al hacer fetch:", error);
    }
    console.log(serverResponse.headers.get("Location"));
    try {
      bodyResponse = await serverResponse.json();
    } catch (error) {
      console.error("Error al deserializar la respuesta del servidor:", error);
    }
    outPutElement.textContent = JSON.stringify(bodyResponse);
    console.log(bodyResponse);
  }
});
//# sourceMappingURL=Clientes.js.map
