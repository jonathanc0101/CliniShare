import { Medico } from "../models/Medico.js";
import { MedicoUsuario } from "../models/MedicoUsuario.js";
import { MedicosService } from "./medico.service.js";

export const MedicosUsuariosService = {
  getMedicos: () => getMedicosFromModel(),
  getMedicoByDni: (dniABuscar) => getMedicoByDniFromModel(dniABuscar),
  getMedicoById: (id) => getMedicoByIdFromModel(id),
  getMedicoByEmail: getMedicoByEmailFromModel,
  create,
  modificar,
};

async function create(user) {
  const userCreado = {};

  await sequelize.transaction(async (t) => {
    userCreado = await MedicoUsuario.create(user, {
      where: { id: user.id },
    });
    
    await MedicosService.createMedico(userCreado);
  });

  return quitarPassword(userCreado);
}

async function modificar(user) {
  await sequelize.transaction(async (t) => {
    const newUser = await MedicoUsuario.update(user, {
      where: { id: user.id },
    });
    newUser.id = await MedicosService.obtenerMedicoIdAPartirDeMedicoUser(user);
    await Medico.update(newUser, { where: { id: newUser.id } });
  });

  return true;
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
