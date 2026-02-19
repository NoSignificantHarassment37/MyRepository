import { Elysia } from "elysia";
import { prisma } from "./prisma.js";
import cors from "@elysiajs/cors";
/*
type UserModel = {
    id: string;
    email: string;
    password: string;
    name: string | null;
    role: $Enums.Role;
    createdAt: Date;
    updatedAt: Date;
}
*/

const app = new Elysia();

app.use(cors());

const rutasUsuarios = new Elysia({ prefix: "/usuarios" });
const rutasCajas = new Elysia({ prefix: "/cajas" });

rutasCajas.get("/", "GET /cajas");
rutasCajas.post("/", "POST /cajas");
rutasCajas.patch("/", "PATCH /cajas");
rutasCajas.delete("/", "DELETE /cajas");

rutasUsuarios.get("/", async ({ query, set }) => {
  try {
    const mybody = query as any;
    console.log(mybody);
    const usuario = await prisma.user.findUnique({
      where: {
        email: mybody.email,
      },
    });
    set.status = 200;
    return usuario;
  } catch (e) {
    set.status = 500;
    console.log(e);
    return;
  }
});
rutasUsuarios.post("/", async ({ body, set }) => {
  try {
    const mybody: any = body;
    await prisma.user.create({
      data: {
        name: mybody.name,
        email: mybody.email,
        role: mybody.role,
        password: mybody.password,
      },
    });
    set.status = 200;
    return {
      created: true,
    };
  } catch (e) {
    set.status = 500;
    return {
      created: false,
    };
  }
});
rutasUsuarios.patch("/", "PATCH /usuarios");
rutasUsuarios.delete("/", "DELETE /usuarios");

app.use(rutasUsuarios);
app.use(rutasCajas);

app.ws("/ws", {
  open(ws) {
    console.log("cliente conectado:", ws.id);
    ws.send("Bienvenido al WebSocket!");
  },

  message(ws, message) {
    console.log("Mensaje recibido:", message);

    ws.send(`Echo: ${message}`);
  },

  close(ws) {
    console.log(`Cliente desconectado: ${ws.id}`);
  },
});

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
