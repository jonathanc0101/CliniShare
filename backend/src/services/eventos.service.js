import { Evento } from "../models/Evento.js";
import { Paciente } from "../models/Paciente.js";
import { Medico } from "../models/Medico.js";


export const EventosService = {
  getEventos: () => getEventosFromModel(),
  createEvento: (evento) => createEventoFromModel(evento),
  getEventosPorDniPaciente: (dni) => getEventosFromModelPorPacienteDNI(dni),
  getEventosPorPacienteId: (id) => getEventosPorPacienteIdFromModel(id),
  updateEventoPorId: (evento, id) => updateEventoPorIdFromModel(evento, id),
  getEventoPorId: (id) => getEventoPorIdFromModel(id),
  getEventoConPacienteYMedicoPorId: (id) => getEventoConPacienteYMedicoPorIdFromModel(id),
  getEventosCompletos:getEventosCompletosFromModel,

  getEventoImportanteCompletoPorId: getEventoImportanteCompletoFromModel,
  getEventosImportantesCompletosPorIdPaciente: getEventosImportantesCompletosPorIdPacienteFromModel
  
};

async function getEventosFromModel() {
  const eventos = await Evento.findAll();

  if (eventos.length === 0) {
    return [];
  } else {
    return eventos;
  }
}


async function getEventosCompletosFromModel() {
  const eventos = await Evento.findAll({
    include: [
      {
        model: Medico      
      },
      {
        model: Paciente
      }
    ],
  });

  if (eventos.length === 0) {
    return [];
  } else {
    return eventos;
  }
}

async function getEventoPorIdFromModel(id) {
  const evento = await Evento.findOne({
    where: { id: id },
  });

  return evento;
}

async function getEventoConPacienteYMedicoPorIdFromModel(id) {
  const evento = await Evento.findOne({
    where: { id: id },
    include: [
      {
        model: Medico      
      },
      {
        model: Paciente
      }
    ],
  }); 

  return evento;
}

async function getEventoImportanteCompletoFromModel(id) {
  const evento = await Evento.findOne({
    where: { id: id, importante:true },
    include: [
      {
        model: Medico      
      },
      {
        model: Paciente
      }
    ],
  }); 

  return evento;
}


async function getEventosImportantesCompletosPorIdPacienteFromModel(idPaciente) {
  const evento = await Evento.findOne({
    where: { idPaciente, importante:true },
    include: [
      {
        model: Medico      
      },
      {
        model: Paciente
      }
    ],
  }); 

  return evento;
}



async function createEventoFromModel(evento) {
  try {
    const newEvento = await Evento.create(evento);

    return newEvento;
  } catch (error) {
    console.log(error);
    return "No se pudo cargar el evento";
  }
}

async function updateEventoPorIdFromModel(evento, id) {
  try {
    const response = await Evento.update(evento, {
      where: { id: id },
    });

    return response;

  } catch (error) {
    console.log(error);

    return {};
  }
}

async function getEventosFromModelPorPacienteDNI(pacienteDNI) {
  const paciente = await Paciente.findOne({
    where: {
      dni: pacienteDNI,
    },
  });

  const pacienteId = paciente.id;

  const eventos = await Evento.findAll({
    where: {
      pacienteId,
    },
  });

  if (eventos.length === 0) {
    return [];
  } else {
    return eventos;
  }
}

async function getEventosPorPacienteIdFromModel(pacienteId) {
  const eventos = await Evento.findAll({
    where: {
      pacienteId,
    }
  });

  if (eventos.length === 0) {
    return [];
  } else {
    return eventos;
  }
}
