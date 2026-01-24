import { requireAuth } from "./authMiddleware.js";

app.get("/perfil", requireAuth, (req, res) => {
  res.json({
    message: "Perfil privado",
    user: req.user,
  });
});
