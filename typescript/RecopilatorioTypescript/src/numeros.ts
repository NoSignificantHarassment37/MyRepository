import { isNumberObject } from "util/types";

function operadoresMatematicos() {
    let suma: number = 1 + 2;
    let resta: number = 2 - 1;
    let multiplicacion: number = 2 * 2;
    let division: number = 2 / 2;
    let modulo: number = 2 % 2;
    let potenciacion: number = 2 ** 2;

    console.log(10 / 0);   // Infinity
    console.log(-10 % 3);  // -1

    // Estos alteran el valor original de la variable, pero su comportamiento varia.
    let incremento:number = suma++; // devuelve el valor original, luego suma 1.
    let decremento:number = resta--; // devuelve el valor original, luego resta 1.
    let preIncremento:number = ++suma; // Suma 1, luego devuelve el nuevo valor.
    let preDecremento:number = --resta; // Resta 1, luego devuelve el nuevo valor.
    console.log(incremento);
    console.log(decremento);
    console.log(preIncremento);
    console.log(preDecremento);

    // Operadores de asignacion matematica.
    suma += suma +5;
    resta -= resta - 5;
    multiplicacion *= multiplicacion; // equivalente a: multiplicacion = multiplicacion * multiplicacion
    division /= division + 1;
    modulo %= modulo * 2;
    potenciacion **= 2; // Equivalente a: potenciacion = potenciacion ** 2;

    // Funciones matematicas del objeto Math. Todas devuelven number.
    console.log(Math.abs(-5));
    console.log(Math.round(5.1)); // redondea numeros.
    console.log(Math.round(4.49)); 
    console.log(Math.floor(4.9)); // Trunca los decimales.
    console.log(Math.ceil(15.1)); // Trunca los decimales + 1.
    console.log(Math.pow(2,3)); // Potenciacion.
    console.log(Math.sqrt(4)); // Raiz cuadrada de x.
    console.log(Math.random()); // Genera numeros aleatorios entre 0 y 1.
    const n:number = 100;
    console.log(Math.floor(Math.random() * n)); // numeros enteros en el rango 0 y n. 

    // Detectando los valores especiales de number.
    // NaN: Un numero que no es un numero??? mejor investigalo por tu cuenta.
    console.log(Number.isNaN(0/0));
    console.log(Number.isNaN(1/0));
    // infinity
    console.log(Number.isFinite(1/0)); // Detectando infinity.
    // -infinity
    let infinitoNegativo = -(1/0);
    console.log(infinitoNegativo)
    console.log(Number.isFinite(infinitoNegativo));
    // Ejemplo de validacion.
    // validando que algo sea un number valido. (ni NaN ni infinity)
    function esNumeroValido(x:number):boolean{
        return typeof x === 'number' && Number.isFinite(x);
    }

}
/**
    / nunca lanza excepción si divides por cero, devuelve Infinity o -Infinity.
    % devuelve el resto de la división, no “residuo absoluto”; puede ser negativo.
 */
export {operadoresMatematicos};