import { ComputadoraLocal } from "../models/ComputadoraLocal.js";

import os from "os";

export const ComputadoraLocalService = {
  obtenerUUIDActual
};

async function obtenerUUIDActual(){
  try {
    const computadoraLocal = await ComputadoraLocal.findOne();

    if (computadoraLocal) {

      return computadoraLocal.dataValues.id;
    } else {
        const computadoraNueva = await crearComputadoraLocalDefault();
        return computadoraNueva.dataValues.id ;
    }
  } catch (error) {
    console.log( "No se pudo encontrar computadoraLocal, error: " + error);
    return {}
  }
}


async function crearComputadoraLocalDefault(){
    try {
        const computadoraNueva = await ComputadoraLocal.create({nombre:os.hostname()});
        
        return computadoraNueva;

    } catch (error) {
        console.log(error);
        return {};
    }
}