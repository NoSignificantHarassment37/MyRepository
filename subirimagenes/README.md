# CRUD de Imágenes

Aplicación minimalista para gestionar imágenes con operaciones CRUD. Las imágenes se almacenan en Supabase Storage y los metadatos en un archivo JSON.

## Características

- ✅ Operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar)
- ✅ Soporte para JPG, JPEG, PNG y WEBP
- ✅ Almacenamiento en Supabase File Storage
- ✅ Persistencia de metadatos en archivo JSON
- ✅ Interfaz minimalista y responsive

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar Supabase:
   - Copia `env.example` a `.env`
   - Agrega tu `SUPABASE_URL` y `SUPABASE_KEY`
   - Crea un bucket llamado `images` en Supabase Storage

3. Iniciar el servidor:
```bash
npm start
```

4. Abrir en el navegador:
```
http://localhost:3000
```

## Configuración de Supabase

1. Ve a tu proyecto en Supabase
2. Navega a Storage
3. Crea un nuevo bucket llamado `images`
4. Configura las políticas de acceso según tus necesidades
5. Copia la URL y la clave anónima a tu archivo `.env`

## Estructura del Proyecto

```
.
├── server.js          # Servidor Express con API CRUD
├── public/
│   ├── index.html     # Interfaz de usuario
│   └── app.js         # Lógica del frontend
├── data/
│   └── images.json    # Persistencia de metadatos (se crea automáticamente)
├── .env               # Variables de entorno (crear desde env.example)
├── env.example         # Ejemplo de configuración
└── package.json
```

## API Endpoints

- `GET /api/images` - Obtener todas las imágenes
- `GET /api/images/:id` - Obtener una imagen por ID
- `POST /api/images` - Crear nueva imagen (multipart/form-data con campo 'image')
- `PUT /api/images/:id` - Actualizar metadatos de una imagen
- `DELETE /api/images/:id` - Eliminar una imagen

