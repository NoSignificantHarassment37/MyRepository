const form = document.getElementById('uploadForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const paqueteId = Number(document.getElementById('paquete_id').value);
    const fileInput = document.getElementById('image');
    const file = fileInput.files[0];

    if (!file) {
        alert('Selecciona una imagen primero');
        return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('paquete_id', Number(paqueteId));

    console.log(formData.get('image'))
    console.log(typeof formData.get('paquete_id'));
    try {
        const res = await fetch('http://localhost:3000/images', {
            method: 'POST',
            body: formData
        });

        const data = await res.json();
        console.log('Respuesta del servidor:', data);
        alert('¡Imagen subida!');
    } catch (err) {
        console.error(err);
        alert('Error al subir la imagen');
    }
});
