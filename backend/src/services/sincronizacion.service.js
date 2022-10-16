import { Sincronizacion } from "../models/Sincronizacion.js";

export const SincronizacionService = {
  // getMedicos: () => getMedicosFromModel(),
  getSincronizacionReciente: () => getSincronizacionRecienteFromModel(),
  createSincronizacion: (sincronizacion) =>
    createSincronizacionFromModel(sincronizacion),
};

async function getSincronizacionRecienteFromModel() {
  const fechasDeSincronizaciones = await Sincronizacion.findAll({
    attributes: ["fecha"],
  });

//obtener fecha mas reciente
let arrayFechas = fechasDeSincronizaciones.map((fechaActual) => new Date(fechaActual.fecha));

var maxFecha = new Date(Math.max(...arrayFechas));


const sincronizacion = await Sincronizacion.findAll({
    where: {
      fecha: maxFecha
    }
  });

  if (!sincronizacion) {
    return("Sincronizacion no encontrado");
  }
  else {
    return sincronizacion;
  }

}

async function createSincronizacionFromModel(sincronizacion) {
  try {
    var fecha = new Date()
    // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
    let newSincronizacion = await Sincronizacion.create(sincronizacion);

    return newSincronizacion;
  } catch (error) {
    return "Error en la creación de sincronización" + error;
  }
}
