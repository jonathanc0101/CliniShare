import {ConexionActivaService} from "../services/conexionActiva.service.js";

export async function registrarConexionActiva(computadora) {
  console.log("computadoraconexionactivas",computadora);
  try {
      const conexion = {
        nombreUsuario: computadora.nombre,
        medicoId: computadora.medicoId,
        ip: computadora.ip[0],
      };
  
      await ConexionActivaService.createConexion(conexion);
      
    
  } catch (error) {
    console.log(error);
  }
}
