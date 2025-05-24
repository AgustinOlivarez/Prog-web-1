class Auto {
    constructor(marca, modelo, anio, kilometros, precio, id) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = parseInt(anio);
        this.kilometros = parseInt(kilometros);
        this.precio = parseFloat(precio);
        this.id = parseInt(id)
    }

    actualizarPrecio(nuevoPrecio) {
        this.precio = parseFloat(nuevoPrecio);
    }

    getInformacion() {
        return `${this.marca} ${this.modelo} (${this.anio}) - ${this.kilometros} km - $${this.precio}`;
    }

}

export default Auto;
