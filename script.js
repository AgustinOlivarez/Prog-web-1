import { Auto } from './auto.js';
import { Catalogo } from './catalogo.js';

// Cargar autos desde localStorage o desde un archivo JSON

let autos = [];

async function cargarAutos() {
  const autosGuardados = JSON.parse(localStorage.getItem('autos'));

  if (autosGuardados) {
    autos = autosGuardados;
  } else {
    try {
      const response = await fetch('api/autos.json');
      if (!response.ok) throw new Error('No se pudo cargar autos.json');
      autos = await response.json();
      localStorage.setItem('autos', JSON.stringify(autos)); // Guardarlos para persistencia
    } catch (err) {
      console.error('Error cargando autos:', err);
    }
  }
}
const catalogo = new Catalogo();

function poblarOpcionesDeMarca(autos) {
  const selectMarca = document.getElementById('marca');

  // Obtener marcas únicas (Uso de map)
  const marcasUnicas = [...new Set(autos.map(auto => auto.marca))].sort();

  // Vaciar y agregar "Todos"
  selectMarca.innerHTML = '<option value="">Todos</option>';

  // Agregar marcas al select
  marcasUnicas.forEach(marca => {
    const option = document.createElement('option');
    option.value = marca;
    option.textContent = marca;
    selectMarca.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', async() => {
  await cargarAutos();

  autos.forEach(auto =>
    catalogo.agregarAuto(
      auto.marca,
      auto.modelo,
      auto.anio,
      auto.km,
      auto.precio,
      auto.imagen,
      auto.id
    )
  );
  poblarOpcionesDeMarca(autos);

  // Recuperar filtros guardados
  const filtrosGuardados = JSON.parse(localStorage.getItem('filtros'));
  if (filtrosGuardados) {
    document.getElementById('marca').value = filtrosGuardados.marca || '';
    document.getElementById('precioMax').value = filtrosGuardados.precioMax || document.getElementById('precioMax').min;
    document.getElementById('kmRange').value = filtrosGuardados.kmMax || document.getElementById('kmRange').min;

    actualizarValoresVisibles(filtrosGuardados.precioMax, filtrosGuardados.kmMax);

    catalogo.filtrarAutos(
      filtrosGuardados.marca,
      parseFloat(filtrosGuardados.precioMax),
      parseFloat(filtrosGuardados.kmMax)
    );
  } else {
    catalogo.renderAutos();
    actualizarValoresVisibles(
      document.getElementById('precioMax').value,
      document.getElementById('kmRange').value
    );
  }
});

// Filtro
function filtrarAutos(event) {
  event.preventDefault();

  const marca = document.getElementById('marca').value;
  const precioMax = parseFloat(document.getElementById('precioMax').value);
  const kmMax = parseFloat(document.getElementById('kmRange').value);

  localStorage.setItem(
    'filtros',
    JSON.stringify({ marca, precioMax, kmMax })
  );

  actualizarValoresVisibles(precioMax, kmMax);

  catalogo.filtrarAutos(marca, precioMax, kmMax);
}

// Agregar auto
function agregarAuto(event) {
  event.preventDefault();

  const marca = document.getElementById('marcaAgregar').value;
  const modelo = document.getElementById('modeloAgregar').value;
  const anio = parseInt(document.getElementById('anioAgregar').value);
  const kilometros = parseInt(document.getElementById('kmAgregar').value);
  const precio = parseFloat(document.getElementById('precioAgregar').value);
  const imagen = document.getElementById('imagenAgregar').value;

  const nuevoAuto = {
    marca,
    modelo,
    anio,
    km: kilometros,
    precio,
    imagen,
    id: Date.now(), // ID único usando timestamp
  };

  autos.push(nuevoAuto);
  localStorage.setItem('autos', JSON.stringify(autos));

  catalogo.agregarAuto(
    nuevoAuto.marca,
    nuevoAuto.modelo,
    nuevoAuto.anio,
    nuevoAuto.km,
    nuevoAuto.precio,
    nuevoAuto.imagen,
    nuevoAuto.id
  );

  catalogo.renderAutos();
}

// Actualizar valores visibles
function actualizarValoresVisibles(precioMax, kmMax) {
  document.getElementById('rangeCurrentValue').textContent = formatearPrecio(precioMax);
  document.getElementById('kmRangeCurrentValue').textContent = formatearKilometros(kmMax);
}

function formatearPrecio(valor) {
  return '$' + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatearKilometros(valor) {
  return valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' km';
}

// Listeners
document.getElementById('form-filtros').addEventListener('submit', filtrarAutos);
document.getElementById('form-agregar-auto').addEventListener('submit', agregarAuto);

document.getElementById('precioMax').addEventListener('input', (e) => {
  actualizarValoresVisibles(e.target.value, document.getElementById('kmRange').value);
});

document.getElementById('kmRange').addEventListener('input', (e) => {
  actualizarValoresVisibles(document.getElementById('precioMax').value, e.target.value);
});

document.getElementById('resetStorage').addEventListener('click', (e) => {
  //Limpio el localStorage
  localStorage.removeItem('autos');
  localStorage.removeItem('filtros');

  // Recargá la página para que se vuelva a cargar desde autos.json
  location.reload();
});