import { sesionActivaService } from "../services/sesionActiva.service.js";
import os from "os";
import ipsGetter from "./getIp.js";


export const SERVER_PORT = 10000;
export const MAGIC_STRING = "ALWAYS100";
export const SERVER_BD_PORT = 3000;
export const INITIAL_RESPONSE = "HOLA";

export const getComputadora = async () => {
  const uuid = await obtenerUUID();
  return {
    nombre: os.userInfo().username,
    IPS: ipsGetter(),
    MAGIC_STRING: MAGIC_STRING,
    medicoId: uuid,
  };
};

async function obtenerUUID() {
  const uuid = await sesionActivaService.obtenerUUIDActual();
  return uuid;
}
