"use client";
import { useState } from "react";

export default function ComponenteConEstado() {
  const [contador, setContador] = useState(0);
  function incrementar() {
    setContador(contador + 1);
  }
  return <button onClick={incrementar}>Hola mundo {contador}!</button>;
}
