import express from "express";
import pkg from "pg";
import { createSession } from "./sessionStore.js";

const { Client } = pkg;
const app = express();
app.use(express.json());

const client = new Client({
  user: "postgres",
  password: "592745",
  host: "127.0.0.1",
  port: 5432,
  database: "postgres",
});

await client.connect();

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // ❌ vulnerable + auth fake mejorado
  const sql = `
    SELECT id, username
    FROM tests.usuarios
    WHERE username = '${username}'
    AND password = '${password}'
  `;

  try {
    const result = await client.query(sql);

    if (result.rows.length === 0) {
      return res.status(401).send("Credenciales incorrectas");
    }

    const user = result.rows[0];
    const sessionId = createSession(user);

    // ⚠️ AQUÍ ESTÁ EL PECADO
    res.json({
      message: "Login exitoso",
      sessionId: sessionId,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno");
  }
});

app.listen(3000, () => {
  console.log("Servidor escuchando en puerto 3000");
});