import Catalogo from "./catalogo.js";
import Auto from "./auto.js";

let catalogo = new Catalogo();

let opcion;

do {
  opcion = prompt(
    "Menú:\n" +
      "1. Agregar auto\n" +
      "2. Mostrar catálogo\n" +
      "3. Ordenar autos por precio\n" +
      "4. Filtrar por marca\n" +
      "5. Buscar auto por modelo\n" +
      "6. Salir (Si es primera vez, salir y actualizar)\n" +
      "Ingrese una opción:"
  );

  switch (opcion) {
    case "1":
      const marca = prompt("Ingrese la marca del auto:");
      const modelo = prompt("Ingrese el modelo del auto:");
      const anio = prompt("Ingrese el año del auto:");
      const kilometros = prompt("Ingrese los kilómetros recorridos:");
      const precio = prompt("Ingrese el precio del auto:");
      const id = catalogo.autos.length + 1;
      if (!marca || !modelo || !anio || !kilometros || !precio) {
        alert("Todos los campos son obligatorios.");
        break;
      }
      const auto = new Auto(marca, modelo, anio, kilometros, precio, id);
      catalogo.agregarAuto(auto);
      alert("Auto agregado al catálogo.");
      break;
    case "2":
      const autos = catalogo.listarAutos();
      if (autos.length === 0) {
        alert("El catálogo está vacío.");
      } else {
        alert("Catálogo cargado en consola");
        console.log(catalogo.listarAutos());
      }
      break;
    case "3":
      if (catalogo.autos.length === 0) {
        alert("El catálogo está vacío.");
        break;
      }else {
        alert("Autos ordenados por precio en consola");
        console.log(catalogo.ordenarAutosPorPrecio());
        break;
      }
    case "4":
      let marcaFiltro = prompt("Ingrese la marca que quiera buscar:");
        if (!marcaFiltro) {
        alert("La marca es obligatoria.");
        break;
      }
      if (catalogo.filtrarAutosPorMarca(marcaFiltro) === 0) {
        alert("No se encontraron autos de esa marca.");
      } else {
        alert("Autos filtrados por marca en consola");
        console.log(catalogo.filtrarAutosPorMarca(marcaFiltro));
      }
      break;
    case "5":
      let modeloBuscar = prompt("Ingrese el modelo que quiera buscar:");
      if (!modeloBuscar) {
        alert("El modelo es obligatorio.");
        break;
      }
      const autoEncontrado = catalogo.buscarAutoPorModelo(modeloBuscar);
      if (autoEncontrado) {
        alert(
          "Auto se muestra en consola");
        console.log(
          `${autoEncontrado.marca} ${autoEncontrado.modelo} (${autoEncontrado.anio}) - ${autoEncontrado.kilometros} km - $${autoEncontrado.precio} - ID: ${autoEncontrado.id}`);
      } else {
        alert("No se encontró el auto.");
      }
      break;
    case "6":
      alert("Saliendo del programa.");
      break;
    default:
      alert("Opción no válida. Intente nuevamente.");
  }
} while (opcion !== "6" && opcion !== null);
