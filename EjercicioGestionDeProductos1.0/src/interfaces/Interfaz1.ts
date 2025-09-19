// Definimos una interfaz
interface Animal {
  nombre: string;
  hacerSonido(): void;
}

// Una clase que implementa la interfaz
class Perro implements Animal {
  nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  hacerSonido(): void {
    console.log(`${this.nombre} dice: ¡Guau!`);
  }
}

const firulais = new Perro("Firulais");
firulais.hacerSonido();
