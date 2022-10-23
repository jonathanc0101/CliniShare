import {
  handleNewComputer,
  handleNewComputerNonLooping,
} from "../sincronizacion/handshake.js";
import { sincronizar } from "../sincronizacion/sincronizar.js";
import { registrarConexionActiva } from "../sincronizacion/conexionesActivas.js";
import { SincronizacionService } from "../services/sincronizacion.service.js";
import { actualizarDatos } from "../sincronizacion/datosPacientes.js";
import { listenForBroadcasts } from "../UDP/broadcastListener.js";
import { broadcastComputerData,responderBroadcast } from "../UDP/broadcastSender.js";

// Import other listeners

export default function loadListeners(emitter) {
  emitter.on("logged_in", () => {
    const treintaMinutos = 1000 * 60 * 30;

    //starting broadcast listener

    //arreglar este tema de que no deja de escuchar en ningun momento, deberia dejar de escuchar cuando se cierra sesion
    listenForBroadcasts();

    //broadcast self to network after a few seconds
    setTimeout(broadcastComputerData, 1000);
    setInterval(broadcastComputerData, treintaMinutos);
  });

  emitter.on("new_computer", (computer) => {
    handleNewComputer(computer);
  });

  emitter.on("new_computer_non_looping", (computer) => {
    handleNewComputerNonLooping(computer);
  });

  emitter.on("new_valid_computer", async (computer) => {
    registrarConexionActiva(computer);

    await sincronizar(computer)
    await SincronizacionService.registrarSincronizacion(computer.medicoId);
  
  });

  emitter.on("new_valid_computer_non_looping", (computer) => {
    registrarConexionActiva(computer);
    sincronizar(computer).then(() => {
      SincronizacionService.registrarSincronizacion(computer.medicoId);
    });
  });

  emitter.on("datos_recibidos", async (datos) => {
    await actualizarDatos(datos);
    responderBroadcast(computer);
  });

  // Attach other events
  return emitter;
}
