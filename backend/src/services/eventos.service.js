import { Evento } from "../models/Evento.js";
import { Paciente } from "../models/Paciente.js";
import { Medico } from "../models/Medico.js";

import { Op } from "sequelize";

export const EventosService = {
  getEventos: () => getEventosFromModel(),
  createEvento: (evento) => createEventoFromModel(evento),
  getEventosPorDniPaciente: (dni) => getEventosFromModelPorPacienteDNI(dni),
  getEventosPorPacienteId: (id) => getEventosPorPacienteIdFromModel(id),
  updateEventoPorId: (evento, id) => updateEventoPorIdFromModel(evento, id),
  getEventoPorId: (id) => getEventoPorIdFromModel(id),
  getEventoConPacienteYMedicoPorId: (id) =>
    getEventoConPacienteYMedicoPorIdFromModel(id),
  getEventosCompletos: getEventosCompletosFromModel,
  getEventosCompletosPorIDPaciente,
  getEventoImportanteCompletoPorId: getEventoImportanteCompletoFromModel,
  getEventosCompletosImportantesPorPacienteId:
    getEventosImportantesCompletosPorIdPacienteFromModel,
  getEventosCompletosPorDnisYFechas,
  getEventosCompletosPorDnisYFechasAPartirDeFecha,
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
        model: Medico,
      },
      {
        model: Paciente,
      },
    ],
  });

  if (eventos.length === 0) {
    return [];
  } else {
    return eventos;
  }
}

async function getEventosCompletosPorIDPaciente(pacienteId) {
  const eventos = await Evento.findAll({
    include: [
      {
        model: Medico,
      },
      {
        model: Paciente,
      },
    ],

    where: { pacienteId },
  });

  if (eventos.length === 0) {
    return [];
  } else {
    return eventos;
  }
}

async function getEventosCompletosPorDnisYFechas(dnisYFechas) {
  const eventos = await Evento.findAll({
    include: [
      {
        model: Medico,
      },
      {
        model: Paciente,
      },
    ],
  });

  if (eventos.length === 0) {
    return [];
  } else {
    const eventosFiltrados = eventos.filter((evento) => {
      function obtenerObjDNIyFecha(x) {
        return {
          dni: x.paciente.dni,
          fechaNacimiento: x.paciente.fechaNacimiento,
        };
      }
      const objDNIyFecha = obtenerObjDNIyFecha(evento);

      return dnisYFechas.some(
        (elem) => JSON.stringify(objDNIyFecha) === JSON.stringify(elem)
      );
    });

    // separamos los registros particulares
    const medicosRepetidos = eventosFiltrados.map((evento) => evento.medico);
    const pacientesRepetidos = eventosFiltrados.map(
      (evento) => evento.paciente
    );
    const eventosDepurados = eventosFiltrados.map((evento) => {
      let nuevoEvento = evento;
      return nuevoEvento;
    });

    //quitamos los duplicados
    const medicos = [...new Set(medicosRepetidos)];
    const pacientes = [...new Set(pacientesRepetidos)];

    return { medicos, pacientes, eventos:eventosDepurados };
  }
}

async function getEventosCompletosPorDnisYFechasAPartirDeFecha(
  dnisYFechas,
  fecha
) {
  console.log("\n\n evento:entrando a buscar datos a enviar\n\n ");
  console.log(
    "\n\n evento:entrando a buscar datos a enviar, dnis y fechas, fecha\n\n ",
    dnisYFechas,
    fecha
  );
  const eventos = await Evento.findAll({
    where: {
      [Op.or]: {
        updatedAt: { [Op.gt]: fecha },
      },
    },
    include: [
      {
        model: Medico,
      },
      {
        model: Paciente,
      },
    ],
  });

  if (eventos.length === 0) {
    return [];
  } else {
    const eventosFiltrados = eventos.filter((evento) => {
      function obtenerObjDNIyFecha(x) {
        return {
          dni: x.paciente.dni,
          fechaNacimiento: x.paciente.fechaNacimiento,
        };
      }
      const objDNIyFecha = obtenerObjDNIyFecha(evento);

      return dnisYFechas.some(
        (elem) => JSON.stringify(objDNIyFecha) === JSON.stringify(elem)
      );
    });

    // separamos los registros particulares
    const medicosRepetidos = eventosFiltrados.map((evento) => evento.medico);
    const pacientesRepetidos = eventosFiltrados.map(
      (evento) => evento.paciente
    );
    const eventosDepurados = eventosFiltrados.map((evento) => {
      let nuevoEvento = evento;
      delete nuevoEvento.medico;
      return nuevoEvento;
    });

    //quitamos los duplicados
    const medicos = [...new Set(medicosRepetidos)];
    const pacientes = [...new Set(pacientesRepetidos)];

    return { medicos, pacientes, eventos:eventosDepurados };
    
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
        model: Medico,
      },
      {
        model: Paciente,
      },
    ],
  });

  return evento;
}

async function getEventoImportanteCompletoFromModel(id) {
  const evento = await Evento.findOne({
    where: { id: id, importante: true },
    include: [
      {
        model: Medico,
      },
      {
        model: Paciente,
      },
    ],
  });

  if (eventos.length === 0) {
    return [];
  } else {
    return eventos;
  }
}

async function getEventosImportantesCompletosPorIdPacienteFromModel(
  pacienteId
) {
  const eventos = await Evento.findAll({
    where: {
      pacienteId,
      importante: true,
      fechaVencimiento: {
        [Op.or]: {
          [Op.gt]: new Date(),
          [Op.eq]: null,
        },
      },
    },
    include: [
      {
        model: Medico,
      },
      {
        model: Paciente,
      },
    ],
  });

  return eventos;
}

async function createEventoFromModel(evento) {
  try {
    const newEvento = await Evento.create(evento);

    return newEvento;
  } catch (error) {
    console.log(error);
    console.log("No se pudo cargar el evento");
    return {};
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
    },
  });

  if (eventos.length === 0) {
    return [];
  } else {
    return eventos;
  }
}
