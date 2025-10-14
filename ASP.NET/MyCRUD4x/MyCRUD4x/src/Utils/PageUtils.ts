import type * as Z from "zod";
import { DeserializarRespuesta, ValidarArrayDeSchemas } from "./GeneralUtils";

async function Crear() {
  let serverResponse: Response;
  let bodyResponse: unknown;
  try {
    serverResponse = await fetch("api/Clientes");
    bodyResponse = await DeserializarRespuesta(serverResponse);
    if (Array.isArray(bodyResponse)) {
      let errorReturn = { nombre: "", telefono: "", direccion: "" };
      let [resultadoValidar, valido] = ValidarArrayDeSchemas<Cliente>(
        bodyResponse,
        ClienteSchema,
        errorReturn
      );
      if (valido) {
        // Si es un array valido, procedemos a mostrarlos en el documento HTML.
        let clientes = resultadoValidar;
        clientes.forEach((cliente) => {
          const trElement: HTMLTableRowElement = document.createElement("tr");
          trElement.innerHTML = `
          <td>${cliente.nombre}</td>
          <td>${cliente.direccion}</td>
          <td>${cliente.telefono}</td>
          <td>
            <button class="btn btn-primary" onclick=''>Editar</button>
            <button class="btn btn-warning" onclick=>Eliminar</button>
          </td>`;
          tableBodyElement.appendChild(trElement);
        });
      } else {
      }
    }
  } catch (error) {
    console.error("Error al hacer la petición al servidor.", error);
  }
}
async function Eliminar() {}
async function Modificar() {}
async function Leer() {}

async function CrearCRUD<T>(
  Formulario: HTMLFormElement,
  OutPutElement: HTMLTableSectionElement,
  Schema: Z.ZodSchema<T>,
  Tipo: T,
  MensajeErrorDeServidor: T
): Promise<void> {
  let serverResponse: Response;
  let bodyResponse: unknown;
  try {
    serverResponse = await fetch("api/Clientes");
    bodyResponse = await DeserializarRespuesta(serverResponse);
    if (Array.isArray(bodyResponse)) {
      let [resultadoValidar, valido] = ValidarArrayDeSchemas<T>(
        bodyResponse,
        Schema,
        MensajeErrorDeServidor
      );
      if (valido) {
        // Si es un array valido, procedemos a mostrarlos en el documento HTML.
        let clientes = resultadoValidar;
        clientes.forEach((cliente) => {
          const trElement: HTMLTableRowElement = document.createElement("tr");
          trElement.innerHTML = ``;
          OutPutElement.appendChild(trElement);
        });
      } else {
      }
    }
  } catch (error) {
    console.error("Error al hacer la petición al servidor.", error);
  }
}
