
// Actividad N° 4
    // esto en un futuro seria un catalogo.json
 let autos = [
  {
    marca: 'Chevrolet',
    modelo: 'Onix',
    km: 45000,
    precio: 3200000,
    imagen: 'assets/onix.avif',
  },
  {
    marca: 'Renault',
    modelo: 'Sandero',
    km: 65000,
    precio: 2800000,
    imagen: 'assets/sandero.jpg',
  },
  {
    marca: 'Toyota',
    modelo: 'Yaris',
    km: 25000,
    precio: 3900000,
    imagen: 'assets/yaris.png',
  },
];

// Función para renderizar autos
function renderAutos(filtrados = autos) {
    const container = document.getElementById('autos-container');
    container.innerHTML = '';

    if (!filtrados || filtrados.length === 0) {
        const noAutosDiv = document.createElement('div');
        noAutosDiv.id = 'no-autos';
        noAutosDiv.className = 'no-autos';
        noAutosDiv.innerHTML = `<p>No hay autos disponibles.</p>`;
        container.appendChild(noAutosDiv);
        return;
    }

    filtrados.forEach(auto => {
        const card = document.createElement('article');
        card.className = 'auto-card';
        card.innerHTML = `
            <img src="${auto.imagen}" alt="Auto ${auto.marca}" />
            <p>${auto.marca} ${auto.modelo} - ${auto.km}km</p>
            <p><strong>$${auto.precio.toLocaleString()}</strong></p>
            <button>Me interesa</button>
        `;
        container.appendChild(card);
    });
}

// Filtrado por marca
function filtrarAutos(e) {
  e.preventDefault();

  const marca = document.getElementById('marca').value;
  const precioMax = parseInt(document.getElementById('precioMax').value);
  const kmMax = parseInt(document.getElementById('kmMax').value);

  const sinFiltros =
    marca === '' && isNaN(precioMax) && isNaN(kmMax);

  if (sinFiltros) {
    renderAutos(autos);
    return;
  }

  const autosFiltrados = autos.filter(auto => {
    const coincideMarca = marca === '' || auto.marca === marca;
    const coincidePrecio = isNaN(precioMax) || auto.precio <= precioMax;
    const coincideKm = isNaN(kmMax) || auto.km <= kmMax;
    return coincideMarca && coincidePrecio && coincideKm;
  });

  renderAutos(autosFiltrados);
}

// Agregar auto
function agregarAuto(e) {
  e.preventDefault();

  const nuevoAuto = {
    marca: document.getElementById('marcaAgregar').value,
    modelo: document.getElementById('modeloAgregar').value,
    km: parseInt(document.getElementById('kmAgregar').value),
    precio: parseInt(document.getElementById('precioAgregar').value),
    imagen: document.getElementById('imagenAgregar').value,
  };

  autos.push(nuevoAuto);
  renderAutos();
  e.target.reset();
}


// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  renderAutos();
});