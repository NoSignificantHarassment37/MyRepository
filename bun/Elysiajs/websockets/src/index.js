import { Elysia } from "elysia";
import cors from "@elysiajs/cors";

const app = new Elysia()
  .use(cors())
  // WebSocket endpoint
  .ws("/ws", {
    // Se ejecuta cuando un cliente se conecta
    open(ws) {
      console.log("Cliente conectado:", ws.id);
      ws.send("¡Bienvenido al WebSocket!");
    },

    // Se ejecuta cuando llega un mensaje del cliente
    message(ws, message) {
      console.log("Mensaje recibido:", message);

      // Responder al cliente
      ws.send(`Echo: ${message}`);

      // O broadcast a todos los clientes conectados
      // ws.publish('chat', `Usuario ${ws.id}: ${message}`)
    },

    // Se ejecuta cuando un cliente se desconecta
    close(ws) {
      console.log("Cliente desconectado:", ws.id);
    },
  })

  // WebSocket con ejemplo de broadcast (chat room)
  .ws("/chat", {
    open(ws) {
      console.log(`Usuario ${ws.id} entró al chat`);

      // Suscribirse a un canal
      ws.subscribe("chat-room");

      // Notificar a todos
      ws.publish("chat-room", {
        type: "join",
        userId: ws.id,
        message: `Usuario ${ws.id} se unió al chat`,
      });
    },

    message(ws, message) {
      // Broadcast del mensaje a todos en el canal
      ws.publish("chat-room", {
        type: "message",
        userId: ws.id,
        message: message,
        timestamp: new Date().toISOString(),
      });
    },

    close(ws) {
      ws.publish("chat-room", {
        type: "leave",
        userId: ws.id,
        message: `Usuario ${ws.id} salió del chat`,
      });
    },
  })

  .listen(3000);

console.log(
  `🦊 Elysia corriendo en http://${app.server?.hostname}:${app.server?.port}`,
);
console.log(
  `🔌 WebSocket en ws://${app.server?.hostname}:${app.server?.port}/ws`,
);
console.log(`💬 Chat en ws://${app.server?.hostname}:${app.server?.port}/chat`);
