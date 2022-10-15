import { MedicoUsuario } from "../models/MedicoUsuario";
import { MedicosUsuariosService } from "./medicoUsuario.service";

export async function login(email,password){
    const medicoEncontrado = await MedicosUsuariosService.getMedicoByEmail(email);

    if(!medicoEncontrado){
        return {};
    }
    
    const  passwordIsValid = await MedicoUsuario.validPassword(medicoEncontrado.password,password); 

    return passwordIsValid
}

export async function registerMedicoFromModel(medico) {
    try {
      const password = medico.password; 
      const hash = MedicoUsuario.generateHash(password);
      const newMedico = {...medico,password:hash};
  
      const responseMedico = await MedicoUsuario.create(newMedico);
  
      return responseMedico;
    } catch (error) {
      return "No se pudo registrar médico usuario, error: " + error;
    }
  }