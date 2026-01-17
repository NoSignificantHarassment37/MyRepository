#include <iostream>
#include <string>
#include <format>
#include <string>
#include <sstream>
#include <vector>
#include <memory>
#include "Clases.h"
        
Persona::Persona(const std::string& _nombre, const std::string& _numeroDeDocumento, TipoDeDocumento _tipoDeDocumento)
    : nombre(_nombre), numeroDeDocumento(_numeroDeDocumento), tipoDeDocumento(_tipoDeDocumento) {}

std::string Persona::toString() const {
    return myFormat("Nombre: {}, Documento: {}, Tipo de documento: {}", nombre, numeroDeDocumento, tipoDeDocumento);
}

void Persona::cambiarTipoDeDocumento(TipoDeDocumento nuevoTipo) {
    tipoDeDocumento = nuevoTipo;
}

void Clases() {
    std::cout << "Entrando a clases" << std::endl; 
    std::unique_ptr persona = std::make_unique<Persona>("Mateo", "1033260098", TipoDeDocumento::Tarjeta_De_Identidad); // Esto se libera al salir del scope.
    std::cout << persona->toString() << std::endl; // unique_ptr tiene el operador '->' que sirve para acceder a miembros de la instancia interna.
    std::cout << "Saliendo de Clases" << std::endl;
}