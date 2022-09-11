import { Evento } from "../models/Evento.js";
import { EventosService } from "../services/eventos.service.js";

export const getEventos = async (req, res) => {
  const eventos = await EventosService.getEventos();
  res.send(JSON.stringify(eventos));
};

export const createEvento = async (req, res) => {
  const { titulo, fecha, descripcion } = req.body;

  try {
    const newEvento = await Evento.create({
      titulo,
      fecha,
      descripcion,
      pacienteId
    },);

    const newEventoAux = { 
      titulo:newEvento.titulo,
      fecha:newEvento.fecha,
      descripcion:newEvento.descripcion,
      pacienteId:newEvento.pacienteId
    };

    console.log();
    res.send(JSON.stringify(newEventoAux));

  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({error}));
  }

};

