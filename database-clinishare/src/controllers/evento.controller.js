import { EventosService } from "../services/eventos.service.js";

export const getEventos = async (req, res) => {
  const eventos = await EventosService.getEventos();
  res.send(JSON.stringify(eventos));
};

export const createEvento = async (req, res) => {
  const { titulo, fecha, descripcion, pacienteId, historiaClinicaId } = req.body;

  const newEvento = await EventosService.createEvento({ titulo, fecha, descripcion, pacienteId, historiaClinicaId } );

  res.send(JSON.stringify());
};

