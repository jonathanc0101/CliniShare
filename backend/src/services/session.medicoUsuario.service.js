import { MedicoUsuario } from "../models/MedicoUsuario.js";
import { MedicosUsuariosService } from "./medicoUsuario.service.js";
import {sesionActivaService} from "./sesionActiva.service.js";
import bcrypt from "bcrypt";

export const sessionService = {
  login,
  register,
};


async function generateHash(password) {
  return bcrypt.hash(password, bcrypt.genSaltSync(8));
};

async function validPassword(password,hash) {
  return bcrypt.compare(password, hash);
}


async function login(email, password) {
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

    if(passwordIsValid){
      token = await sesionActivaService.nueva();
    }

    if(!token){
      return {}
    }else{
      return token;
    }
    
  } catch (error) {
    return "No se pudo registrar médico usuario, error: " + error;
  }
}

async function register(medico) {
  try {
    const password = medico.password;
    const hash = generateHash(password);
    const newMedico = { ...medico, password: hash };

    let responseMedico = await MedicoUsuario.create(newMedico);

    //no le enviamos el hash al usuario para que no pueda bruteforcearlo
    delete responseMedico.password;

    return responseMedico;
  } catch (error) {
    return "No se pudo registrar médico usuario, error: " + error;
  }
}

