import { Evento } from "../models/Evento.js";

export const EventosService = {
  getEventos: () => getEventosFromModel(),
  createEvento: (evento) => createEventoFromModel(evento),
}

async function getEventosFromModel() {
  const eventos = await Evento.findAll({ attributes: ['id', 'titulo', 'fecha', 'descripcion'] });

  if (eventos.length === 0) {
    [];
  }
  else {
    return (eventos);
  }
}

async function createEventoFromModel({ titulo,  fecha,  descripcion,  pacienteId }) {
  try {
    const newEvento = await Evento.create({
      titulo,
      fecha,
      descripcion,
      pacienteId
    },);

    const newEventoAux = {
      titulo: newEvento.titulo,
      fecha: newEvento.fecha,
      descripcion: newEvento.descripcion,
      pacienteId: newEvento.pacienteId
    };

    return newEventoAux;

  } catch (error) {
    console.log(error);
    return { error };
  }
}