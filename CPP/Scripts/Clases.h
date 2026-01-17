#pragma once

#include <string>
#include <ostream>
// =======================
// Utilidades de formato
// =======================

// Declaración (las plantillas necesitan definición en header,
// así que aquí sí va el cuerpo)
#include <sstream>
#include <vector>

template<typename T>
std::string toString(const T& value) {
    std::stringstream ss;
    ss << value;
    return ss.str();
}

template<typename... Args>
std::string myFormat(const std::string& fmt, Args... args) {
    std::vector<std::string> values = { toString(args)... };
    std::string result;
    size_t argIndex = 0;

    for (size_t i = 0; i < fmt.size(); ++i) {
        if (fmt[i] == '{' && i + 1 < fmt.size() && fmt[i + 1] == '}') {
            if (argIndex < values.size()) {
                result += values[argIndex++];
            } else {
                result += "{}";
            }
            ++i;
        } else {
            result += fmt[i];
        }
    }
    return result;
}

// =======================
// Enum
// =======================

enum class TipoDeDocumento {
    Tarjeta_De_Identidad,
    Cedula,
    Permiso_De_Permanencia
};

// Operador de salida (solo declaración)

inline std::ostream& operator<<(std::ostream& os, TipoDeDocumento tipo) {
    switch (tipo) {
        case TipoDeDocumento::Tarjeta_De_Identidad:
            os << "Tarjeta de Identidad";
            break;
        case TipoDeDocumento::Cedula:
            os << "Cedula";
            break;
        case TipoDeDocumento::Permiso_De_Permanencia:
            os << "Permiso de Permanencia";
            break;
    }
    return os;
}

// =======================
// Clase Persona
// =======================

class Persona {
    std::string nombre;
    std::string numeroDeDocumento;
    TipoDeDocumento tipoDeDocumento;
public:
    Persona(const std::string& _nombre, const std::string& _numeroDeDocumento, TipoDeDocumento _tipoDeDocumento);

    std::string toString() const; // declarar solo
    void cambiarTipoDeDocumento(TipoDeDocumento nuevoTipo);
};

// =======================
// Función de ejemplo
// =======================

void Clases();
