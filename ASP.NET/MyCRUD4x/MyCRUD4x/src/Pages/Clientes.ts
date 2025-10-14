const z = window.Zod;
import type * as Z from "zod";
import type { Cliente } from "../Models/Clientes.schema";
import { ClienteSchema } from "../Models/Clientes.schema";
import {
  GetElementOrThrow,
  ValidarArrayDeSchemas,
  DeserializarRespuesta,
} from "../Utils/GeneralUtils";
const formularioClientes: HTMLFormElement = GetElementOrThrow<HTMLFormElement>("table-clientes", HTMLFormElement);
const outPutElement: HTMLParagraphElement = GetElementOrThrow<HTMLParagraphElement>("outpu", HTMLParagraphElement);
const tableBodyElement: HTMLTableSectionElement = GetElementOrThrow<HTMLTableSectionElement>(
  "table-clientes__body",
  HTMLTableSectionElement
);
const InputNombre: HTMLInputElement = GetElementOrThrow<HTMLInputElement>(
  "clientes-form__nombre-input",
  HTMLInputElement
);
const InputTelefono = GetElementOrThrow(
  "clientes-form__direccion-input",
  HTMLInputElement
);
const InputDireccion = GetElementOrThrow(
  "clientes-form__direccion-input",
  HTMLInputElement
);
formularioClientes.addEventListener("submit", HandleSubmit);
window.addEventListener("load", CargarClientes);
let Modo: number = 1;

async function EditarCliente(Cliente: string) {
  const TipoDesconocido: unknown = JSON.parse(Cliente);
  const TryParseResult: Z.ZodSafeParseResult<Cliente> = ClienteSchema.safeParse(TipoDesconocido);
  let ClienteObj: Cliente;
  if (TryParseResult.success) {
    ClienteObj = TryParseResult.data as Cliente;
  }
  else {
    throw new Error("El json proporcionado como parametro no corresponde a un objeto 'Cliente'.");
  }
  ColocarCamposEnFormulario(JSON.stringify(ClienteObj));
  const data = Object.fromEntries(new FormData(formularioClientes).entries());
  const validar = ClienteSchema.safeParse(data);

  if (validar.success) {
    let cliente = validar.data;
    let ServerResponse = new Response();
    let BodyResponse: unknown;

    try {
      ServerResponse = await fetch(`api/Clientes/${cliente.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: cliente.nombre,
          direccion: cliente.direccion,
          telefono: cliente.telefono,
        }),
      });
      BodyResponse = await DeserializarRespuesta(ServerResponse);
      outPutElement.textContent = JSON.stringify(BodyResponse);
    } catch (error) {
      console.error("Error al hacer fetch: ", error);
    }
  }
  Modo = 1;
}
async function EliminarCliente(URL: string): Promise<void> {
  if (!confirm("Estás seguro de eliminar este cliente?")) return;
  await fetch(`${URL}`, { method: "DELETE" });
  CargarClientes();
}
/*
Me gustaría implementar el modo como enum.
Modo:
1: Crear
2: Editar.
*/
async function HandleSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault();
  const EntradasFormulario = Object.fromEntries(
    new FormData(formularioClientes).entries()
  );
  const data = ClienteSchema.safeParse(EntradasFormulario);
  if (data.success) {
    if (Modo === 1) {
      CrearCliente();
    } else if (Modo === 2) {
      EditarCliente(JSON.stringify(data.data));
    }
  }
}
function ColocarCamposEnFormulario(ClienteArg: string) {
  const Objeto = JSON.parse(ClienteArg);
  const TryParseResult = ClienteSchema.safeParse(Objeto);
  let Cliente: Cliente;
  if (TryParseResult.success) {
    Cliente = TryParseResult.data;
  }
  else {
    throw new Error("Los datos proporcionados como argumento no corresponden a una instancia de Cliente.");
  }
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
          trElement.innerHTML = `
          <td>${cliente.nombre}</td>
          <td>${cliente.direccion}</td>
          <td>${cliente.telefono}</td>
          <td>
            <button class="btn btn-primary" onclick='ColocarCamposEnFormulario(${JSON.stringify(cliente)})'>Editar</button>
            <button class="btn btn-warning" onclick='EliminarCliente('api/clientes/${cliente.id}')'>Eliminar</button>
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
async function CrearCliente() {
  const data = Object.fromEntries(new FormData(formularioClientes).entries());
  const validar = ClienteSchema.safeParse(data);

  if (validar.success) {
    let cliente = validar.data;
    let ServerResponse = new Response();
    let BodyResponse: unknown;

    try {
      ServerResponse = await fetch("api/Clientes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente),
      });
      BodyResponse = await DeserializarRespuesta(ServerResponse);
      outPutElement.textContent = JSON.stringify(BodyResponse);
    } catch (error) {
      console.error("Error al hacer fetch: ", error);
    }
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
