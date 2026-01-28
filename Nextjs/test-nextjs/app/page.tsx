import React from "react";
import ChangeTheme from "./_components/ChangeTheme";
import DocsArticle from "./_components/Article";
import DocsSection from "./_components/Section";
export default function Index(): React.ReactNode {
  return (
    <>
    <ChangeTheme></ChangeTheme>
      <div className="container">
        <h1>SecureVault</h1>
        <p className="tagline">Tu bóveda de contraseñas segura y accesible.</p>
        <a href="#" className="btn">
          <span className="material-icons">vpn_key</span>Crear Vault
        </a>
        <a href="#" className="btn">
          <span className="material-icons">folder_open</span>Cargar Vault
        </a>
      </div>
      <DocsSection title="Sobre el proyecto">
        <DocsArticle title={"Introducción"}>
          <p>
            Este es mi password manager personal, de momento,
            <strong>NO</strong> es una aplicación enterprise, es sólo un
            servicio abierto al público.
          </p>
        </DocsArticle>
        <DocsArticle title="El por qué del proyecto">
          <ul>
            <li>Satifacer mis propias necesidades</li>
            <li>Aprendizaje</li>
            <li>Portafolio</li>
          </ul>
        </DocsArticle>
        <DocsArticle title="Necesidades que satiface">
          <ul>
            <li>Poder de decisión sobre la información</li>
            <li>Ser lo más multiplataforma posible</li>
            <li>Contar con un buen cifrado de información</li>
          </ul>
        </DocsArticle>
      </DocsSection>
      <DocsSection title="Documentación técnica">
        <DocsArticle title="Frontend">
          <p>
            Este es mi password manager personal, de momento,
            <strong>NO</strong> es una aplicación enterprise, es sólo un
            servicio abierto al público.
          </p>
        </DocsArticle>
      </DocsSection>
      <DocsSection title="Manual de usuario">
        <DocsArticle title="Recomendaciones">
          <p>
            Si decides correr el riesgo de probarlo, entonces te dejo
            recomendaciones:
          </p>
          <ul>
            <li>
              <p>
                A pesar de que la información sale cifrada, te recomiendo que
                sigas pensando como si <strong>NO.</strong> estuviese cifrada.
                El cifrado protege la información, pero es la última capa de
                defensa.
              </p>
            </li>
            <li>
              Deja el menor tiempo posible el vault abierto, cualquier persona o
              programa prodría robarte tus contraseñas y la clave maestra.
            </li>
            <li>
              <strong>Usa los siguientes navegadores:</strong>
              <ul>
                <li>Chrome 111 o versiones superiores.</li>
                <li>Microsoft Edge 111 o versiones superiores.</li>
                <li>Firefox 111 o versiones superiores.</li>
                <li>Safari 16.4 o versiones superiores.</li>
              </ul>
            </li>
            <li>
              No lo uses en dispositivos que presumes que puedan tener malware
              de cualquier tipo.
            </li>
          </ul>
        </DocsArticle>
      </DocsSection>
    </>
  );
}
