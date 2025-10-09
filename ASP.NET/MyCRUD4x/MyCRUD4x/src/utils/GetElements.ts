export function getElementOrThrow<T extends HTMLElement>(
  id: string,
  ctor: new () => T
): T {
  const el = document.getElementById(id);
  if (!(el instanceof ctor)) {
    throw new Error(`Elemento '${id}' no encontrado o tipo inválido`);
  }
  return el;
}
