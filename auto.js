export class Auto {
    constructor(marca, modelo, anio, kilometros, precio, imagen, id) {
        this.marca = marca;
        this.modelo = modelo;
        this.kilometros = parseInt(kilometros);
        this.anio = parseInt(anio);
        this.precio = parseFloat(precio);
        this.imagen = imagen;
        this.id = parseInt(id);
    }

    actualizarPrecio(nuevoPrecio) {
        this.precio = parseFloat(nuevoPrecio);
    }

    getInformacion() {
        return `${this.marca} ${this.modelo} (${this.anio}) - ${this.kilometros} km - $${this.precio}`;
    }

    crearAutoCard() {
        // Crea el HTML de la tarjeta
        const cardHTML = `
            <article class="auto-card">
                <img src="${this.imagen}" alt="Auto ${this.marca}" />
                <p>${this.marca} ${this.modelo} (Año ${this.anio}) - ${this.kilometros} km</p>
                <p><strong>$${this.precio.toLocaleString()}</strong></p>
                <button>Me interesa</button>
            </article>
        `;

        // Busca el contenedor autos-container y agrega la tarjeta
        const container = document.querySelector('.autos-container');
        if (container) {
            container.insertAdjacentHTML('beforeend', cardHTML);
        }
    }
}



