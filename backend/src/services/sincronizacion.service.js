import { Sincronizacion } from "../models/Sincronizacion.js";

export const SincronizacionService = {
  getSincronizacionReciente: () => getSincronizacionRecienteFromModel(),
  createSincronizacion: (sincronizacion) =>
    createSincronizacionFromModel(sincronizacion),
    registrarSincronizacion
};

async function registrarSincronizacion(computer){
  const sincronizacionNueva = {medicoId:computer.medicoId};
  await createSincronizacionFromModel(sincronizacionNueva);
}

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
    return({});
  }
  else {
    return sincronizacion;
  }

}

async function createSincronizacionFromModel(sincronizacion) {
  try {
    const fecha = new Date()
    const newSincronizacion = await Sincronizacion.create({...sincronizacion,fecha});

    return newSincronizacion;
  } catch (error) {
    console.log("Error en la creación de sincronización" + error);
  }
}
