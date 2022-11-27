import { PacientesConflictivosService } from "../services/pacienteConflictivo.service";

export const getAll = async (req, res, next) => {
  const pacientes = await PacientesConflictivosService.getAll();
  res.send(JSON.stringify(pacientes));
};

export const resolver = async (req, res, next) => {
  const response = await PacientesConflictivosService.resolver(req.body);
  res.send(JSON.stringify(response));
}


