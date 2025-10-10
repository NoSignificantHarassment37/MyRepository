const z = window.Zod;
import type * as Z from 'zod';
import type { Cliente } from "../Models/Clientes.schema";
import { ClienteSchema } from "../Models/Clientes.schema";
import { getElementOrThrow } from "../utils/GetElements";
/*
En este caso, .getElementById('clientes-form') devuelve un HTMLFormElement, lo que hace que no se
le pueda asignar directamente a un HTMLFormElement, por eso falta la anotación del tipo.
*/
const formularioClientes = getElementOrThrow("clientes-form", HTMLFormElement);
const outPutElement = getElementOrThrow("output", HTMLParagraphElement);
const tableBodyElement = getElementOrThrow(
  "table-clientes__body",
  HTMLTableSectionElement
);
const m = document.getElementById("m");
window.addEventListener("load", cargarClientes);

function validarDatosServidor(clientes:Array<Object>, schema:Z.ZodSchema):Array<Cliente>{
  
}
async function cargarClientes(): Promise<void> {
  let serverResponse: Response;
  let bodyResponse:Array<Object>;
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
      console.log("Los datos no pasaron la validación.");
    }
  } catch (error) {
    console.error("Error al hacer la petición al servidor.", error);
  }
}
async function deserializarRespuesta(serverResponse: Response): Promise<any> {
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
    const cliente: Cliente = validar.data;

    let serverResponse = new Response();
    let bodyResponse: Object = {};

    try {
      serverResponse = await fetch("api/Clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
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
