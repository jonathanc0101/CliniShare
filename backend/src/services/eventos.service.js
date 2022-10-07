import { Evento } from "../models/Evento.js";

export const EventosService = {
  getEventos: () => getEventosFromModel(),
  createEvento: (evento) => createEventoFromModel(evento),
  getEventosPorDniPaciente: (dni) => getEventosFromModelPorPacienteDNI(dni),
  updateEventoPorId: (evento,id) => updateEventoPorIdFromModel(evento,id),
  getEventoPorId : (id) => getEventoPorIdFromModel(id),
};

async function getEventosFromModel() {
  const eventos = await Evento.findAll();

  if (eventos.length === 0) {
    [];
  } else {
    return eventos;
  }
}

async function getEventoPorIdFromModel(id){
  const evento = await Evento.findOne({
    where : {id:id}
  });

  return evento;
}

async function createEventoFromModel(evento) {
  try {
    let newEvento = {};

    newEvento = await Evento.create(evento);

    return newEvento;
  } catch (error) {
    console.log(error);
    return ("No se pudo cargar el evento");
  }
}

async function updateEventoPorIdFromModel(evento, id) {
  try {
    const eventoUpdateado = await Evento.update(evento, {
      where: { id: id },
    });

    return eventoUpdateado;
  } catch (error) {
    console.log(error);

    return {};
  }
}


async function getEventosFromModelPorPacienteDNI(pacienteDNI) {

  const paciente = await Paciente.findOne({where:{
    dni:pacienteDNI
  }});

  pacienteId = paciente.id;

  const eventos = await Evento.findAll({
    where: {
      pacienteId
    }
  });

  if (eventos.length === 0) {
    [];
  } else {
    return eventos;
  }
}