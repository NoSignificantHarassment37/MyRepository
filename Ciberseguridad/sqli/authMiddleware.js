// authMiddleware.js
import { getSession } from "./sessionStore.js";

export function requireAuth(req, res, next) {
  const sessionId = req.headers["x-session-id"];

  if (!sessionId) {
    return res.status(401).send("No session");
  }

  const session = getSession(sessionId);

  if (!session) {
    return res.status(401).send("Session inválida");
  }

  req.user = session;
  next();
}
