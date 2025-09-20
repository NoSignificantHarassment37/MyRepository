#include <iostream>
#include <string>

using namespace std;

void Punteros()
{
	/*
	Un puntero es una variable que guarda la direccion en memoria de otra variable.
	Imagina la memoria como una ciudad real con sus carreras y sus calles, cada casa es un bloque de memoria, un puntero es la direccion de una casa.

	Desde siempre eso es lo que se hace al crear una variable: reserva memoria en el stack/heap, cuando asignamos/cambiamos el valor, lo que se hace es obtener la direccion
	en donde está ese objeto.

	De momento las utilidades parecen pocas pero más adelante voy a investigar para que sirven.
	*/

	int a = 0;
	int b = a; // Copia real de valor, b no es un puntero al bloque de memoria al que 'a' apunta.

	cout << "Valor de a: " << a << endl;
	cout << "Valor de b: " << b << endl;

	b = 1;

	cout << "Valor de a: " << a << endl;
	cout << "Valor de b: " << b << endl;

	/*
	Explicando las tres cosas nuevas:
	int* declara una variable que es un puntero a un int.
	&a obtiene la dirección en memoria de a
	*p le dice que traiga lo que hay en la dirección que p guarda.
	*/

	int* p = &a; // No es una copia del valor, p apunta a la direccion en memori a la que 'a' apunta. Por eso cuando la cambio, parece que p también cambia.

	cout << "Valor de p: " << *p << endl;

	a = 100;

	cout << "Valor de a: " << a << endl;
	cout << "Valor de p: " << *p << endl;
}