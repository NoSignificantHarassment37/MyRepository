// src/Models/Test.schema.ts
var z = window.Zod;
var testSchema = z.object({
  nombre: z.string("El nombre debe ser una cadena de caracteres.").min(5, "El nombre debe tener m\xE1s de 5 caracteres.").max(50, "El nombre debe tener menos de 50 caracteres."),
  correo: z.email("El correo electr\xF3nico no es v\xE1lido."),
  edad: z.int("La edad debe ser un n\xFAmero entero.").min(0, "La edad debe ser mayor a 0.").max(100, "La edad debe ser menor a 100."),
  fechaNacimiento: z.date("La fecha de nacimiento no es v\xE1lida.")
});

// src/utils/GetElements.ts
function getElementOrThrow(id, ctor) {
  const el = document.getElementById(id);
  if (!(el instanceof ctor)) {
    throw new Error(`Elemento '${id}' no encontrado o tipo inv\xE1lido`);
  }
  return el;
}

// src/pages/test.ts
var output = getElementOrThrow("output", HTMLParagraphElement);
var formularioClientes = getElementOrThrow("clientes-form", HTMLFormElement);
formularioClientes.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(formularioClientes).entries());
  const convertedToTestSchema = testSchema.safeParse(data);
  if (convertedToTestSchema.success) {
    const response = await fetch("api/Clientes/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(convertedToTestSchema)
    });
    console.log(response.ok);
  }
});
//# sourceMappingURL=test.js.map
