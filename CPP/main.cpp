#include <iostream>
#include <chrono>

class Cronometro {
    using clock = std::chrono::steady_clock;
    std::chrono::time_point<clock> inicio;
    std::chrono::nanoseconds duracion{0};
    bool corriendo = false;

public:
    void iniciar() {
        if (!corriendo) {
            inicio = clock::now();
            corriendo = true;
        }
    }

    void detener() {
        if (corriendo) {
            duracion += std::chrono::duration_cast<std::chrono::nanoseconds>(clock::now() - inicio);
            corriendo = false;
        }
    }

    void reiniciar() {
        duracion = std::chrono::nanoseconds::zero();
        corriendo = false;
    }

    uint64_t tiempo() const {
        if (corriendo) {
            auto dur = duracion + std::chrono::duration_cast<std::chrono::nanoseconds>(clock::now() - inicio);
            return dur.count();
        } else {
            return duracion.count();
        }
    }
};

int main() {
    Cronometro cr;
    cr.iniciar();

    // Simular una tarea que tome algo de tiempo
    volatile int suma = 0;
    for (int i = 0; i < 1000000; ++i) {
        suma += i;
    }

    cr.detener();

    std::cout << "Tiempo real transcurrido: " << cr.tiempo() << " nanosegundos\n";

    return 0;
}
