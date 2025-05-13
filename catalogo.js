import Auto from './auto.js';

class Catalogo {
    constructor() {
        this.autos = [
            new Auto('Toyota', 'Corolla', 2020, 30000, 200000, 1),
            new Auto('Toyota', 'Camry', 2021, 20000, 250000, 2),
            new Auto('Ford', 'Focus', 2018, 50000, 150000, 3),
            new Auto('Honda', 'Civic', 2019, 40000, 180000, 4),
        ];
    }

    agregarAuto(auto) {
        this.autos.push(auto);
    }

    listarAutos() {
        let resultado = '';
        for (let i = 0; i < this.autos.length; i++) {
            const auto = this.autos[i];
            resultado += `${auto.marca} ${auto.modelo} (${auto.anio}) - ${auto.kilometros} km - $${auto.precio} - ${auto.id}\n`;
        }
        return resultado.trim();
    }

    buscarAutoPorModelo(modelo) {
        for (let i = 0; i < this.autos.length; i++) {
            if (this.autos[i].modelo.toLowerCase() === modelo.toLowerCase()) {
                return this.autos[i];
            }
        }
        return null;
    }

    filtrarAutosPorMarca(marca) {
        let resultado = '';
        for (let i = 0; i < this.autos.length; i++) {
            if (this.autos[i].marca.toLowerCase() === marca.toLowerCase()) {
                let auto = this.autos[i];
                resultado += `${auto.marca} ${auto.modelo} (${auto.anio}) - ${auto.kilometros} km - $${auto.precio}\n`;
            }
        }
        return resultado;
    }

    ordenarAutosPorPrecio(ascendente = true) {
        for (let i = 0; i < this.autos.length - 1; i++) {
            for (let j = 0; j < this.autos.length - i - 1; j++) {
                if ((ascendente && this.autos[j].precio > this.autos[j + 1].precio) ||
                    (!ascendente && this.autos[j].precio < this.autos[j + 1].precio)) {
                    const temp = this.autos[j];
                    this.autos[j] = this.autos[j + 1];
                    this.autos[j + 1] = temp;
                }
            }
        }
        return this.autos;
    }


}

export default Catalogo;