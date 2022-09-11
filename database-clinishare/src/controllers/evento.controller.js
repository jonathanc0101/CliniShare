import { Evento } from "../models/Evento.js";

export const getEventos = async (req, res) => {
  const eventos = await Evento.findAll({ attributes: ['id', 'titulo', 'fecha', 'descripcion'] });

  if (eventos.length === 0) {
    res.send(JSON.stringify([{}]));
  }
  else {
    res.send(JSON.stringify(eventos));
  }
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

