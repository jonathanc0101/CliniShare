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

// async function createEventoFromModel({
//   titulo,
//   fecha,
//   descripcion,
//   pacienteId,
//   historiaClinicaId,
// }) {
//   try {
//     const newEvento = await Evento.create({
//       titulo,
//       fecha,
//       descripcion,
//       pacienteId,
//       historiaClinicaId,
//     });

//     const newEventoAux = {
//       titulo: newEvento.titulo,
//       fecha: newEvento.fecha,
//       descripcion: newEvento.descripcion,
//       pacienteId: newEvento.pacienteId,
//       historiaClinicaId: newEvento.historiaClinicaId,
//     };

//     return newEventoAux;
//   } catch (error) {
//     return { error };
//   }
// }

async function createEventoFromModel({ titulo, fecha, descripcion }) {
  try {
    // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
    let newEvento = await Evento.create({
      titulo,
      fecha: new Date(),
      descripcion,
    });

    return newEvento;
  } catch (error) {
    return "No se pudo cargar el evento. " + error;
  }
}
