import { Medico } from "../models/Medico.js";
import { MedicoUsuario } from "../models/MedicoUsuario.js";
import { MedicosService } from "./medico.service.js";

export const MedicosUsuariosService = {
  getMedicos: () => getMedicosFromModel(),
  getMedicoByDni: (dniABuscar) => getMedicoByDniFromModel(dniABuscar),
  getMedicoById: (id) => getMedicoByIdFromModel(id),
  getMedicoByEmail:getMedicoByEmailFromModel,
  create,
  modificar,
};

async function create(medico){
  return await MedicoUsuario.create(medico);
}

async function modificar(medico){
  return await MedicoUsuario.update(medico,{where:{id:medico.id}})
}

async function getMedicosFromModel() {
  const medicos = await MedicoUsuario.findAll();

  if (medicos.length === 0) {
    return [];
  } else {
    return medicos;
  }
}

async function getMedicoByEmailFromModel(email) {
  const medico = await MedicoUsuario.findOne({
    where: {
      email,
    },
  });
  if (!medico) {
    return {};
  } else {
    let medicoNoUsuario = await MedicosService.getMedicoAPartirDeUser(medico);
    delete medicoNoUsuario.id;
    return {...medico,...medicoNoUsuario};
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


