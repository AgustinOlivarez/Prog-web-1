// === VARIABLES GLOBALES ===
class Auto {
  constructor(marca, modelo, kilometros, precio) {
    this.marca = marca;
    this.modelo = modelo;
    this.kilometros = kilometros;
    this.precio = precio;
  }
}

const autos = [
  new Auto("Chevrolet", "Onix", 50000, 5500000),
  new Auto("Renault", "Sandero", 70000, 4800000),
  new Auto("Toyota", "Yaris", 120000, 6200000),
];
let cotizacionDolar = 1100; // Simulación de cotización

// === FUNCIONES ===

// Mostrar catálogo completo en consola
function mostrarCatalogo() {
    console.log("=== Catálogo de Autos ===");
    for (let i = 0; i < autos.length; i++) {
        console.log(`${i + 1}. ${autos[i].marca} ${autos[i].modelo} - $${autos[i].precio}`);
    }
}

// Ordenar autos por marca
function ordenarPorMarca() {
  return autos.sort((a, b) => a.marca.localeCompare(b.marca));
}

// Ordenar autos por precio
function ordenarPorPrecio(ascendente = true) {
  return autos.sort((a, b) =>
    ascendente ? a.precio - b.precio : b.precio - a.precio
  );
}

// Ordenar autos por kilometraje
function ordenarPorKilometros(ascendente = true) {
  return autos.sort((a, b) =>
    ascendente ? a.kilometros - b.kilometros : b.kilometros - a.kilometros
  );
}

// Convertir precios a dólares
function convertirADolares(precioEnPesos) {
  return (precioEnPesos / cotizacionDolar).toFixed(2);
}

// Simular cotización de un auto
function cotizarAuto() {
  let modeloIngresado = prompt(
    "Ingresá el modelo del auto que querés cotizar (Onix, Sandero, Yaris):"
  );
  let autoEncontrado = autos.find(
    (auto) => auto.modelo.toLowerCase() === modeloIngresado.toLowerCase()
  );

  if (autoEncontrado) {
    let precioUSD = convertirADolares(autoEncontrado.precio);
    alert(
      `El ${autoEncontrado.marca} ${autoEncontrado.modelo} cuesta $${autoEncontrado.precio} (${precioUSD} USD aprox).`
    );
  } else {
    alert(
      "No encontramos ese modelo. Por favor, revisá el nombre e intentá de nuevo."
    );
  }
}

// Calcular precio con descuento
function calcularDescuento(precio, porcentaje) {
  return precio - (precio * porcentaje) / 100;
}

//Funciones futuras

//For each para mostrar autos del catálogo

// Funcion para redirigir a contacto con información del auto seleccionado
