import { EventosService } from "../services/eventos.service.js";

export const getEventos = async (req, res) => {
  const eventos = await EventosService.getEventos();
  res.send(JSON.stringify(eventos));
};

export const createEvento = async (req, res) => {
  const { titulo, fecha, descripcion, medicoId} = req.body;
  const eventoCargado = await EventosService.createEvento({
    titulo,
    fecha,
    descripcion,
    medicoId,
  });
  console.log(eventoCargado);
  res.send(JSON.stringify(eventoCargado));
};

