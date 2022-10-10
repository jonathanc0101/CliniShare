import {ConexionActivaService} from "../services/conexionActiva.service.js";

export async function registrarConexionActiva(computadora) {
  const conexion = {
    nombreUsuario: computadora.nombre,
    idMedico: computadora.medicoUUID,
    ip: computadora.ip,
  };

  await ConexionActivaService.createConexion(conexion);
}
