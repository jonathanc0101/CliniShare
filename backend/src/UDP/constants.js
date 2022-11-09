import { sesionActivaService } from "../services/sesionActiva.service.js";
import os from "os";
import ipsGetter from "./getIp.js";
import { ComputadoraLocalService } from "../services/computadoraLocal.service.js";

export const SERVER_PORT = 10000;
export const MAGIC_STRING = "ALWAYS100";
export const SERVER_BD_PORT = 3000;
export const INITIAL_RESPONSE = "HOLA";

export const getComputadora = async () => {
  const medicoId = await obtenerUUIDMedico();
  const id = await ComputadoraLocalService.obtenerUUIDActual();
  return {
    nombre: os.userInfo().username,
    IPS: ipsGetter(),
    MAGIC_STRING: MAGIC_STRING,
    medicoId,
    id,
  };
};

async function obtenerUUIDMedico() {
  const uuid = await sesionActivaService.obtenerUUIDActual();
  return uuid;
}
