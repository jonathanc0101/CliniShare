import { handleNewComputer } from "../handshake/handshake.js";
// Import other listeners

export default function loadListeners(emitter) {
  emitter.on("new_computer", (computer) => {
    handleNewComputer(computer)});
  // emitter.on("new_valid_computer", (computer) => handleNewValidComputer(computer));
  // Attach other events
  return emitter;
};