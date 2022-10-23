
import dgram from "dgram";
import { SERVER_PORT,  } from "./constants.js";
import { getComputadora } from "./constants.js";



const computadora =  await getComputadora();


function broadcastMessage(myMessage) {
  var sender = dgram.createSocket("udp4");

  sender.bind(undefined, undefined, function () {
    sender.setBroadcast(true);
  });

  sender.send(
    myMessage,
    0,
    myMessage.length,
    SERVER_PORT,
    "255.255.255.255",
    function (err, bytes) {
      sender.close();
    }
  );
}

export function broadcastComputerData() {
  // broadcasts the computer data to the network
  broadcastMessage(JSON.stringify(computadora));
}

export function responderBroadcast(computer) {
  // enviamos nuestros datos (nombre, ips, etc.) a la computadora que nos envió un broadcast

  var sender = dgram.createSocket("udp4");

  let mensajeComputadora = JSON.stringify(computadora);

  sender.bind(undefined, undefined);

  console.log("RESPONDIENDO BROADCAST");
  console.log("RESPONDIENDO BROADCAST",mensajeComputadora);
  console.log("RESPONDIENDO A LA COMPUTADORA",computer);

  sender.send(
    mensajeComputadora,
    0,
    mensajeComputadora.length,
    SERVER_PORT,
    computer.ip[0],
    function (err, bytes) {
      sender.close();
    }
  );
}

