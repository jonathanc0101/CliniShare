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
console.log("fechas array: " + arrayFechas);
var maxFecha = new Date(Math.max(...arrayFechas));

console.log("fecha más reciente: " ,maxFecha.toJSON());

const sincronizacion = await Sincronizacion.findAll({
    where: {
      fecha: maxFecha
    },
    attributes: ['id', 'fecha', 'medicoDNI']
  });

  if (!sincronizacion) {
    return("Sincronizacion no encontrado");
  }
  else {
    return sincronizacion;
  }

}

async function createSincronizacionFromModel({medicoDNI }) {
  try {
    var fecha = new Date()
    // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
    let newSincronizacion = await Sincronizacion.create({
      fecha,
      medicoDNI
    });

    newSincronizacion = {
      fecha: newSincronizacion.fecha,
      medicoDNI: newSincronizacion.medicoDNI
    };

    return newSincronizacion;
  } catch (error) {
    return "Error en la creación de sincronización" + error;
  }
}
