#include <iostream>
#include <memory>
#include "Clases.h"

void Tests() {
    std::unique_ptr<Persona> personaPtr = std::make_unique<Persona>("Mateo","1033260098",TipoDeDocumento::Tarjeta_De_Identidad);
    personaPtr->cambiarTipoDeDocumento(TipoDeDocumento::Cedula);
    std::cout << personaPtr->toString() << std::endl;
}