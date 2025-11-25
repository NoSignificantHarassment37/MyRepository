const API_URL = '/api/images';

// Cargar imágenes al iniciar
document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    setupEventListeners();
});

function setupEventListeners() {
    // Formulario de subida
    document.getElementById('uploadForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await uploadImage();
    });

    // Formulario de edición
    document.getElementById('editForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        await updateImage();
    });

    // Cerrar modal al hacer click fuera
    document.getElementById('editModal').addEventListener('click', (e) => {
        if (e.target.id === 'editModal') {
            closeModal();
        }
    });
}

// Cargar todas las imágenes
async function loadImages() {
    try {
        const response = await fetch(API_URL);
        const images = await response.json();
        displayImages(images);
    } catch (error) {
        console.error('Error al cargar imágenes:', error);
        alert('Error al cargar las imágenes');
    }
}

// Mostrar imágenes en la grilla
function displayImages(images) {
    const grid = document.getElementById('imagesGrid');
    
    if (images.length === 0) {
        grid.innerHTML = '<p>No hay imágenes. Sube tu primera imagen.</p>';
        return;
    }

    grid.innerHTML = images.map(image => `
        <div class="image-card">
            <img src="${image.url}" alt="${image.filename}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect fill=\'%23ddd\' width=\'200\' height=\'200\'/%3E%3Ctext fill=\'%23999\' font-family=\'sans-serif\' font-size=\'14\' dy=\'10.5\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\'%3EImagen no disponible%3C/text%3E%3C/svg%3E'">
            <div class="image-card-body">
                <h3>${escapeHtml(image.filename)}</h3>
                <p>Tamaño: ${formatBytes(image.size)}</p>
                <p>Tipo: ${image.mimetype}</p>
                <p>Fecha: ${new Date(image.createdAt).toLocaleDateString()}</p>
                <div class="image-actions">
                    <button class="edit" onclick="openEditModal('${image.id}', '${escapeHtml(image.filename)}')">Editar</button>
                    <button class="delete" onclick="deleteImage('${image.id}')">Eliminar</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Subir nueva imagen
async function uploadImage() {
    const fileInput = document.getElementById('imageFile');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor selecciona una imagen');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al subir la imagen');
        }

        fileInput.value = '';
        alert('Imagen subida correctamente');
        loadImages();
    } catch (error) {
        console.error('Error al subir imagen:', error);
        alert('Error al subir la imagen: ' + error.message);
    }
}

// Abrir modal de edición
function openEditModal(id, filename) {
    document.getElementById('editId').value = id;
    document.getElementById('editFilename').value = filename;
    document.getElementById('editModal').style.display = 'block';
}

// Cerrar modal
function closeModal() {
    document.getElementById('editModal').style.display = 'none';
}

// Actualizar imagen
async function updateImage() {
    const id = document.getElementById('editId').value;
    const filename = document.getElementById('editFilename').value;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ filename })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al actualizar la imagen');
        }

        closeModal();
        alert('Imagen actualizada correctamente');
        loadImages();
    } catch (error) {
        console.error('Error al actualizar imagen:', error);
        alert('Error al actualizar la imagen: ' + error.message);
    }
}

// Eliminar imagen
async function deleteImage(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al eliminar la imagen');
        }

        alert('Imagen eliminada correctamente');
        loadImages();
    } catch (error) {
        console.error('Error al eliminar imagen:', error);
        alert('Error al eliminar la imagen: ' + error.message);
    }
}

// Utilidades
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

