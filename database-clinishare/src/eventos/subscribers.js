import { handleNewComputer } from "../sincronizacion/handshake.js";
import { sincronizar } from "../sincronizacion/sincronizar.js";
// Import other listeners

export default function loadListeners(emitter) {
  emitter.on("new_computer", (computer) => {
    handleNewComputer(computer)});
  emitter.on("new_valid_computer", (computer) => sincronizar(computer));
  // Attach other events
  return emitter;
};