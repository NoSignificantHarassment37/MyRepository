export function getElementOrThrow(id, ctor) {
    const el = document.getElementById(id);
    if (!(el instanceof ctor)) {
        throw new Error(`Elemento '${id}' no encontrado o tipo inválido`);
    }
    return el;
}
//# sourceMappingURL=GetElements.js.map