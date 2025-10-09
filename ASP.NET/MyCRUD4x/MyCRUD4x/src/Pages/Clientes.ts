import type * as z from 'zod';
const Z = window.Zod;
import type { Cliente } from '../Models/Clientes.schema';
import { ClienteSchema } from '../Models/Clientes.schema';
import { getElementOrThrow } from '../utils/GetElements';

/*
En este caso, .getElementById('clientes-form') devuelve un HTMLFormElement, lo que hace que no se
le pueda asignar directamente a un HTMLFormElement, por eso falta la anotación del tipo.
*/
const formularioClientes = getElementOrThrow('clientes-form', HTMLFormElement);

const outPutElement = getElementOrThrow('output', HTMLParagraphElement);

formularioClientes.addEventListener('submit',(e) => {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(formularioClientes).entries());

  const validar = ClienteSchema.safeParse(data);

  if (!validar.success) {
    outPutElement.textContent = validar.error.issues
      .map((issue) => `${issue.path[0]}: ${issue.message}`)
      .join("\n");
    return;
  }

  // 3️⃣ Instancia tipada y validada del modelo
  const cliente: Cliente = validar.data;
  console.log("✅ Cliente listo:", cliente);

  // 4️⃣ Ejemplo: enviar al backend
  // fetch("/api/clientes", { method: "POST", body: JSON.stringify(cliente) });
});