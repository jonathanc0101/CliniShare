import { SesionActiva } from "../models/SesionActiva.js";

export const sesionActivaService = {
  nueva,
  comprobarToken,
};

async function nueva(token) {
  try {
    // eliminamos todos los tokens ya que solo hay una sesion a la vez
    SesionActiva.truncate();
    const nuevoToken = await SesionActiva.create({ token });

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
