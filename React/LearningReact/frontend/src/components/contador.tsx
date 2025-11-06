import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0); // estado inicial = 0

  return (
    <div>
      <p>Has hecho clic {contador} veces</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  );
}

export { Contador }