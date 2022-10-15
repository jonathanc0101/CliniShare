
import { sessionService } from "../services/session.medicoUsuario.service.js";

export const sessionController = {
    registerUser,
    loginUser
}

async function registerUser (req, res, next) {
    const credentials = req.body;
    const response = await sessionService.register(credentials);

    res.send(JSON.stringify(response));
  };
  
async function loginUser  (req, res, next) {
    const datosLogin = req.body;
    const token = await sessionService.login(datosLogin);
  
    res.send(JSON.stringify(token));
  };
  