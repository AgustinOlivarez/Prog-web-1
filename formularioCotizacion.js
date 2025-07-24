

// --- SweetAlert para el formulario de cotización ---
const formCotizacion = document.querySelector('.cotizar-auto');

formCotizacion.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtener valores
  const nombre = formCotizacion.querySelector('#nombre').value.trim();
  const email = formCotizacion.querySelector('#email').value.trim();
  const marca = formCotizacion.querySelector('#marca').value.trim();
  const modelo = formCotizacion.querySelector('#modelo').value.trim();
  const detalles = formCotizacion.querySelector('#consulta').value.trim();
  const imagenes = formCotizacion.querySelector('#imagenes').files;

  // Validación básica
  if (!nombre || !email || !marca || !modelo || !detalles) {
    Swal.fire({
      title: 'Faltan campos',
      text: 'Completá todos los campos requeridos.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Mostrar resumen sin imágenes
  Swal.fire({
    title: '¡Solicitud de cotización enviada!',
    html: `
      <p><strong>${nombre}</strong>, la cotización sobre el <strong>${marca} ${modelo}</strong> será enviada en estos días al mail proporcionado.</p>
      <p><strong>Email:</strong> ${email}</p>
    `,
    icon: 'success',
    confirmButtonText: 'OK'
  });

  formCotizacion.reset();
});