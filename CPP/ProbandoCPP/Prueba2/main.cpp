#include <iostream> // Busca en las rutas estándar del compilador (librerías del sistema/Visual Studio). 
// #include "TiposPrimitivos.cpp" Nunca se incluyen .cpp dentro de otro .cpp, o si no el linker se queja porque se estaria definiendo la misma firma dos veces.
#include "headers.h" // Para importar cosas desde otro .cpp se tiene que usar un archivo .h intermedio.
int main()
{
	Punteros();
}