// Desafío: Escribe una función que calcule cuántas cajas necesita Santa
// Reglas:
// - Cada caja aguanta hasta 10kg
// - Cada regalo tiene un peso diferente
// - No se puede partir regalos entre cajas
// Ejemplo: [1, 5, 3, 8, 2, 7] → 3 cajas
// Caja 1: 1+5+3 = 9kg
// Caja 2: 8+2 = 10kg
// Caja 3: 7kg

function cajasNecesarias(regalos: number[]): number {
  const sumaAcumulada = regalos.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return Math.ceil(sumaAcumulada / 10);
}
/**
 * Esta función de búsqueda binaria no la implementé yo, ya conocía el algoritmo así que para agilizar le pedí a chatgpt que me soltara una definición.
 */
function binarySearch(arr: number[], target: number): number {
  let left: number = 0;
  let right: number = arr.length - 1;

  while (left <= right) {
    const mid: number = Math.floor((left + right) / 2);
    const value: number | undefined = arr[mid];
    if (!IsNumber(value)) throw new TypeError();
    if (value === target) {
      return mid; // encontrado
    }

    if (value < target) {
      left = mid + 1; // busca derecha
    } else {
      right = mid - 1; // busca izquierda
    }
  }
  return -1;
}
function encontrarNumerosQueSumen(array: number[], numero: number): number[] {
  const posibleNumero = binarySearch(array, numero);
  if (posibleNumero !== -1) {
    return [posibleNumero];
  }
  for (let i = 0; i <= array.length - 1; i++) {
    for (let j = 0; j <= array.length - 1; j++) {
      const numeroA = array[i];
      const numeroB = array[j];
      if (numeroA === undefined || numeroB === undefined) {
        throw new Error();
      }
      if (i !== j && numeroA + numeroB === numero) {
        return [numeroA, numeroB];
      }
    }
  }
  throw new Error();
}
function IsNumber(a: unknown): a is number {
  return typeof a === "number";
}
console.log(cajasNecesarias([1, 1, 2, 3, 3, 5, 5, 7, 8, 10]));
/**
 * El algoritmo, de forma superficial consiste en:
 * Paso 1.
 * sumamos todos los elementos del arreglo.
 * 1. Si el resultado es un número entero, que cuyas unidades son iguales a 0, se salta hasta el paso 3.
 * 2. Si el resultado es un número entero, cuyas unidades NO son iguales a 0, seguimos al paso 2.
 * EJ: [1,2,3,4,5,6,7,8,9,10] = 45, las unidades son 5, por lo que seguimos al paso 2.
 * Paso 2.
 * X: las unidades del número, en este caso 5.
 * Paso 2A. 
 * Se necesita encontrar el número dentro del conjunto que sea igual a x, y si no existe, los números dentro dentro del conjunto, cuya suma sea x.
 * 1. se usa búsqueda binaria para intentar encontrar el número igual a x dentro del conjunto.
 * Si no se encuentra el número exacto dentro del array, se sigue al paso 2B, de lo contrario se salta hasta el paso 3.
 * Paso 2B.
 * Se tiene que usar un algoritmo diferente para encontrar los números que sumados sean igual a x.
 * De momento no se me ocurre un algoritmo específico, pero uno de exploración inteligente puede ser suficiente.
 * conjunto: [1,2,3]
 * x: 6.
 * 1 = 1
 * 1 + 2 = 3
 * 1 +2 + 3 = 6
 * 6 es la solucion.
 * EJ 2:
 * conjunto: [1, 1, 2, 3, 3, 5, 5, 7, 8, 10]
 * x: 6.
 * índice: 0
 * 1 = 1
 * 1 + 1 = 2
 * 1 + 1 + 2 = 4
 * 1 + 1 + 2 + 3 = 7
 * A partir de aquí se sabe que es inútil seguir con la iterando, ya que el acumulador es mayor a x, siempre que todos sean numeros positivos, claro.
 * (igual continuo otras tres iteraciones.)
 * 1 + 1 + 2 + 3 + 3 = 10
 * 1 + 1 + 2 + 3 + 3 + 5 = 15
 * 1 + 1 + 2 + 3 + 3 + 5 + 5 = 20
 * continuando con el siguiente elemento del conjunto...
 * indice: 1
 * 1 = 1
 * 1 + 2 = 3
 * 1 + 2 + 3 = 6, 6 = 6, por lo tanto, los indices que contienen los números son 1, 2, 3.
 * Paso 3: Estos números conformaran la única caja que pueda tener una sumatoria menor a 10, por lo que son inmediatamente descartados, (preferiblemente eliminados del conjunto).
 * [1, 3, 5, 5, 7, 8, 10]
 * Ahora, entre estos números tenemos que sacar
 */
