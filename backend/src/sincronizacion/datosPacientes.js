import { PacientesService } from "../services/paciente.service.js";

export function actualizarDatosPacientes(pacientes) {
   PacientesService.upsertarPacientes(pacientes);
}
