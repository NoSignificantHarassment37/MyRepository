function DI() {
    class Motor {
        arrancar() {
            console.log("Motor arrancado");
        }
    }

    class Coche {
        constructor(private motor: Motor) { } // ✅ Motor se inyecta

        encender() {
            this.motor.arrancar();
        }
    }

    // Se inyecta desde afuera
    const motor = new Motor();
    const coche = new Coche(motor);
    coche.encender();

}
export { DI };