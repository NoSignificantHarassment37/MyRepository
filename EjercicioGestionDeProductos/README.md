CONTEXTO:
Le pedi a gemini que me colocara un ejercicio para practicar TS. El ejercicio trata de simular una tienda con productos, pedidos y un sistema con diversos metodos.

Pero, me di cuenta que diseñar con TS + Zod como si fuera C# es un error, aquí abajo las razones:

1. Duplicación de código. Al final, la clase y su esquema de validación tienen las mismas props, sólo que el esquema valida las props de la clase.
2. Si el esquema sólo está para validar la clase, se acopla muy fuertemente, y si cambiamos algo en la clase, lo tenemos que cambiar en el esquema y viceversa.
3. Desincronización entre importar y exportar archivos. Es obligatorio aprender ESModules para el ecosistema de JS, es SUPER fácil que se desincronice la ruta del archivo y la ruta de importación, y cómo aquí se separan esquemas y clases, pues ese problema ahora es todavía más común, retrasando torpemente el desarrollo.

Por eso decidí abandonar el ejercicio aquí y volverlo a hacer con modelos con un mejor diseño.

CONCLUSIÓN: No pienses en TS + Zod cómo un C# pero con otras palabras reservadas.