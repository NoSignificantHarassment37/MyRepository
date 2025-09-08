"use strict";

import { Producto } from "./Models/Producto.js";
import { CartItem } from "./Models/CartItem.js";

const productos = [
  new Producto(1, `Laptop`, 12000),
  new Producto(2, `Mouse`, 15000),
  new Producto(3, `Teclado`, 11500),
];

let cart = [];

function printCart() {
  cart.forEach((item) =>
    console.log(
      `${item.producto.id} : ${item.producto.nombre} : ${item.producto.precio} : ${item.cantidad}`
    )
  );
}
function agregarAlCarrito(productoId, cantidad) {
  // Validaciones iniciales.
  if (!Number.isInteger(productoId)) {
    throw new TypeError(`El id del producto no fue un numero entero.`);
  }
  if (!Number.isInteger(cantidad)) {
    throw new TypeError(`La cantidad de producto no fue un numero entero.`);
  }

  for (let item of cart) {
    if (item.producto.id === productoId) {
      item.cantidad += cantidad;
      return true;
    }
  }
  const productFound = productos.find((producto) => producto.id === productoId);
  if (productFound) {
    cart.push(new CartItem(productFound, cantidad));
    return true;
  }
  throw new Error(`No existe un producto con ese ID.`);
}
function eliminarDelCarrito(productoId) {
  // Validaciones iniciales
  if (!Number.isInteger(productoId)) {
    throw new TypeError(`El id del producto no fue un numero entero.`);
  }
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].producto.id === productoId) {
      cart.splice(i, 1);
      return true;
    }
  }
  return false;
}
function actualizarCantidad(productoId, nuevaCantidad) {
  if (!Number.isInteger(productoId)) {
    throw new TypeError(`El parametro 'productoId' debe ser un numero entero.`);
  }
  if (!Number.isInteger(nuevaCantidad)) {
    throw new TypeError(
      `El parametro 'nuevaCantidad' debe ser de tipo 'Number' y un numero entero.`
    );
  }
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].producto.id === productoId) {
      cart[i].cantidad = nuevaCantidad;
      return true;
    }
  }
  return false;
}
function calcularTotal() {
  const total = cart.reduce(
    (accumulator, currentValue) =>
      accumulator + currentValue.producto.precio * currentValue.cantidad,
    0
  );
  return total;
}
// Agregamos algunos productos
agregarAlCarrito(1, 1); // Agregamos 1 laptop
agregarAlCarrito(2, 2); // Agregamos 2 mouse
console.log("Carrito después de agregar productos:");
printCart();
// Debería mostrar [{ id: 1, ... cantidad: 1 }, { id: 2, ... cantidad: 2 }]

// Actualizamos la cantidad de un producto
actualizarCantidad(1, 2); // Ahora 2 laptops
console.log("Carrito después de actualizar cantidad:");
printCart();
// Debería mostrar [{ id: 1, ... cantidad: 2 }, { id: 2, ... cantidad: 2 }]

// Agregamos un producto que ya existe
agregarAlCarrito(1, 5); // Ahora 3 laptops
console.log("Carrito después de agregar un producto existente:");
printCart();
// Debería mostrar [{ id: 1, ... cantidad: 3 }, { id: 2, ... cantidad: 2 }]

// Calculamos el total
const total = calcularTotal();
console.log("Total del carrito:", total);
// 3 laptops * $1200 + 2 mouse * $25 = 3600 + 50 = 3650
// Debería mostrar 3650

// Eliminamos un producto
eliminarDelCarrito(2); // Eliminamos los mouse
console.log("Carrito después de eliminar un producto:");
printCart();
// Debería mostrar [{ id: 1, ... cantidad: 3 }]
