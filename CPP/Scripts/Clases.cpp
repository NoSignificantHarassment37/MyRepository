#include <string>
#include <format>
#include <string>
#include <sstream>
#include <vector>

template<typename T>
std::string toString(const T& value) {
    std::stringstream ss;
    ss << value;
    return ss.str();
}

// Función tipo format casera
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
                result += "{}"; // si no hay argumento, deja los corchetes
            }
            ++i; // saltar el '}'
        } else {
            result += fmt[i];
        }
    }

    return result;
}

enum class TipoDeDocumento {
    Tarjeta_De_Identidad,
    Cedula,
    Permiso_De_Permanencia
};
class Persona {
    std::string nombre;
    std::string numeroDeDocumento;
    TipoDeDocumento tipoDeDocumento;
    public:
        Persona(const std::string& _nombre, const std::string& _numeroDeDocumento, const TipoDeDocumento& _tipoDeDocumento):
        nombre(_nombre), numeroDeDocumento(_numeroDeDocumento), tipoDeDocumento(_tipoDeDocumento){}
        std::string toString(){
            std::string temp = myFormat("Nombre: {}, Documento: {}, Tipo de documento: {}", nombre, numeroDeDocumento, tipoDeDocumento);
            return temp;
        }
};