import { Auto } from './auto.js';
export class Catalogo {
  constructor() {
    this.autos = [];
  }

  agregarAuto(marca, modelo, anio, kilometros, precio, imagen) {
    const id = this.autos.length + 1;
    const nuevoAuto = new Auto(marca, modelo, anio, kilometros, precio, imagen, id);
    this.autos.push(nuevoAuto);

  }

  obtenerAutos() {
    return this.autos;
  }

  renderAutos() {
    const container = document.getElementById('autos-container');
    container.innerHTML = '';

    if (this.autos.length === 0) {
      const noAutosDiv = document.createElement('div');
      noAutosDiv.id = 'no-autos';
      noAutosDiv.className = 'no-autos';
      noAutosDiv.innerHTML = `<p>No hay autos disponibles.</p>`;
      container.appendChild(noAutosDiv);
      return;
    }

    this.autos.forEach(auto => { auto.crearAutoCard(); });
  }
  
  filtrarAutos(marca, precioMax, kmMax) {
    const coincidencias = this.autos.filter(auto => {
      const coincideMarca = marca === '' || auto.marca === marca;
      const coincidePrecio = isNaN(precioMax) || auto.precio <= precioMax;
      const coincideKm = isNaN(kmMax) || auto.kilometros <= kmMax;
      return coincideMarca && coincidePrecio && coincideKm;
    });
    const catalogoFiltro = new Catalogo();
    coincidencias.forEach(auto => {
      catalogoFiltro.autos.push(auto);
    });
    catalogoFiltro.renderAutos();
    return coincidencias;
  }

}






