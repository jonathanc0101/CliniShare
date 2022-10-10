import { responderBroadcast } from "../UDP/broadcastSender.js";
import { handleNewComputer, handleNewComputerNonLooping } from "../sincronizacion/handshake.js";
import { sincronizar } from "../sincronizacion/sincronizar.js";
import {registrarConexionActiva} from "../sincronizacion/conexionesActivas.js";
// import {actualizarDatosPacientes} from "../sincronizacion/datosPacientes.js";
// Import other listeners

export default function loadListeners(emitter) {
  emitter.on("new_computer", (computer) => {
    handleNewComputer(computer)});

  emitter.on("new_computer_non_looping", (computer) => {
    handleNewComputerNonLooping(computer)});
    
  emitter.on("new_valid_computer", (computer) => {
    responderBroadcast(computer);
    registrarConexionActiva(computer);
    sincronizar(computer);
  });

  emitter.on("new_valid_computer_non_looping", (computer) => {
    registrarConexionActiva(computer);
    sincronizar(computer);
  });
  
  emitter.on("pacientes_recibidos", (datosPacientes) => {
    actualizarDatosPacientes(datosPacientes);
    console.log("Datos de pacientes en común:" + JSON.stringify(datosPacientes));
  });

  

  // Attach other events
  return emitter;
};