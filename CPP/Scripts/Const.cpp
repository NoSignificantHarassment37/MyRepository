#include <iostream>
#include "Const.h"
using std::endl;
using std::cout;
using std::string;
// Función para imprimir referencia constante
void imprimir(const string& texto) {
    // texto = "Hola"; // Ilegal, no se puede modificar.
    // string *ptr = &texto; // Ilegal, el puntero tambien debe ser ser constante.
    // string& ref = texto; // Ilegal, la referencia tambien debe ser constante.
    const string& ref = texto; // Valido, referencia tambien es constante.
    const string* ptr = &texto; // Valido, el puntero no puede modificar el valor.
    cout << "Usando la referencia a texto: " << ref << endl;
    cout << "Desreferenciando el puntero a texto: " << *ptr << endl;
    cout << "Accediendo literalmente a texto: " << texto << endl;
}

void Constantes() {
    cout << "--- Constantes simples ---" << endl;
    const int x = 5;
    cout << "x = " << x << endl;
    // x = 10; // ❌ Error: no se puede modificar

    cout << "\n--- Puntero a constante ---" << endl;
    int a = 10, b = 20;
    const int* ptr = &a;  // valor apuntado constante
    cout << "*ptr = " << *ptr << endl;
    ptr = &b;              // ✅ Se puede cambiar a dónde apunta
    // *ptr = 30;          // ❌ No se puede modificar el valor apuntado

    cout << "\n--- Puntero constante ---" << endl;
    int* const cptr = &a;  // puntero constante
    *cptr = 15;            // ✅ Se puede modificar el valor apuntado
    cout << "*cptr = " << *cptr << endl;
    // cptr = &b;           // ❌ No se puede cambiar la dirección del puntero

    cout << "\n--- Puntero constante a constante ---" << endl;
    const int* const puntero_x = &x;
    cout << "*puntero_x = " << *puntero_x << " (no se puede cambiar)" << endl;
    // *puntero_x = 12;    // ❌ Error
    // puntero_x = &b;     // ❌ Error

    cout << "\n--- Referencias ---" << endl;
    int y = 50;
    int& ref = y;          // referencia normal
    ref = 100;             // ✅ cambia 'y' también
    cout << "y = " << y << endl;

    cout << "\n--- Referencias constantes ---" << endl;
    const int& cref = y;   // referencia constante
    cout << "cref = " << cref << endl;
    // cref = 200;          // ❌ No se puede modificar el valor

    cout << "\n--- Referencia constante a un objeto temporal ---" << endl;
    const string& texto = "Hola Mundo"; // rvalue seguro con const ref
    imprimir(texto);                     // ✅ pasa sin copiar
    const string texto_2 = "Hola!!!!";
    imprimir(texto_2);
}