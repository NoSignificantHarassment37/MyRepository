import { Elysia } from "elysia";

const app = new Elysia();

// Solo el path / o vacío
app.get("/", () => "Response from Elysia's static path!");

// Path que encaje con /id/cualquier-cosa
app.get("/id/:id", "Elysia's dinamic path!");

// Cualquier path del tipo /id/literalmente/cualquier/cosa/despues/de/id
app.get("/id/*", "Elysia's wildcard path!");

// Ejemplo de path estatico
app.get("/persona", () => {
  return {
    id: 1,
    nombre: "mateo",
    edad: 18,
  };
});

// Ejemplo de path dinamico
app.get("/persona/:id/:nombre/:edad", ({ params: { id, nombre, edad } }) => {
  return {
    id,
    nombre,
    edad,
  };
});

app.get("/casas/:id?/:nombre?/:edad?", ({ params: { id, nombre, edad } }) => {
  return {
    id,
    nombre,
    edad,
  };
});

// Ejemplo de path con wildcard y extrallendo los demas paths
app.get("/persona/*", ({ params }) => {
  console.log(params["*"]);
  return params["*"];
});

// Agrupando rutas para facilitar inspeccion.

app.group("/v1", (app) => {
  app.group("/user", (app) => {
    app.post("/", "POST /v1/user");
    app.get("/", "GET /v1/user");
    app.patch("/", "PATCH /v1/user");
    app.delete("/", "DELETE /v1/user");
    return app;
  });
  return app;
});

// Usando un prefix para evitar anidaciones infinitas.

const cajas = new Elysia({ prefix: "/cajas" });

cajas.post("/", "Caja creada");
cajas.get("/", {
  id: 1,
});
cajas.patch("/", "Caja editada");

app.use(cajas);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
