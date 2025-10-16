const z = window.Zod;
import type * as Z from "zod";
import type { Cliente } from "../Models/Clientes.schema";
import { ClienteSchema } from "../Models/Clientes.schema";
import {
  GetElementOrThrow,
  ValidarArrayDeSchemas,
  DeserializarRespuesta,
} from "../Utils/GeneralUtils";
import type { ClienteCreateDTO } from "../Models/Cliente.Schema.CreateDTO";
import { clienteSchemaCreateDTO } from "../Models/Cliente.Schema.CreateDTO";
const formularioClientes: HTMLFormElement = GetElementOrThrow<HTMLFormElement>(
  "clientes-form",
  HTMLFormElement
);
const outPutElement: HTMLParagraphElement =
  GetElementOrThrow<HTMLParagraphElement>("output", HTMLParagraphElement);
const tableBodyElement: HTMLTableSectionElement =
  GetElementOrThrow<HTMLTableSectionElement>(
    "table-clientes__body",
    HTMLTableSectionElement
  );
const InputNombre: HTMLInputElement = GetElementOrThrow<HTMLInputElement>(
  "clientes-form__nombre-input",
  HTMLInputElement
);
const InputTelefono = GetElementOrThrow(
  "clientes-form__telefono-input",
  HTMLInputElement
);
const InputDireccion = GetElementOrThrow(
  "clientes-form__direccion-input",
  HTMLInputElement
);
let editarId: number = 0;
formularioClientes.addEventListener("submit", ManejarFormularioSubmit);
window.addEventListener("DOMContentLoaded", CargarClientes);
let Modo: number = 1;
async function EliminarBotonFuncion(event: MouseEvent) {
  /*
  const elementoConListener = event.currentTarget;
  if (elementoConListener instanceof HTMLButtonElement) {
    try {
      const serverResponse = await fetch("api/Clientes", { method: "DELETE" });
      if(serverResponse.ok){
        alert('Se ha eliminado el cliente correctamente.');
      }
    } catch (error) {
      alert("Ha ocurrido un error al comunicarse con el servidor.");
      console.error("Ha ocurrido un error al comunicarse con el servidor.", error);
    }
  }
    */

  if (!confirm("Estás seguro de eliminar este cliente?")) return;
  const elementoConListener = event.currentTarget;
  if (elementoConListener instanceof HTMLButtonElement) {
    const id = elementoConListener.dataset.id;
    const response = await fetch(`api/Clientes/${id}`, { method: "DELETE" });
    if (response.ok) {
      const filas: Array<HTMLTableRowElement> = Array.from(
        tableBodyElement.children as HTMLCollectionOf<HTMLTableRowElement>
      );
      for (const fila of filas) {
        if (Number(fila.dataset.id) === Number(id)) {
          fila.remove();
          return;
        }
      }
      console.error("No hay ninguna fila con ese id.");
    }
    // actualizar clientes en la pagina en caso de que se halla eliminado satisfactoriamente

    alert("Cliente eliminado correctamente.");
  }
}
async function EditarBotonFuncion(event: MouseEvent) {
  Modo = 2;
  const titulo = document.getElementById("form-title");
  if (titulo === null) {
    console.error("No existe un elemento con ese id.");
    throw new Error();
  }
  titulo.textContent = "Editar cliente";
  const elementoConListener = event.currentTarget;
  if (!(elementoConListener instanceof HTMLButtonElement)) {
    console.error(
      "El elemento al que se adjunto este listener no es un boton."
    );
    throw new Error();
  }
  const id = Number(elementoConListener.dataset.id);
  const cliente = await ObtenerClientePorId(id);
  ColocarCamposEnFormulario(cliente);
  editarId = cliente.id;
}
function ColocarListenersDeClick() {
  const editButtons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".form-editar-btn");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", EditarBotonFuncion);
  });
  const deleteButtons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".form-eliminar-btn");
  deleteButtons.forEach((btn) =>
    btn.addEventListener("click", EliminarBotonFuncion)
  );
}
async function ObtenerClientePorId(id: number): Promise<Cliente> {
  try {
    const serverResponse = await fetch(`api/Clientes/${id}`);
    const BodyResponse = await DeserializarRespuesta(serverResponse);
    const TryParseResult = ClienteSchema.safeParse(BodyResponse);
    if (TryParseResult.success) {
      return TryParseResult.data;
    } else {
      console.error(
        "Los datos enviados por el servidor no corresponden al esquema definido en el cliente."
      );
    }
  } catch (error) {
    console.error(error);
  }
  throw new Error();
}
async function EditarCliente() {
  const data = Object.fromEntries(new FormData(formularioClientes).entries());
  const validar = clienteSchemaCreateDTO.safeParse(data);

  if (validar.success) {
    let cliente = validar.data;
    let ServerResponse = new Response();
    let BodyResponse: unknown;

    try {
      ServerResponse = await fetch(`api/Clientes/${editarId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: cliente.nombre,
          direccion: cliente.direccion,
          telefono: cliente.telefono,
        }),
      });
      BodyResponse = await DeserializarRespuesta(ServerResponse);
      const TryParseResult = ClienteSchema.safeParse(BodyResponse);
      if (TryParseResult.success) {
        const filas: HTMLTableRowElement[] = Array.from(
          tableBodyElement.querySelectorAll("tr")
        );
        const cliente = TryParseResult.data;
        for (const fila of filas) {
          if (Number(fila.dataset.id) === cliente.id) {
            fila.innerHTML = `
          <td>${cliente.nombre}</td>
          <td>${cliente.direccion}</td>
          <td>${cliente.telefono}</td>
          <td>
            <button class="btn btn-primary form-editar-btn" data-id="${cliente.id}">Editar</button>
            <button class="btn btn-warning form-eliminar-btn" data-id="${cliente.id}">Eliminar</button>
          </td>`;
          }
        }
      }
    } catch (error) {
      console.error("Error al hacer fetch: ", error);
    }
  } else {
    console.error(validar.error);
  }
  const titulo = document.getElementById("form-title");
  if (titulo === null) {
    console.error("No se encontro un elemento con ese id.");
    throw new Error();
  }
  titulo.textContent = "Crear cliente";
  Modo = 1;
  formularioClientes.reset();
  alert('Cliente modificado satisfactoriamente.');
}
async function EliminarCliente(id: number): Promise<void> {
  if (!confirm("Estás seguro de eliminar este cliente?")) return;
  const response = await fetch(`api/Clientes/${id}`, { method: "DELETE" });
  if (response.ok) {
    const filas: Array<HTMLTableRowElement> = Array.from(
      tableBodyElement.children as HTMLCollectionOf<HTMLTableRowElement>
    );
    for (const fila of filas) {
      if (Number(fila.dataset.id) === id) {
        fila.remove();
        return;
      }
    }
    console.error("No hay ninguna fila con ese id.");
  }
  // actualizar clientes en la pagina en caso de que se halla eliminado satisfactoriamente

  alert("Cliente eliminado correctamente.");
}
/*
Me gustaría implementar el modo como enum.
Modo:
1: Crear.
2: Editar.
*/
async function ManejarFormularioSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault();
  const EntradasFormulario = Object.fromEntries<FormDataEntryValue>(
    new FormData(formularioClientes).entries()
  );
  const data = clienteSchemaCreateDTO.safeParse(EntradasFormulario);
  if (data.success) {
    if (Modo === 1) {
      CrearCliente();
    } else if (Modo === 2) {
      EditarCliente();
    } else {
      console.log("Modo no es ni 1 ni 2.");
    }
  } else {
    console.log("Las entradas del formulario no son validas: ", data.error);
  }
}
function ColocarCamposEnFormulario(Cliente: ClienteCreateDTO): void {
  InputNombre.value = Cliente.nombre;
  InputDireccion.value = Cliente.direccion;
  InputTelefono.value = Cliente.telefono;
  Modo = 2;
}
async function CargarClientes(): Promise<void> {
  let serverResponse: Response;
  let bodyResponse: unknown;
  try {
    serverResponse = await fetch("api/Clientes");
    bodyResponse = await DeserializarRespuesta(serverResponse);
    if (Array.isArray(bodyResponse)) {
      let errorReturn = { id: 1, nombre: "", telefono: "", direccion: "" };
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
          trElement.dataset.id = String(cliente.id);
          trElement.innerHTML = `
          <td data-nombre="${cliente.nombre}">${cliente.nombre}</td>
          <td data-direccion="${cliente.direccion}">${cliente.direccion}</td>
          <td data-telefono="${cliente.telefono}">${cliente.telefono}</td>
          <td>
            <button class="btn btn-primary form-editar-btn" data-id="${cliente.id}">Editar</button>
            <button class="btn btn-warning form-eliminar-btn" data-id="${cliente.id}">Eliminar</button>
          </td>`;
          tableBodyElement.appendChild(trElement);
        });
      } else {
        console.error(
          "Los esquemas que envio el servidor no son compatibles con el esquema definido en el cliente."
        );
      }
    }
    ColocarListenersDeClick();
  } catch (error) {
    console.error("Error al hacer la petición al servidor.", error);
  }
}
async function CrearCliente(): Promise<void> {
  const data = Object.fromEntries(new FormData(formularioClientes).entries());
  const validar = clienteSchemaCreateDTO.safeParse(data);

  if (validar.success) {
    let cliente = validar.data;
    let ServerResponse = new Response();

    try {
      ServerResponse = await fetch("api/Clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });
      if (ServerResponse.ok) {
        const clienteLocaton = ServerResponse.headers.get("Location");
        if (clienteLocaton !== null) {
          const unknownResponse = await fetch(clienteLocaton);
          const unknownBody = await DeserializarRespuesta(unknownResponse);
          const validarClienteResult = ClienteSchema.safeParse(unknownBody);
          if (validarClienteResult.success) {
            const nuevoCliente = validarClienteResult.data;
            const trElement: HTMLTableRowElement = document.createElement("tr");
            trElement.dataset.id = String(nuevoCliente.id);
            trElement.innerHTML = `
          <td>${nuevoCliente.nombre}</td>
          <td>${nuevoCliente.direccion}</td>
          <td>${nuevoCliente.telefono}</td>
          <td>
            <button class="btn btn-primary form-editar-btn" data-id="${nuevoCliente.id}">Editar</button>
            <button class="btn btn-warning form-eliminar-btn" data-id="${nuevoCliente.id}">Eliminar</button>
          </td>`;
            const botonEditar = trElement.querySelector(".form-editar-btn");
            const botonEliminar = trElement.querySelector(".form-eliminar-btn");
            if (botonEliminar instanceof HTMLButtonElement) {
              botonEliminar.addEventListener("click", EliminarBotonFuncion);
            }
            if (botonEditar instanceof HTMLButtonElement) {
              botonEditar.addEventListener("click", EditarBotonFuncion);
            }
            tableBodyElement.appendChild(trElement);
            const filas: Array<HTMLTableRowElement> = Array.from(
              tableBodyElement.children as HTMLCollectionOf<HTMLTableRowElement>
            );
            for (const fila of filas) {
              if (Number(fila.dataset.id) === nuevoCliente.id) {
              }
            }
          } else {
            console.error(
              "Los datos que envio el servidor no corresponden al esquema definido en el cliente.",
              validarClienteResult.error,
              unknownBody
            );
          }
        } else {
          console.error(
            "El servidor no ha enviado la localizacion del nuevo cliente."
          );
        }
      } else {
        console.error(
          "La respuesta del servidor no fue 200-299.",
          ServerResponse
        );
      }
    } catch (error) {
      console.error("Error al hacer fetch: ", error);
    }
    formularioClientes.reset();
    console.log("Cliente Introducido satifactoriamente.");
  }
}
/*
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
    try {
      bodyResponse = await serverResponse.json();
    } catch (error) {
      console.error("Error al deserializar la respuesta del servidor:", error);
    }
    outPutElement.textContent = JSON.stringify(bodyResponse);
  }
});
*/
