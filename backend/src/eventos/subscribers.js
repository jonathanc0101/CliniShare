import {
  handleNewComputer,
  handleNewComputerNonLooping,
} from "../sincronizacion/handshake.js";
import { sincronizar,sincronizarNonLooping } from "../sincronizacion/sincronizar.js";
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
    console.log("\n\nevento:ew_computer\n\n");
    handleNewComputer(computer);
  });

  emitter.on("new_computer_non_looping", (computer) => {
    console.log("\n\nnew_computer_non_looping\n\n");
    handleNewComputerNonLooping(computer);
  });

  emitter.on("new_valid_computer", async (computer) => {
    console.log("\n\nnew_valid_computer\n\n");
    // await ComputadoraService.
    await sincronizar(computer);  
  });

  emitter.on("new_valid_computer_non_looping", async (computer) => {

    console.log("\n\nevento:new_valid_computer_non_looping\n\n",computer);

    await sincronizarNonLooping(computer);
  });

  emitter.on("datos_enviados",async(obj) => {
  });
  
  emitter.on("datos_recibidos", async (obj) => {
    console.log("\n\nevento:datos_recibidos\n\n",obj);
    
    await actualizarDatos(obj.datosPacientes);
    SincronizacionService.registrarSincronizacion(obj.computadora.computadoraId);
    
    console.log("\n\n evento: ya se actualizaron los datos \n\n");

    await responderBroadcast(obj.computadora);
  });
  
  emitter.on("datos_recibidos_non_looping", async (obj) => {
    console.log("\n\nevento:datos_recibidos_non_looping\n\n", obj.datosPacientes);
    
    await actualizarDatos(obj.datosPacientes);
    SincronizacionService.registrarSincronizacion(obj.computadora.computadoraId);

  });


  // Attach other events
  return emitter;
}
