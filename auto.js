class Auto {
    constructor(marca, modelo, anio, kilometros, precio, id) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = parseInt(anio);
        this.kilometros = parseInt(kilometros);
        this.precio = parseFloat(precio);
        this.id = parseInt(id)
    }

}

export default Auto;
