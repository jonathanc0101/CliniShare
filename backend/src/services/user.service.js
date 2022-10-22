import { MedicoUsuario } from "../models/MedicoUsuario.js";
import { MedicosUsuariosService } from "./medicoUsuario.service.js";
import { sesionActivaService } from "./sesionActiva.service.js";
import bcrypt from "bcrypt";
import { MedicosService } from "./medico.service.js";

export const userService = {
  login,
  register,
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
      return {token,medico:quitarPassword(medicoEncontrado)};
    }
  } catch (error) {
    console.log( "No se pudo logear médico usuario, error: " + error);
    return {};
  }
}

function quitarPassword(medico){
  let medicoFiltrado = {...medico.dataValues};
  delete medicoFiltrado.password;

  return medicoFiltrado;
}

async function register(medico) {
  try {
    const password = medico.password;
    const hash = await generateHash(password);
    const newMedico = { ...medico, password: hash };
    
    let responseUser = await MedicoUsuario.create(newMedico);
    const medicoCreado = await MedicosService.createMedico(newMedico);

    //no le enviamos el hash al usuario para que no pueda bruteforcearlo
    responseUser = quitarPassword(responseUser);

    return responseUser;
  } catch (error) {
    return {};
  }
}
