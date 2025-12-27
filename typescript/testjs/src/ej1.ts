// Desafío: Escribe una función que calcule cuántas cajas necesita Santa
// Reglas:
// - Cada caja aguanta hasta 10kg
// - Cada regalo tiene un peso diferente
// - No se puede partir regalos entre cajas
// Ejemplo: [1, 5, 3, 8, 2, 7] → 3 cajas
// Caja 1: 1+5+3 = 9kg
// Caja 2: 8+2 = 10kg
// Caja 3: 7kg
/**
 * cajas = 0
 * [2,3,4,5,5,5,6,9,10]
 * 10 + 2 = 12.
 * caso 1: la suma del mayor numero y menor numero posible es mayor a 10: solo el numero mayor puede ocupar la caja.
 * cajas = 1
 * [2,3,4,5,5,5,6,9]
 * 9 + 2 = 11.
 * cajas = 2
 * [2,3,4,5,5,5,6]
 * 6 + 2 = 8.
 * caso 2: la suma del mayor y menor numero es menor a 10: se debe seguir probando numeros hasta llenarla y concluir que no hay numeros disponibles para llenarla.
 * Para esto, propongo probar primero con el indice: mayor numero - 1.
 * 8 + 5 = 13, 13 > 10, por lo que se descarta este candidato y se prueba con el indice: menor numero + 1.
 * 8 + 2 = 10: si es igual a 10, caja llena.
 * [3,4,5,5,5,6]
 * 6 + 3 = 9, caso 2: la suma del mayor y menor numero es menor a 10: se debe seguir probando numeros hasta llenarla y concluir que no hay numeros disponibles para llenarla.
 * Para esto, propongo probar primero con el indice: mayor numero - 1.
 * [4,5,5,5]
 * 9 + 5 = 14. 14 > 10, no satisface la regla, entonces probaremos con menor indice + 1.
 * 9 + 4 = 13. 13 > 10.
 * No hay más candidatos para seguir llenando la caja, por lo que la caja se interpreta como llena.
 * cajas = 3.
 * [4,5,5,5]
 * 5 + 4 = 9.
 */
/**
   El algoritmo planteado es:
   dado un array ordenado, por ejemplo:
   cajas = 0.
   [1,3,5,6,10]
    0 1 2 3 4
   probar a sumar el primer y ultimo numero, si la suma es igual a diez: caja completada, si es mayor a diez, el numero mayor solo puede caber en una caja.
    1 + 10 = 11, 11 > 10, 10 ocupa una caja, y el 10 ahora se descarta (elemento en indice 4) y cajas += 1.
    ahora tenemos: 
    [1,3,5,6]
     0 1 2 3
    
    probamos primer y ultimo indice: 
    1 + 6 = 7, 7 < 10, todavia hay hueco en la caja.
    probamos con el indice -1 al ultimo:
    7 + 5 = 12, 12 > 10, entonces probamos con el indice: menor numero + 1, 3.
    7 + 3 = 10, 10 = 10, entonces, 6 + 3 + 1 son descartados y cajas += 1
    ahora quedamos con:
    cajas = 2
    [5]
    solo queda un elemento, por lo que sólo ese puede ocupar la caja, entonces: 
    cajas = 3.
    []
    Ya no hay regalos por organizar en cajas!
    se retorna la variable cajas.
    
    observaciones iniciales:
    1. Siempre antes de hacer cualquier operacion, se debe confirmar si ya se evaluaron todos los números. (número haya sido recorrido por lo bucles).
    2. No se qué pueda pasar cuando al final del algoritmo, los tres números que queden puedan ocupar una caja. *tendré que programar un caso específico?*
    3. Se asume que los valores de los números pueden ser inválidos, así que se debe validar que todos los elementos del array estén en el rango 1 - 10.
    *parte del ejercicio adelantado*
    observaciones: se tiene que crear una funcion con backtracking.
    */
function cajasNecesarias(regalos: number[]): number[][] {
  console.log(regalos);
  // regalos = [1, 5, 3, 8, 2, 7]
  // return número de cajas
  if (!regalos.every((number) => number < 11 && number > 0)) throw new Error();
  let cajas = 0;
  let acumulador = 0;
  let j = regalos.length - 1;
  let container: number[][] = [];
  for (let i = 0; i <= j; i++) {
    const piso = regalos[i];
    const techo = regalos[j];
    if (piso === undefined || techo === undefined) {
      throw new Error("piso o techo fueron undefined");
    }
    acumulador += techo + piso;
    if (acumulador === 10) {
      j--;
      cajas++;
      container.push([piso, techo]);
      acumulador = 0;
      continue;
    }
    if (acumulador < 10) {
      /**
       * Esta es para mí el caso mas difícil de implementar, ya que implica seguir probando con una serie desconocida de números.
       * *TAG* primero se prueba a sumar a acumulador el número j - 1, pueden pasar tres cosas:
       * acumulador === 10: ya se terminó de llenar la caja.
       * acumulador > 10: se revierte j - 1, y se prueba i + 1:
       *  acumulador === 10: ya se termino de llenar la caja.
       *  acumulador > 10: no hay más números para probar, se revierte i + 1 y la caja se da por llena.
       *  acumulador < 10: ahora, i = i + 1. nos devolvemos a ejecutar todo otra vez hasta *TAG* (no hay goto en TS, por lo que eso se programa como bucle).
       * acumulador < 10: ahora, j = j - 1. nos devolvemos a ejecutar todo otra vez hasta *TAG* (no hay goto en TS, por lo que eso se programa como bucle).
       */
      let temp = [];
      while (i <= j) {
        j--;
        const techoMenos1 = regalos[j];
        if (techoMenos1 === undefined)
          throw new Error("regalos[j] fue undefined.");
        acumulador += techoMenos1;
        if (acumulador === 10) {
          cajas++;
          j--;
          temp.push(techo, piso, techoMenos1);
          container.push(temp);
          acumulador = 0;
          break;
        }
        if (acumulador > 10) {
          // Revirtiendo cambios hechos con j.
          j++;
          acumulador -= techoMenos1;
          // Probando i + 1.
          i++;
          const sueloMas1 = regalos[i];
          if (sueloMas1 === undefined)
            throw new Error("regalos[i] fue undefined.");
          acumulador += sueloMas1;
          if (acumulador === 10) {
            cajas++;
            j--;
            temp.push(sueloMas1, piso, techo);
            container.push(temp);
            acumulador = 0;
            break;
          }
          if (acumulador > 10) {
            // revirtiendo todo y dando la caja por llena...
            i--;
            j--;
            cajas++;
            container.push([piso, techo]);
            acumulador = 0;
            break;
          }
          if (acumulador < 10) {
            // Aqui hay que hacer otra iteracion, ya que todavia queda hueco en la caja.
            temp.push(sueloMas1);
            continue;
          }
        }
        if (acumulador < 10) {
          // Aqui hay que hacer otra iteracion, ya que todavia queda hueco en la caja.
          temp.push(techoMenos1);
          continue;
        }
      }
    }
    if (acumulador > 10) {
      // Aqui se descarta que haya un número en la colección que satisfaga: j + x <= 10, por lo que simplemente se resta piso y se suma 1 a cajas.
      i--;
      cajas++;
      acumulador = 0;
      container.push([techo]);
      j--;
    }
  }
  return container;
}
/**
 * cajas = 1
 * [1,1,1,1,1,2,2,2,2,2]
 * 1 + 2 = 3,
 * 3 + 2 = 5,
 * 5 + 2 = 7,
 * 7 + 2 = 9,
 * 9 + 2 = 11,
 * 9 + 1 = 10
 * 2 + 1 = 3,
 * 3 + 2 = 5,
 *
 */
console.log(cajasNecesarias([9, 1, 9, 1, 9, 1]));
/**
 * [1, 1, 2, 3, 4, 5, 6, 7, 9, 10]
 * suma total = 4.8
 *
 */
