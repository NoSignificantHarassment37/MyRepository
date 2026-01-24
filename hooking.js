function greet(name) {
  console.log(`Hello, ${name}`);
}

// Hook “enganchando” la función
const originalGreet = greet;
greet = function(name) {
  console.log("Hook: alguien va a saludar");
  originalGreet(name); // llamamos al original
  console.log("Hook: saludo terminado");
}

greet("Mateo");
// Output:
// Hook: alguien va a saludar
// Hello, Mateo
// Hook: saludo terminado
