import { responderBroadcast } from "../UDP/broadcastSender.js";
import { handleNewComputer, handleNewComputerNonLooping } from "../sincronizacion/handshake.js";
import { sincronizar } from "../sincronizacion/sincronizar.js";
import {registrarConexionActiva} from "../sincronizacion/conexionesActivas.js";
import {SincronizacionService} from "../services/sincronizacion.service.js"
import {actualizarDatos} from "../sincronizacion/datosPacientes.js";
// Import other listeners

export default function loadListeners(emitter) {
  emitter.on("new_computer", (computer) => {
    handleNewComputer(computer)});

  emitter.on("new_computer_non_looping", (computer) => {
    handleNewComputerNonLooping(computer)});
    
    emitter.on("new_valid_computer", (computer) => {
      registrarConexionActiva(computer);
      sincronizar(computer).then(
        () => {
          responderBroadcast(computer);
          SincronizacionService.registrarSincronizacion(computer)
        }
        );
  });

  emitter.on("new_valid_computer_non_looping", (computer) => {
    registrarConexionActiva(computer);
    sincronizar(computer);
  });
  
  emitter.on("datos_recibidos", (datos) => {
    actualizarDatos(datos);
  });

  

  // Attach other events
  return emitter;
};