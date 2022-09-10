function doSomething(computadora){
    console.log(JSON.stringify(computadora));
}
// Import other listeners

export default function loadListeners(emitter) {
  emitter.on("new_computer", (computer) => doSomething(computer));
  // Attach other events
  return emitter;
};