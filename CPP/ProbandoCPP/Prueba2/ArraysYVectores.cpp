#include <vector>
#include <iostream>
#include <string>
#include <array>

using namespace std;

void ArraysYVectores()
{
	// Aqui es donde todo se pone interesante... C++ empieza a mostrar su verdadera cara desde aquí.
	// Arrays crudos: Para resumir, se comportan parecido a los arrays de C#. No se usan en C++ moderno, pero muestra la verdadera naturaleza del bajo nivel.
	int arrayCrudo[5] = { 1,2,3,4,5 }; // MUCHO CUIDADOOOOOOO, si intentas acceder a algo fuera de los indices del array, NO arroja excepcion!, acaba generando un comportamiento indefinido.

	cout << arrayCrudo[6] << endl; // Esto es a lo que me refiero, espero no falle si se ejecuta en otro PC...

	int arr2[2][3] = { {1,2,3}, {4,5,6} };
	cout << arr2 << endl; // un puntero! ya que lo que guarda la variable 'arr' es un puntero al primer elemento.

	// array moderno: Es el equivalente real a los arrays de C#.
	// Declaracion.
	array<int, 5> arrayModerno;             // sin inicializar → basura
	array<int, 5> arrayModerno2 = { 1,2,3 };  // los faltantes quedan en 0
	array<int, 5> arrayModerno3{};          // inicializa todo en 0

	// Acceso
	array<int, 3> arrayModerno4 = { 10, 20, 30 };

	cout << arrayModerno4[0] << endl;   // acceso normal
	cout << arrayModerno4.at(1) << endl; // acceso seguro → lanza excepción si te sales

	array<int, 5> arrayModerno5 = { 1,2,3,4,5 };

	cout << arrayModerno5.size() << endl;   // número de elementos (5)
	cout << arrayModerno5.front() << endl;  // primer elemento (1)
	cout << arrayModerno5.back() << endl;   // último elemento (5)

	arrayModerno5.fill(7);                  // pone todos los elementos en 7

	// Recorrer el array:
	array<int, 4> arr = { 1,2,3,4 };

	// for clásico
	for (size_t i = 0; i < arr.size(); i++) {
		cout << arr[i] << " ";
	}

	// range-based for
	for (int x : arr) {
		cout << x << " ";
	}

	// con iteradores
	for (auto it = arr.begin(); it != arr.end(); ++it) {
		cout << *it << " ";
	}
	
	array<int, 3> a = { 1,2,3 };
	array<int, 3> b = { 1,2,3 };
	array<int, 3> c = { 3,2,1 };

	cout << (a == b) << endl; // true, no sé por qué se pueden comparar directamente por contenido.
	cout << (a < c) << endl;  // compara lexicográficamente, ni mucho menos por qué esto también.

	// Copia y asignación
	array<int, 3> arrayOriginal = { 1,2,3 };
	array<int, 3> arrayCopia = arrayOriginal; // copia completa, copia el contenido REAL del array 'a' al 'b', por lo que modificar uno no altera el otro.

	// Vector: Es el equivalente a las listas de C#.
	vector<int> vector = { 1,2,3,4,5 };
	vector.push_back(6);
	vector.push_back(7);
	for (int i : vector) {
		cout << i << ' ';
	}
	cout << endl;

	cout << "Tamaño: " << vector.size() << endl;
	cout << "Capacidad reservada: " << vector.capacity() << endl;

	// Insercion y borrado:
	vector.push_back(99);   // añadir al final
	vector.pop_back();      // eliminar último
	vector.insert(vector.begin() + 1, 123); // insertar en pos 1
	vector.erase(vector.begin());           // borrar en pos 0

	cout << vector[0] << endl;     // acceso directo
	cout << vector.at(2) << endl;  // acceso seguro (lanza excepción si te sales)

	cout << "vector.size():" << vector.size() << endl;     // elementos actuales
	cout << "vector.capacity()" << vector.capacity() << endl; // espacio reservado (puede ser mayor a size)
	vector.resize(10); // cambia el tamaño, rellena con 0 si agranda
	vector.clear();   // elimina todos los elementos

	vector.push_back(1);

	cout << vector.front() << endl; // primer elemento
	cout << vector.back() << endl;  // último elemento
	cout << vector.empty() << endl; // true si está vacío (recuerda que si imprimes un booleano directamente se escribe 0 o 1.)
}