import { handleNewComputer } from "../handshake/handshake";
// Import other listeners

export default function loadListeners(emitter) {
  emitter.on("new_computer", (computer) => handleNewComputer(computer));
  // emitter.on("new_valid_computer", (computer) => handleNewValidComputer(computer));
  // Attach other events
  return emitter;
};