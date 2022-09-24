import { HistoriaClinica } from "../models/HistoriaClinica.js";
import { PacientesService } from "./paciente.service.js";

export const HistoriaClinicaService = {
  getHistoriasClinicas: () => getHistoriasClinicasFromModel(),
  createHistoriaClinica: (historia) => createHistoriaClinicaFromModel(historia),
  getHistoriaClinicaByPacienteDni: (pacienteDni) =>
    getHistoriaClinicaByPacienteDniFromModel(pacienteDni),
};

async function getHistoriasClinicasFromModel() {
  const historias = await HistoriaClinica.findAll({
    attributes: ["id", "pacienteId", "medicoId"],
  });

  if (historias.length === 0) {
    return [];
  } else {
    return historias;
  }
}

//Función para obtener la historia clínica de un paciente mediante su DNI.
async function getHistoriaClinicaByPacienteDniFromModel(pacienteDni) {

  const historiaClinicaObtenida = await HistoriaClinica.findOne({
    where: {
      pacienteDni: pacienteDni,
    }
  });

  if (historiaClinicaObtenida === null) {
    return null;
  } else {
    return historiaClinicaObtenida;
  }
}

async function createHistoriaClinicaFromModel({ id, pacienteDni }) {
  try {
    // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
    let newHistoriaClinica = await HistoriaClinica.create({ id, pacienteDni });

    return newHistoriaClinica;
  } catch (error) {
    return "No se pudo crear la historia clínica. " + error;
  }
}
