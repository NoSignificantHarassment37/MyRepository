function main() {
    // Tipos primitivos
    const numeros: number = 0; // doble precision, IEEE 754
    const cadenasDeTexto: string = "Hello World!"; // tipicamente UTF-16, dependiendo del motor. (v8, spidermonkey, chakra)
    const booleanos: boolean = true; // El tipico true o false.
    const numerosDePrecisionArbitraria: bigint = 1n; // Numeros de precision limitada por memoria.
    const simbolos: symbol = Symbol("id"); // Identificadores unicos globales.
    const nulos: null = null; // Ausencia intencional de valor, se usa cuando se quiere dar a entender que no hay algo.
    const noExiste: undefined = undefined; // valor no definido, generalmente devuelto al acceder a propiedades inexistentes de un objeto.  

    const cualquierCosa: any = {}; // Literalmente cualquier cosa, no se usan typescript.
    const desconocidos: unknown = {}; // se necesita verificar el tipo antes de hacer cualquier cosa con él.
    function saludar(): void { // valor devuelto por una funcion, cuyo retorno es NADA. No confundir con null.
        console.log("Hola!");
    }
    const v: void = saludar();
    console.log(v);
    function bucleInfinito():never{
        while(true){
            console.log("Es un bucle infinito, por lo que esta funcion nunca retorna algo.");
        }
    }
    const objetos:object = () => 1; // Cualquier cosa que no sea un valor primitivo, arrays, objetos literales, funciones. (no confundir con objetos literales.)
    const arreglos:number[] = [1,2,3]; // Conjunto de elementos indexada, mutable y a diferencia de javascript, en typescript siempre deben contener elementos del mismo tipo.
    const arreglo2: Array<number> = [1,2,3]; // tambien puede tener este tipo, pero conceptualmente son lo mismo.
    const tuplas:[string, number] = ["Mateo", 18]; // SON ARREGLOS, pero en tiempo de compilacion se comportan como conjuntos de elementos fijos.

    const valoresLiterales:1 | 0 = 1; // Solo puede tener un valor u otro.
    let uniones:string | number = "Mateo"; // Solo pueden ser de un tipo u otro.
    uniones = 12;
    type Persona = { id:number, nombre:string, codigo:string };
    type Empleado = { codigo:string, salario:number };
    const intersecciones:Persona & Empleado = { id:1, nombre:"Mateo", codigo:"44VCK", salario:12000 }; // Representan la combinacion de dos tipos.
    
}
export { main };