"use strict";
import { Producto } from "./Models/Producto.js";
import { CartItem } from "./Models/CartItem.js";
const productos = [
  new Producto(1, `Laptop`, 12000),
  new Producto(2, `Mouse`, 15000),
  new Producto(3, `Teclado`, 11500),
];

let cart = [
  new CartItem(new Producto(1, "Laptop", 15000), 2),
  new CartItem(new Producto(2, "Mouse", 2000), 2),
  new CartItem(new Producto(3, "Teclado", 1000), 2),
];

function showCart() {
  for (let item of cart) {
    console.log(
      `${item.producto.id} ${item.producto.nombre} ${item.producto.precio} ${item.cantidad}`
    );
  }
}
showCart();
const newArray = cart.splice(1,1);
console.log(newArray);
showCart();