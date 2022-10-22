import {ConexionActivaService} from "../services/conexionActiva.service.js";

export async function registrarConexionActiva(computadora) {
  try {
      const conexion = {
        nombreUsuario: computadora.nombre,
        idMedico: computadora.medicoUUID,
        ip: computadora.ip[0],
      };
    
      await ConexionActivaService.createConexion(conexion);
    
  } catch (error) {
    console.log(error);
  }
}
