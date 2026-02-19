import { Elysia } from "elysia";
import { Context } from "elysia";

function rootController(context: Context): string {
  console.log(context.request);
  console.log(context.params);
  return `Contexto de la request: ${String(context)}`;
}

const app = new Elysia();

app.get("/hola!", (context) => {
  console.log(context);
  return `Hello World!`;
});

app.get("/", rootController);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
