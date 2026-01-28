"use client";
import { useEffect } from "react";
export default function ChangeTheme() {
  /*Cambia la paleta de colores de la pagina (oscuro - claro)*/

  function toggleTheme() {
    const current = document.documentElement.dataset.theme;
    const next = current === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  return (
    <>
      <button onClick={toggleTheme}>Click para cambiar el tema</button>
    </>
  );
}
function getInitialTheme(): "light" | "dark" {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return prefersDark ? "dark" : "light";
}
function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}

export function ThemeInitializer() {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "dark" || storedTheme === "light") {
      document.documentElement.dataset.theme = storedTheme;
    } else {
      // fallback al sistema
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;

      const theme = prefersDark ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      localStorage.setItem("theme", theme);
    }
  }, []);

  return null;
}
