import { Auto } from './auto.js';
import { Catalogo } from './catalogo.js';

// Autos por defecto (solo se usan si no hay en localStorage)
const autosDefault = [
  {
    marca: 'Chevrolet',
    modelo: 'Onix',
    anio: 2020,
    km: 45000,
    precio: 3200000,
    imagen: 'assets/onix.avif',
  },
  {
    marca: 'Renault',
    modelo: 'Sandero',
    anio: 2019,
    km: 65000,
    precio: 2800000,
    imagen: 'assets/sandero.jpg',
  },
  {
    marca: 'Toyota',
    modelo: 'Yaris',
    anio: 2021,
    km: 25000,
    precio: 3900000,
    imagen: 'assets/yaris.png',
  },
];

// Cargar autos desde localStorage o usar los de por defecto
let autos = JSON.parse(localStorage.getItem('autos')) || autosDefault;

const catalogo = new Catalogo();

document.addEventListener('DOMContentLoaded', () => {
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
