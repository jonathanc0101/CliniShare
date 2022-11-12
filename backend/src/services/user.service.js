import { MedicosUsuariosService } from "./medicoUsuario.service.js";
import { sesionActivaService } from "./sesionActiva.service.js";
import bcrypt from "bcrypt";
import { sequelize } from "../database/database.js";
import { Medico } from "../models/Medico.js";
import { MedicosService } from "./medico.service.js";
import { MedicoUsuario } from "../models/MedicoUsuario.js";
import { QueryTypes } from "sequelize";

export const userService = {
  login,
  register,
  modify,
  getAllMedicosUUIDSDeUsers,
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
      console.log("\n\npassword is valid\n\n");
      token = await sesionActivaService.nueva(medicoEncontrado);
    }

    if (!token) {
      return {};
    } else {
      let user = quitarPassword(medicoEncontrado);
      const medico = await MedicosService.getMedicoAPartirDeUser(user);

      let dataValues = { ...medico.dataValues, ...user.dataValues };
      delete dataValues.id;

      user.medicoId = medico.id;

      const userARetornar = { ...user, ...dataValues };

      console.log("\n\nuser\n\n", userARetornar);
      return { token, medico: userARetornar };
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
      await Medico.update(medicoNew, {
        where: { email: medicoNew.email },
        transaction: t,
      });
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

async function getAllMedicosUUIDSDeUsers() {
  try {
    const users = await sequelize.query('SELECT medicos.id as id FROM medicos JOIN "medicosUsuarios" on medicos.email = "medicosUsuarios".email;',{
      type: QueryTypes.SELECT,
    });
    return users;
  } catch (error) {
    console.log("Error getAllUsersUUIDS ", error);
  }
}
