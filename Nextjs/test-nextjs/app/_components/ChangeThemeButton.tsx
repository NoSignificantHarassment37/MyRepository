"use client";
import { useEffect } from "react";
export type ChangeThemeParams = {
  children: React.ReactNode;
};
export default function ChangeThemeButton({ children }: ChangeThemeParams) {
  /*Cambia la paleta de colores de la pagina (oscuro - claro)*/

  function handlerClickEvent() {
    const current = document.documentElement.dataset.theme;
    const next = current === "dark" ? "light" : "dark";

    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  return <button onClick={handlerClickEvent}>{children}</button>;
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
