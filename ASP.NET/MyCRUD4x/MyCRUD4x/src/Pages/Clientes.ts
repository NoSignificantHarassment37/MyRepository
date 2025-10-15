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
  "clientes-form__direccion-input",
  HTMLInputElement
);
const InputDireccion = GetElementOrThrow(
  "clientes-form__direccion-input",
  HTMLInputElement
);
const ClientesGlobal = PedirClientes();
formularioClientes.addEventListener("submit", HandleSubmit);
window.addEventListener("DOMContentLoaded", CargarClientes);
let Modo: number = 1;
function PutClickListeners() {
  const editButtons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".form-editar-btn");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = Number(btn.dataset.id);
      const cliente = await ObtenerClientePorId(id);
      ColocarCamposEnFormulario(cliente);
    });
  });
  const deleteButtons: NodeListOf<HTMLButtonElement> =
    document.querySelectorAll(".form-eliminar-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      EliminarCliente(`api/Clientes/${id}`);
    });
  });
}
async function PedirClientes(): Promise<Array<Cliente>> {
  try {
    const RespuestaServidor = await fetch("api/Clientes");
    try {
      const Clientes = await RespuestaServidor.json();
      if (Array.isArray(Clientes)) {
        return Clientes;
      } else {
        return [];
      }
    } catch (error) {
      console.error(
        "Ha ocurrido un error al deserializar la respuesta del servidor."
      );
    }
  } catch (error) {
    console.error("Ha ocurrido un error al pedir los clientes: ", error);
  }
  return [];
}
async function ObtenerClientePorId(id: number): Promise<Cliente> {
  const clientes = await ClientesGlobal;
  for (const cliente of clientes) {
    if (cliente.id === id) {
      return cliente;
    }
  }
  throw new Error("No existe un cliente con ese id.");
}
async function EditarCliente(Cliente: string) {
  const TipoDesconocido: unknown = JSON.parse(Cliente);
  const TryParseResult: Z.ZodSafeParseResult<Cliente> =
    ClienteSchema.safeParse(TipoDesconocido);
  let ClienteObj: Cliente;
  if (TryParseResult.success) {
    ClienteObj = TryParseResult.data as Cliente;
  } else {
    throw new Error(
      "El json proporcionado como parametro no corresponde a un objeto 'Cliente'."
    );
  }
  ColocarCamposEnFormulario(ClienteObj);
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
  alert("Cliente eliminado correctamente.");
}
/*
Me gustaría implementar el modo como enum.
Modo:
1: Crear.
2: Editar.
*/
async function HandleSubmit(event: SubmitEvent): Promise<void> {
  event.preventDefault();
  const EntradasFormulario = Object.fromEntries<FormDataEntryValue>(
    new FormData(formularioClientes).entries()
  );
  const data = clienteSchemaCreateDTO.safeParse(EntradasFormulario);
  if (data.success) {
    if (Modo === 1) {
      CrearCliente(data.data);
    } else if (Modo === 2) {
      EditarCliente(JSON.stringify(data.data));
    } else {
      console.log("Modo no es ni 1 ni 2.");
    }
  } else {
    console.log(
      "Las entradas del formulario no son validas: ",
      `${JSON.stringify(data.error)}`
    );
  }
}
function ColocarCamposEnFormulario(Cliente: Cliente): void {
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
            <button class="btn btn-primary form-editar-btn" data-id="${cliente.id}">Editar</button>
            <button class="btn btn-warning form-eliminar-btn" data-id="${cliente.id}">Eliminar</button>
          </td>`;
          tableBodyElement.appendChild(trElement);
        });
      } else {
      }
    }
    PutClickListeners();
  } catch (error) {
    console.error("Error al hacer la petición al servidor.", error);
  }
}
async function CrearCliente(cliente: ClienteCreateDTO): Promise<void> {
  const data = Object.fromEntries(new FormData(formularioClientes).entries());
  const validar = clienteSchemaCreateDTO.safeParse(data);

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
