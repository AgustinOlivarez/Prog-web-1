  // --- SweetAlert para el formulario de contacto ---
const formConsulta = document.querySelector('.enviar-consulta');

formConsulta.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita el envío real

  // Obtener valores
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const autoReferido = document.getElementById('auto-referido').value.trim();
  const asunto = document.getElementById('asunto').value.trim();
  const consulta = document.getElementById('consulta').value.trim();

  // Validación básica (opcional si ya usás required en HTML)
  if (!nombre || !email || !asunto || !consulta) {
    Swal.fire({
      title: 'Campos incompletos',
      text: 'Por favor completá todos los campos obligatorios.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return;
  }

  // Mostrar resumen de lo enviado
  Swal.fire({
    title: '¡Consulta enviada!',
    html: `
      <p>${nombre}, pronto estaremos contestando tu consulta al mail proporcionado.</p>
      <p><strong>Email:</strong> ${email}</p>
      ${autoReferido ? `<p><strong>Auto referido:</strong> ${autoReferido}</p>` : ''}
      <p><strong>Asunto:</strong> ${asunto}</p>
    `,
    icon: 'success',
    confirmButtonText: 'OK'
  });

  // Limpiar formulario
  formConsulta.reset();
});
