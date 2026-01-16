"use client";
import React, { useState } from "react";

export default function ChatWindow() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Oye, ¿ya viste lo rápido que va Fastify?", sender: "me" },
    {
      id: 2,
      text: "¡Sí! Es una locura el manejo de WebSockets.",
      sender: "them",
    },
  ]);

  return (
    <div className="flex flex-col h-[600px] w-full max-w-md bg-brand-bg rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Header del Chat */}
      <div className="bg-brand-primary p-4 flex items-center gap-3 text-white">
        <div className="w-10 h-10 rounded-full bg-brand-accent border-2 border-white/20" />
        <div>
          <h3 className="font-bold text-sm">Ingeniero Senior</h3>
          <span className="text-[10px] opacity-80 uppercase font-bold tracking-widest">
            En línea
          </span>
        </div>
      </div>

      {/* Lista de Mensajes */}
      <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-white/50">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[80%] p-3 rounded-2xl text-sm font-medium ${
              m.sender === "me"
                ? "self-end bg-brand-primary text-white rounded-tr-none shadow-lg shadow-brand-primary/20"
                : "self-start bg-brand-secondary text-brand-text rounded-tl-none"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Input de Mensaje */}
      <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-brand-bg px-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
        />
        <button className="bg-brand-primary text-white p-2 rounded-xl hover:scale-105 transition-transform">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
