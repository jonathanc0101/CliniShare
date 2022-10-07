import { PacientesService } from "../services/paciente.service.js";

export const getPacientes = async (req, res, next) => {
  const pacientes = await PacientesService.getPacientes();
  res.send(JSON.stringify(pacientes));
};

export const getPacienteByDni = async (req, res, next) => {
  let dniABuscar = req.params.dni;
  console.log("getPacienteByDni, dniABuscar: " + dniABuscar);
  const pacienteEncontrado = await PacientesService.getPacienteByDni(dniABuscar);
  res.send(JSON.stringify(pacienteEncontrado));
};

export const getPacienteById = async (req, res, next) => {
  let id = req.params.id;
  console.log("getPacienteById, id: " + id);
  const pacienteEncontrado = await PacientesService.getPacienteById(id);
  res.send(JSON.stringify(pacienteEncontrado));
};

export const getDnisDePacientes = async (req, res, next) => {
  const pacientes = await PacientesService.getDnisDePacientes();
  res.send(JSON.stringify(pacientes));
};

export const getPacientesPorDnis = async (req, res, next) => {
  let dnis = req.body;
  const pacientes = await PacientesService.getPacientesPorDnis(dnis);
  res.send(JSON.stringify(pacientes));
};

export const getEntidadesPacientesPorDnis = async (req, res, next) => {
  let dnis = req.body;
  const entidadesPacientes = await PacientesService.getEntidadesPacientesPorDnis(dnis);
  res.send(JSON.stringify(entidadesPacientes));
};




export const createPaciente = async (req, res, next) => {
  const paciente = req.body;
  const newPaciente = await PacientesService.createPaciente(paciente);
  
  res.send(JSON.stringify(newPaciente));

};

export const updatePacientePorId = async (req, res, next) => {
  const id = req.params.id;
  console.log("updatePacientePorId, ID: " + id);

  const paciente = req.body;
  const updatedPaciente = await PacientesService.updatePacientePorId(paciente, id);
  
  res.send(JSON.stringify(updatedPaciente));

};
