import { Computadora } from "../models/Computadora.js";

export const ComputadoraService = {
    upsertarComputadora,
    getComputadoras,
};

async function upsertarComputadora(computadora) {
  try {
    const newComputadora = await Computadora.upsert(computadora);

    return newComputadora ;
  } catch (error) {
    console.log("Error en la upsercion de Computadora " + error);
  }
}

async function getComputadoras() {
    try {
      return await Computadora.findAll();
  
    } catch (error) {
      console.log("Error obteniendo todas las Computadoras" + error);
    }
  }