import { MedicosUsuariosService } from "../services/medicoUsuario.service.js";

export const registerUser = async (req, res, next) => {
    const medico = req.body;
    const medicoCreado = await MedicosUsuariosService.registerMedico(medico);
    
    //no le enviamos el hash al usuario para que no pueda bruteforcearlo
    delete medicoCreado.password;

    res.send(JSON.stringify(medicoCreado));
  };
  
  export const loginUser = async (req, res, next) => {
    const datosLogin = req.body;
    const loginSuccessful = await MedicosUsuariosService.loginMedico(medico);
  
    res.send(JSON.stringify(loginSuccessful));
  };
  