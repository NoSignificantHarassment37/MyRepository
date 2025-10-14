import type * as Z from 'zod';

export function GetElementOrThrow<T extends HTMLElement>(
  id: string,
  constructor: new () => T
): T {
  const Element = document.getElementById(id);
  if (!(Element instanceof constructor)) {
    throw new Error(`Elemento '${id}' no encontrado o tipo inválido`);
  }
  return Element;
}

export function ValidarArrayDeSchemas<T>(
  array: Array<unknown>,
  schema: Z.ZodSchema<T>,
  errorReturn: T
): [Array<T>, boolean] {
  let arregloValidado: Array<T> = [];
  for (let elemento of array) {
    const temp = ValidarObjetoPorSchema<T>(elemento, schema, errorReturn);
    if (temp[1]) {
      arregloValidado.push(temp[0]);
    } else {
      return [[errorReturn], false];
    }
  }
  return [arregloValidado, true];
}

export function ValidarObjetoPorSchema<T>(
  objeto: unknown,
  schema: Z.ZodSchema<T>,
  errorReturn: T
): [T, boolean] {
  const safeParseResult = schema.safeParse(objeto);

  if (safeParseResult.success) {
    return [safeParseResult.data, true];
  } else {
    return [errorReturn, false];
  }
}

export async function DeserializarRespuesta(
  serverResponse: Response
): Promise<unknown> {
  let bodyResponse;
  try {
    bodyResponse = await serverResponse.json();
  } catch (error) {
    console.error("Error al deserializar la respuesta del servidor: ", error);
  }
  return bodyResponse;
}