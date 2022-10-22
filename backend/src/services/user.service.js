import { MedicosUsuariosService } from "./medicoUsuario.service.js";
import { sesionActivaService } from "./sesionActiva.service.js";
import bcrypt from "bcrypt";
import { sequelize } from "../database/database.js";
import { Medico } from "../models/Medico.js";
import { MedicosService } from "./medico.service.js";
import { MedicoUsuario } from "../models/MedicoUsuario.js";

export const userService = {
  login,
  register,
  modify,
};

async function generateHash(password) {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
}

async function validPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

async function login(email, password) {
  let token = "";
  try {
    const medicoEncontrado = await MedicosUsuariosService.getMedicoByEmail(
      email
    );

    if (!medicoEncontrado) {
      return {};
    }

    const passwordIsValid = await validPassword(
      password,
      medicoEncontrado.password
    );

    if (passwordIsValid) {
      token = await sesionActivaService.nueva(medicoEncontrado);
    }

    if (!token) {
      return {};
    } else {
      let medico = quitarPassword(medicoEncontrado);
      medico.medicoId = await MedicosService.obtenerMedicoIdAPartirDeMedicoUser(medico);
      return { token, medico };
    }
  } catch (error) {
    console.log("No se pudo logear médico usuario, error: " + error);
    return {};
  }
}

function quitarPassword(medico) {
  let medicoFiltrado = { ...medico.dataValues };
  delete medicoFiltrado.password;

  return medicoFiltrado;
}

async function register(medico) {
  try {
    const hash = await generateHash(medico.password);
    const newMedico = { ...medico, password: hash };

    // esto deberia ser una TRANSACCION
    let responseUser = {};

    await sequelize.transaction(async (t) => {
      responseUser = await MedicoUsuario.create(newMedico, {
        transaction: t,
      });
      await Medico.create(newMedico, { transaction: t });
    });

    //no le enviamos el hash al usuario para que no pueda bruteforcearlo
    responseUser = quitarPassword(responseUser);

    return responseUser;
  } catch (error) {
    console.log(error);
    return {};
  }
}

async function modify(medico) {
  try {
    let response = {};
    const hash = await generateHash(medico.password);
    const medicoNew = { ...medico, password: hash };

    await sequelize.transaction(async (t) => {
      response = await MedicoUsuario.update(medicoNew, {
        where: { email: medicoNew.email },
        transaction: t,
      });
      await Medico.update(medicoNew, { where: { email: medicoNew.email }, transaction: t });
    });

    if (response) {
      return response;
    } else {
      return {};
    }
  } catch (error) {
    console.log(error);
    return {};
  }
}
