#include <iostream>
#include <string>
#include "Clases.h"
#include <memory>
void MemoriaAvanzada() {
    std::unique_ptr x = std::make_unique<Persona>();
    std::cout << x << std::endl;
}