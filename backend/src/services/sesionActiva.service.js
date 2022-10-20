import { SesionActiva } from "../models/SesionActiva.js";
import bcrypt from "bcrypt";

export const sesionActivaService = {
  nueva,
  comprobarToken,
};

async function nueva(medicoEncontrado) {
  try {
    const token = await bcrypt.hash("token", bcrypt.genSaltSync(8));
    // eliminamos todos los tokens ya que solo hay una sesion a la vez
    SesionActiva.truncate();
    const nuevoToken = await SesionActiva.create({ token,medicoId:medicoEncontrado["id"] });

    if (!nuevoToken) {
      return {};
    }

    return token;
  } catch (error) {
    return "No se pudo registrar crear nuevo token, error: " + error;
  }
}

async function comprobarToken(token) {
  try {
    const tokenRecibido = await SesionActiva.findOne({
      where: {
        token,
      },
    });

    if (tokenRecibido) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return "No se pudo comprobar token, error: " + error;
  }
}
