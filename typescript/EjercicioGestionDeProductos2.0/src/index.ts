import express from "express";
import type { Request, Response } from "express";
import userRoutes from "@routes/userRoutes.js"; // usando alias

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hola desde Express!");
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
