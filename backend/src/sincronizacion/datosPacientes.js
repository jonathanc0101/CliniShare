import { PacientesService } from "../services/paciente.service.js";

export async function actualizarDatosPacientes(pacientes) {
  await PacientesService.upsertarPacientes(pacientes);
}
