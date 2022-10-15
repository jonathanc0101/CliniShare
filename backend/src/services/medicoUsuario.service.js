import { MedicoUsuario } from "../models/MedicoUsuario";

export const MedicosUsuariosService = {
  getMedicos: () => getMedicosFromModel(),
  getMedicoByDni: (dniABuscar) => getMedicoByDniFromModel(dniABuscar),
  registerMedico: (medico) => registerMedicoFromModel(medico),
  getMedicoById: (id) => getMedicoByIdFromModel(id),
  getMedicoByEmail:getMedicoByEmailFromModel,

};

async function getMedicosFromModel() {
  const medicos = await MedicoUsuario.findAll();

  if (medicos.length === 0) {
    return [];
  } else {
    return medicos;
  }
}

async function getMedicoByEmailFromModel(email) {
  const medico = await Medico.findOne({
    where: {
      email,
    },
  });
  
  if (!medico) {
    return {};
  } else {
    return medico;
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

async function getMedicoByIdFromModel(id) {
  const medico = await Medico.findOne({
    where: {
      id,
    },
  });
  
  if (!medico) {
    return {};
  } else {
    return medico;
  }
}


