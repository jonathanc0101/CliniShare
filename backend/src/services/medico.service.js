import { Medico } from "../models/Medico.js"

export const MedicosService = {
  getMedicos: () => getMedicosFromModel(),
  getMedicoByDni: (dniABuscar) => getMedicoByDniFromModel(dniABuscar),
  createMedico: (medico) => createMedicoFromModel(medico),
};

async function getMedicosFromModel() {
    const medicos = await Medico.findAll();
    
    if (medicos.length === 0) {
        return [];
    }
    else {
        return medicos;
    }
}

async function createMedicoFromModel(medico){
    try {
        let newMedico = await Medico.create(medico);

    return newMedico;
  } catch (error) {
    return "No se pudo crear médico, error: " + error;
  }
}

async function getMedicoByDniFromModel(dniABuscar) {
  const medico = await Medico.findOne({
    where: {
      dni: dniABuscar,
    },
  });

  if (!medico) {
    return {};
  } else {
    return medico;
  }
}