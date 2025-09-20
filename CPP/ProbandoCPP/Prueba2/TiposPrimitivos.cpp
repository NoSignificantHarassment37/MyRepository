// Prueba2.cpp : Este archivo contiene la función "main". La ejecución del programa comienza y termina ahí.
//

#include <iostream>
#include <string>

using namespace std;

double sumar(double a, double b)
{
    return a + b;
}

void PrimitivosMain()
{
    // IMPORTANTE: Si vas a declarar tipos como long, long long, recuerda colocar su literal, o si no se hara un cast implicito a otro tipo de dato, aqui hay ejemplos de cada uno.
    // Tipos de datos primitivos: (me da pereza nombrarlos bien)
    bool a = false; // El tipico, ocupa 1 byte.
    char b = 'a'; // Perfecto para caracteres ASCII
    short c = 1; // entero de 2 bytes.
    int d = 1; // entero de 4 bytes.
    long e = 1l; // entero de 8 bytes.
    long long f = 1ll; // entero de 16 bytes.
    float g = 2.1f;
    double h = 2.0294; // 
    long double i = 2.04839874958l; // doble precision de 80-128 bits, depende de la maquina.
    char16_t j = u'a'; // char de utf16
    char32_t k = U'X'; // Char de utf32
    wchar_t o = L'Z'; // Char 
    // Solo como ejemplos de los literales de cada uno.
    unsigned int l = 1u; // importante colocar 'u' porque si no, hace cast implicito a signed int, unsigned se puede usar con todos los numeros.
    unsigned long m = 1ul;
    unsigned long long n = 1ull;

    cout << a << endl;
    cout << b << endl;
    cout << c << endl;
    cout << d << endl;
    cout << e << endl;
    cout << f << endl;
    cout << g << endl;
    cout << h << endl;
    cout << i << endl;
    cout << j << endl;
    cout << k << endl;
    cout << l << endl;

    cout << "Abajo el espacio que ocupan en bytes." << endl;
    cout << "bool: " << sizeof(bool) << endl;
    cout << "char: " << sizeof(char) << endl;
    cout << "short: " << sizeof(short) << endl;
    cout << "int: " << sizeof(int) << endl;
    cout << "long: " << sizeof(long) << endl;
    cout << "long long: " << sizeof(long long) << endl;
    cout << "float: " << sizeof(float) << endl;
    cout << "double: " << sizeof(double) << endl;
    cout << "long double (varia segun el compilador): " << sizeof(long double) << endl;
    cout << "char16_t: " << sizeof(char16_t) << endl;
    cout << "char32_t: " << sizeof(char32_t) << endl;
    cout << "unsigned int: " << sizeof(unsigned int) << endl;
    
    string A;
    cin >> A;
}
// Ejecutar programa: Ctrl + F5 o menú Depurar > Iniciar sin depurar
// Depurar programa: F5 o menú Depurar > Iniciar depuración

// Sugerencias para primeros pasos: 1. Use la ventana del Explorador de soluciones para agregar y administrar archivos
//   2. Use la ventana de Team Explorer para conectar con el control de código fuente
//   3. Use la ventana de salida para ver la salida de compilación y otros mensajes
//   4. Use la ventana Lista de errores para ver los errores
//   5. Vaya a Proyecto > Agregar nuevo elemento para crear nuevos archivos de código, o a Proyecto > Agregar elemento existente para agregar archivos de código existentes al proyecto
//   6. En el futuro, para volver a abrir este proyecto, vaya a Archivo > Abrir > Proyecto y seleccione el archivo .sln

/*
Tipo	Tamaño aprox.	Rango (signed)
bool	1 byte	true / false
char	1 byte	-128 a 127 o 0 a 255
short	2 bytes	-32,768 a 32,767
int	4 bytes	-2,147,483,648 a 2,147,483,647
long	4 u 8 bytes	depende de plataforma
long long	8 bytes	±9.22e18
float	4 bytes	~7 decimales
double	8 bytes	~15 decimales
long double	8–16 bytes	depende del compilador
char16_t	2 bytes	UTF-16
char32_t	4 bytes	UTF-32
*/
