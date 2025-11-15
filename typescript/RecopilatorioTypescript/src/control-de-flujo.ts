function controlDeFlujo(): void {
    // condicionales:
    // Permiten manipular el flujo de ejecucion en base a logica booleana.
    let a: number = 1;
    let b: number = 2;
    // 'if' evalua una expresion y ejecuta el bloque si la condicion es verdadera.
    // 'else if' tiene el mismo comportamiento que 'if', solo va despues de un 'if' u otro 'else if', cuya condicion fue false, permite encadenarlos.
    // 'else' Si ningun 'if' o 'else if' de la cadena se ejecuta, se ejecuta su bloque.    
    if (a > b) {
        console.log("a es mayor que b");
    }
    else if (a === b) {
        console.log("a es igual a b.");
    }
    else if (false) {
        console.log("?");
    }
    else {
        console.log("b es mayor que a");
    }
    // Switch
    // Evalua una variable, y si tiene un valor que coincida con algun 'case' entonces el codigo del 'case' se ejecuta, si no coincide con ninguno, entonces se ejecuta el default.
    switch (a) {
        case 1:
            console.log("a es '1'.");
            break;
        case 2:
            console.log("a es '2'.");
            break;
        case 3:
            console.log("a es '3'.");
            break;
        default:
            console.log("a no tiene un valor conocido.");
            break;
    }
    // Operador ternario.
    // Operador muy util, SIEMPRE debe devolver un valor, pero ese valor depende de una condicion.
    let es1 = a === 1 ? true : false;
    console.log(es1);
    // Bucles
    // for clasico.
    // Esta dividido en tres expresiones:
    // let i = 0; es una expresion que se ejecuta una vez al entrar al for.
    // i > 10; es la condicion que se evalua cada que el bucle el codigo del bloque se ejecuta. si es true, se sigue ejecutando, si es false, el bucle termina.
    // i++; es una expresion que siempre se ejecuta al terminar la ejecucion del bloque.
    for (let i = 0; i <= 10; i++) {
        console.log(i);
    }
    // Ejecuta un bucle sobre una coleccion de valores 
    const nombre: string = "Mateo"
    for (let m of nombre) {
        console.log(m);
    }
}
export { controlDeFlujo };