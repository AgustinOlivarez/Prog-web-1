// import Auto from './auto.js';

// class Catalogo {
//     constructor() {
//         this.autos = [
//             new Auto('Toyota', 'Corolla', 2020, 30000, 200000, 1),
//             new Auto('Toyota', 'Camry', 2021, 20000, 250000, 2),
//             new Auto('Ford', 'Focus', 2018, 50000, 150000, 3),
//             new Auto('Honda', 'Civic', 2019, 40000, 180000, 4),
//         ];
//     }

//     agregarAuto(marca, modelo, anio, kilometros, precio) {
//         const id = this.autos.length + 1;
//         const nuevoAuto = new Auto(marca, modelo, anio, kilometros, precio, id);
//         this.autos.push(nuevoAuto);
//     }

//     listarAutos() {
//         let resultado = '';
//         for (let i = 0; i < this.autos.length; i++) {
//             const auto = this.autos[i];
//             resultado += `${auto.marca} ${auto.modelo} (${auto.anio}) - ${auto.kilometros} km - $${auto.precio} - ${auto.id}\n`;
//         }
//         return resultado.trim();
//     }

//     buscarAutoPorModelo(modelo) {
//         for (let i = 0; i < this.autos.length; i++) {
//             if (this.autos[i].modelo.toLowerCase() === modelo.toLowerCase()) {
//                 return this.autos[i];
//             }
//         }
//         return null;
//     }

//     filtrarAutosPorMarca(marca) {
//         let resultado = '';
//         for (let i = 0; i < this.autos.length; i++) {
//             if (this.autos[i].marca.toLowerCase() === marca.toLowerCase()) {
//                 let auto = this.autos[i];
//                 resultado += `${auto.marca} ${auto.modelo} (${auto.anio}) - ${auto.kilometros} km - $${auto.precio}\n`;
//             }
//         }
//         if (resultado === '') {
//             return 'No se encontraron autos de esa marca.';
//         }
//         return resultado;
//     }

//     ordenarAutosPorPrecio(ascendente = true) {
//         for (let i = 0; i < this.autos.length - 1; i++) {
//             for (let j = 0; j < this.autos.length - i - 1; j++) {
//                 if ((ascendente && this.autos[j].precio > this.autos[j + 1].precio) ||
//                     (!ascendente && this.autos[j].precio < this.autos[j + 1].precio)) {
//                     const temp = this.autos[j];
//                     this.autos[j] = this.autos[j + 1];
//                     this.autos[j + 1] = temp;
//                 }
//             }
//         }
//         let resultado = '';
//         for (let i = 0; i < this.autos.length; i++) {
//             const auto = this.autos[i];
//             resultado += `${auto.marca} ${auto.modelo} (${auto.anio}) - ${auto.kilometros} km - $${auto.precio} - ${auto.id}\n`;
//         }
//         return resultado.trim();
//     }

//     tieneAutos() {
//         if (this.autos.length === 0) {
//             return false;
//         } else {
//             return true;
//         }
//     }

// }

// export default Catalogo;

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