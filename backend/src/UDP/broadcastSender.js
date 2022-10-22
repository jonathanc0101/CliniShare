import os from "os";
import dgram from "dgram";
import ipsGetter from "./getIp.js";
import { SERVER_PORT, MAGIC_STRING, arrUUIDs } from "./constants.js";
import { sesionActivaService } from "../services/sesionActiva.service.js";



export const getComputadora = async () => { 
  const uuid = await obtenerUUID();
  return {
    nombre: os.userInfo().username,
    IPS: ipsGetter(),
    MAGIC_STRING: MAGIC_STRING,
    medicoId: uuid,
  }};
  
const computadora =  await getComputadora();

async function obtenerUUID(){
  const uuid = await sesionActivaService.obtenerUUIDActual();
  return uuid;
}

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

