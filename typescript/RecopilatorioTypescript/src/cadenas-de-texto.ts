function cadenasDeTexto() {
    /*
     Las cadenas de texto se pueden ver como un conjunto indexado de caracteres, UTF-16 generalmente.
     */
    // '', "" y `` son aceptadas para crear cadenas de texto, pero para interpolacion, solo se permite ``.
    let cadena: string = 'Hola!';
    let nombre: string = 'Mateo';
    let otraCadena: string = "Hello World!";
    let otraOtraCadena: string = `Hello World!`;
    // Concatenacion de cadenas de texto:
    // Se hace con el operador '+'
    let mateo = `Mateo`;
    let atehortua = `Atehortua`;
    console.log(mateo + atehortua);
    // el operador '+' se comporta diferente al tratar strings y numeros.
    console.log(`1` + 1);
    console.log(`1 + ${1}`);

    // interpolacion de cadenas de texto: permite introducir cosas de forma literal y directa en una cadena de texto.
    // Al intentar introducir algo que no sea un string, se llama al metodo .toString() y el resultado sera lo que se introduzca.
    console.log(`${cadena}, ${nombre}`);
    console.log(`1 + ${{ nombre: "Mateo", id: 1 }}`);
    console.log(`1 + ${{ nombre: "Mateo", id: 1 }.toString()}`); // imprime exactamente lo mismo.
    console.log(`1 + ${[1, 2, 3].toString()}`);
    console.log(`1 + ${Symbol("id").toString()}`); // aqui es obligatorio llamar a .toString()

    // Metodos utiles de strings.
    let texto: string = " TypeScript es cool ";

    texto.length;             // 20
    texto.trim();             // "TypeScript es cool"
    texto.toUpperCase();      // "TYPESCRIPT ES COOL"
    texto.toLowerCase();      // "typescript es cool"
    texto.includes("Script"); // true
    texto.startsWith("Type"); // true
    texto.endsWith("cool");   // true
    texto.slice(0, 10);       // " TypeScrip"
    texto.substring(1, 5);    // "Type"
    texto.replace("cool", "genial"); // " TypeScript es genial"
    texto.split(" ");         // ["", "TypeScript", "es", "cool"]

    // los arrays son indexados, asi que se puede acceder a un caracter en una posicion x, con x entero positivo.
    let c = texto[0];  // " "
    let d = texto.charAt(1); // "T"
    // A diferencia de python, los indices deben ser positivos.
    console.log(texto[-2]);

    let emoji = "😎";
    console.log(emoji.length);      // 2 (surrogate pair)
    console.log(emoji.codePointAt(0)); // 128526
    // para iterar sobre cadenas de caracteres hay dos opciones:
    for (let i = 0; i < emoji.length; i++) {
        console.log(emoji[i]);
    }
    // la que se usa en realidad seria esta:
    // imprime dos “caracteres falsos”
    for (let c of emoji) console.log(c); // 😎
    // Se pueden convertir cadenas de texto que representan numeros a numeros verdaderos y viceversa.
    console.log(Number("123")); 
    console.log(Number("Hola!")); // NaN
    console.log((123).toString());
}
export { cadenasDeTexto };