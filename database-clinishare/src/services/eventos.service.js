import { Evento } from "../models/Evento.js";

export const EventosService = {
  getEventos: () => getEventosFromModel(),
  createEvento: (evento) => createEventoFromModel(evento), 
};

async function getEventosFromModel() {
  const eventos = await Evento.findAll({
    attributes: ["id", "titulo", "fecha", "descripcion"],
  });

  if (eventos.length === 0) {
    [];
  } else {
    return eventos;
  }
}

async function createEventoFromModel(evento, dniPaciente) {
  try {

    //preguntar si existe una historia clinica asignado a tal paciente.
    

    evento.fecha = new Date()
    // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
    let newEvento = await Evento.create(evento)

    return newEvento
  } catch (error) {
    return "No se pudo cargar el evento. " + error;
  }
}
