// sessionStore.js
import crypto from "crypto";

export const sessions = new Map();

export function createSession(user) {
  const sessionId = crypto.randomUUID();

  sessions.set(sessionId, {
    userId: user.id,
    username: user.username,
    createdAt: Date.now(),
  });

  return sessionId;
}

export function getSession(sessionId) {
  return sessions.get(sessionId);
}
