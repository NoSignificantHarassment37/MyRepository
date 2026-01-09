#include <iostream>
#include <string>
#include "Punteros.h"
using namespace std;

void PunterosYMemoriaAvanzado() {
    cout << "=== MINI LABORATORIO DE MEMORIA ===\n\n";

    // ---- STACK ----
    int a = 10;
    int b = a; // copia de valor
    int& refA = a; // referencia (alias)

    cout << "--- STACK ---\n";
    cout << "Variable a: valor=" << a << " direccion=" << &a << endl;
    cout << "Variable b: valor=" << b << " direccion=" << &b << " (copia independiente)\n";
    cout << "Referencia refA: valor=" << refA << " direccion=" << &refA << " (alias de a)\n";

    // Cambiando valores
    b = 20;
    refA = 30; // cambia 'a' también
    cout << "\n--- Después de cambios ---\n";
    cout << "a = " << a << " (cambiado via refA)\n";
    cout << "b = " << b << "\n";

    // ---- HEAP ----
    cout << "\n--- HEAP ---\n";
    int* heapInt = new int(100);
    short* heapShort = new short(50);

    cout << "heapInt: valor=" << *heapInt << " direccion=" << heapInt << endl;
    cout << "heapShort: valor=" << *heapShort << " direccion=" << heapShort << endl;

    // Modificar valor a través del puntero
    *heapInt = 200;
    cout << "\nheapInt modificado a través del puntero: " << *heapInt << endl;

    // ---- MAPA VISUAL DE MEMORIA ----
    cout << "\n--- MAPA VISUAL DE MEMORIA ---\n";
    cout << "[STACK] a=" << &a << ", b=" << &b << ", refA=" << &refA << endl;
    cout << "[HEAP ] heapInt=" << heapInt << ", heapShort=" << heapShort << endl;

    // Liberar heap
    delete heapInt;
    delete heapShort;
    heapInt = nullptr;
    heapShort = nullptr;

    cout << "\nMemoria heap liberada. Punteros ahora a nullptr.\n";
    cout << "heapInt=" << heapInt << ", heapShort=" << heapShort << endl;
}