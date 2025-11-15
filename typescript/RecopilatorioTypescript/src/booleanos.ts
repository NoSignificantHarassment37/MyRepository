function booleanos() {
    // Teoricamente son solo true o false...
    let booleano: boolean = true;
    let otroBooleano: boolean = false;
    // Pero eso solo funciona en typescript, ya que javascript puede evaluar cualquier cosa como booleano.
    // eso se conocen como truthy/falsy values.
    let talvezBooleano: any = 0;
    console.log(talvezBooleano);
    // aqui puedes probar si diferentes cosas son truthy o falsy values.
    if (talvezBooleano) {
        console.log("Es un valor truthy!");
    }
    else {
        console.log("Es un valor falsy!");
    }
    // operadores booleanos y de cortocircuito:
    // || es OR, si una de las dos es true, entonces la salida es true. 
    if (true || false) {
        console.log("True!");
    }
    // el operador || devuelve el primer truthy que encuentra.
    console.log(1 || null || 2 || undefined); // 1 
    // && es AND, si ambas son true, entonces la salida es true, de lo contrario es false.
    if (true && false) { // false
        console.log("True!");
    }
    // El operador && devuelve el primer falsy o el ultimo truthy que se encuentra.
    console.log(1 && 2);
    // ! es NOT, invierte el valor booleano. true = false, false = true.
    if (!true) {
        console.log("Es false!");
    }
    // Conversion EXPLICITA a booleano. recomendado, per no siempre ya que es mas verboso.
    const convertidoABooleano: boolean = Boolean({});
    if (convertidoABooleano) {
        console.log("True!");
    }
    // Operadores de comparacion.
    if (1 > 2) { // False
        console.log("1 es mayor a 2.");
    }
    if (2 > 1) { // True
        console.log("2 es mayor a 1.");
    }
    if (2 >= 3) { // False
        console.log("2 es mayor o igual a 3.");
    }
    if (2 <= 3) { // True
        console.log("2 es menor o igual a 3.")
    }
    if (2 === 2) { // True
        console.log("2 es igual a 2.");
    }
    if (2 !== 2) { // False
        console.log("2 es diferente de 2.");
    }
    // Existen '==' y '!=' que son menos estrictos, pero CASI NUNCA se usan.
    // NOTA: se me escapa el operador null coalescing, '??'.
    // Basicamente da el valor de la derecha si el valor de la derecha es 'null' o 'undefined'. 
    let falsy:undefined | null = null;
    let truthy:number = 1;
    console.log(falsy ?? 1);
    falsy = undefined;
    console.log(falsy ?? 1);
    console.log(truthy ?? 100);
}
export { booleanos };