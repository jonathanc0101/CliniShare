import { MedicosService } from "../services/medico.service.js";

export const getMedicos = async (req, res, next) => {
  const medicos = await MedicosService.getMedicos();
  res.send(JSON.stringify(medicos));
};

export const createMedico = async (req, res, next) => {
  const { nombre, apellido, dni, matricula } = req.body;
  const medicoCreado = await MedicosService.createMedico({nombre,apellido,dni,matricula});

  res.send(JSON.stringify(medicoCreado));

};
