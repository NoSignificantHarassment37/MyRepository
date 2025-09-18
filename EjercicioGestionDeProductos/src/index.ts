import {estado} from "./enums/estado";
import {Item} from "./models/item";

let item:Item = new Item({producto:{id:1, nombre:"Jugo", precio:12000}, cantidad:1});
/*
// Prueba de las clases y funciones

const sistema = new SistemaPedidos();

// 1. Agregar productos
sistema.agregarProducto('Laptop', 1200);
sistema.agregarProducto('Mouse', 25);
sistema.agregarProducto('Teclado', 75);

// 2. Crear un pedido
const productosPedido = [{ id: 1, cantidad: 1 }, { id: 3, cantidad: 2 }];
sistema.crearPedido(productosPedido);

// 3. Obtener el total del pedido (Laptop: 1200 + Teclado: 75 * 2 = 1350)
const total = sistema.obtenerTotalPedido(1);
console.log(`Total del pedido 1: $${total}`);

// 4. Actualizar el estado del pedido
sistema.actualizarEstadoPedido(1, 'enviado');
console.log(sistema.pedidos[0]);
*/