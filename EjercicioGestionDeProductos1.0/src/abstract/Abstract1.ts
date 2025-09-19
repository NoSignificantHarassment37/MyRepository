// Definimos una clase abstracta
abstract class Figura {
  abstract area(): number; // método abstracto (obligatorio en hijas)

  descripcion(): void {
    console.log("Soy una figura geométrica.");
  }
}

// Una clase hija que implementa el método abstracto
class Cuadrado extends Figura {
  lado: number;

  constructor(lado: number) {
    super();
    this.lado = lado;
  }

  area(): number {
    return this.lado * this.lado;
  }
}

const cuadrado = new Cuadrado(5);
cuadrado.descripcion(); // "Soy una figura geométrica."
console.log("Área:", cuadrado.area());
