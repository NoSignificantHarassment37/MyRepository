const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'images.json');

// Configurar Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Log de configuración al iniciar
console.log('=== Configuración Supabase ===');
console.log('URL:', supabaseUrl || 'NO CONFIGURADA');
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'NO CONFIGURADA');
console.log('Cliente Supabase:', supabase ? 'INICIALIZADO' : 'NO INICIALIZADO');
console.log('================================');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configurar multer para manejar archivos
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Solo se permiten imágenes JPG, JPEG, PNG o WEBP'));
    }
  }
});

// Función auxiliar para leer/escribir JSON
async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe, crear estructura inicial
    if (error.code === 'ENOENT') {
      await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
      const initialData = { images: [] };
      await fs.writeFile(DATA_FILE, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    throw error;
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// Subir imagen a Supabase
async function uploadToSupabase(file, filename) {
  if (!supabase) {
    throw new Error('Supabase no está configurado. Verifica SUPABASE_URL y SUPABASE_KEY en .env');
  }

  const fileExt = path.extname(filename);
  const newFilename = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExt}`;
  const filePath = `images/${newFilename}`;

  console.log(`Intentando subir imagen: ${filePath}`);

  const { data: uploadData, error } = await supabase.storage
    .from('images')
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
      upsert: false
    });

  if (error) {
    console.error('Error al subir a Supabase:', error);
    throw new Error(`Error al subir imagen: ${error.message}. Verifica que el bucket "images" exista y tenga las políticas correctas.`);
  }

  console.log('Imagen subida exitosamente:', uploadData);

  // Obtener URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('images')
    .getPublicUrl(filePath);

  console.log('URL pública generada:', publicUrl);
  return publicUrl;
}

// GET /api/images - Obtener todas las imágenes
app.get('/api/images', async (req, res) => {
  try {
    const data = await readData();
    res.json(data.images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/images/:id - Obtener una imagen por ID
app.get('/api/images/:id', async (req, res) => {
  try {
    const data = await readData();
    const image = data.images.find(img => img.id === req.params.id);

    if (!image) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/images - Crear nueva imagen
app.post('/api/images', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
    }

    // Subir a Supabase
    const imageUrl = await uploadToSupabase(req.file, req.file.originalname);

    // Guardar en JSON
    const data = await readData();
    const newImage = {
      id: Date.now().toString(),
      filename: req.file.originalname,
      url: imageUrl,
      mimetype: req.file.mimetype,
      size: req.file.size,
      createdAt: new Date().toISOString()
    };

    data.images.push(newImage);
    await writeData(data);

    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error en POST /api/images:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/images/:id - Actualizar imagen
app.put('/api/images/:id', async (req, res) => {
  try {
    const data = await readData();
    const imageIndex = data.images.findIndex(img => img.id === req.params.id);

    if (imageIndex === -1) {
      return res.status(404).json({ error: 'Imagen no encontrada' });
    }

    // Actualizar solo campos permitidos
    const updatedImage = {
      ...data.images[imageIndex],
      ...req.body,
      id: req.params.id, // No permitir cambiar el ID
      updatedAt: new Date().toISOString()
    };

    data.images[imageIndex] = updatedImage;
    await writeData(data);

    res.json(updatedImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/images/:id - Eliminar imagen
app.delete('/api/images/:id',



  async (req, res) => {

    try {
      const data = await readData();
      const imageIndex = data.images.findIndex(img => img.id === req.params.id);

      if (imageIndex === -1) {
        return res.status(404).json({ error: 'Imagen no encontrada' });
      }

      const image = data.images[imageIndex];

      // Eliminar de Supabase si está configurado
      if (supabase && image.url) {
        try {
          const filePath = image.url.split('/').slice(-2).join('/');
          await supabase.storage.from('images').remove([filePath]);
        } catch (error) {
          console.error('Error al eliminar de Supabase:', error);
          // Continuar con la eliminación del JSON aunque falle Supabase
        }
      }

      data.images.splice(imageIndex, 1);
      await writeData(data);

      res.json({ message: 'Imagen eliminada correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
const x = 1

// Ruta de diagnóstico para verificar Supabase
app.get('/api/test-supabase', async (req, res) => {
  try {
    if (!supabase) {
      return res.status(500).json({
        error: 'Supabase no está configurado',
        config: {
          url: supabaseUrl || 'NO CONFIGURADA',
          key: supabaseKey ? 'CONFIGURADA' : 'NO CONFIGURADA'
        }
      });
    }

    // Intentar listar buckets
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

    if (bucketsError) {
      return res.status(500).json({
        error: 'Error al conectar con Supabase Storage',
        message: bucketsError.message,
        details: bucketsError
      });
    }

    // Verificar si existe el bucket "images"
    const imagesBucket = buckets.find(b => b.name === 'images');

    res.json({
      success: true,
      message: 'Conexión con Supabase exitosa',
      buckets: buckets.map(b => b.name),
      imagesBucketExists: !!imagesBucket,
      imagesBucket: imagesBucket || null
    });
  } catch (error) {
    res.status(500).json({
      error: 'Error al verificar Supabase',
      message: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Prueba la conexión con Supabase en: http://localhost:${PORT}/api/test-supabase`);
});

