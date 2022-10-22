import { Sincronizacion } from "../models/Sincronizacion.js";

export const SincronizacionService = {
  getSincronizacionReciente:  getSincronizacionMasRecienteFromModel,
  createSincronizacion: (sincronizacion) =>
    createSincronizacionFromModel(sincronizacion),
  registrarSincronizacion,
  getUltimaFechaDeSincronizacionConMedicoId,
};

async function registrarSincronizacion(computer) {
  const sincronizacionNueva = { medicoId: computer.medicoId };
  await createSincronizacionFromModel(sincronizacionNueva);
}

async function getSincronizacionMasRecienteFromModel(medicoId) {
  const fechasDeSincronizaciones = await Sincronizacion.findAll({
    attributes: ["fecha"],
    where:{medicoId}
  });

  //obtener fecha mas reciente
  let arrayFechas = fechasDeSincronizaciones.map(
    (fechaActual) => new Date(fechaActual.fecha)
  );

  var maxFecha = new Date(Math.max(...arrayFechas));

  const sincronizacion = await Sincronizacion.findOne({
    where: {
      fecha: maxFecha,
      medicoId
    },
  });

  if (!sincronizacion) {
    return {};
  } else {
    return sincronizacion;
  }
}

async function getUltimaFechaDeSincronizacionConMedicoId(medicoId){
  const ultima = await getSincronizacionMasRecienteFromModel(medicoId);
  return ultima.fecha;
}


async function createSincronizacionFromModel(sincronizacion) {
  try {
    const fecha = new Date();
    const newSincronizacion = await Sincronizacion.create({
      ...sincronizacion,
      fecha,
    });

    return newSincronizacion;
  } catch (error) {
    console.log("Error en la creación de sincronización" + error);
  }
}
