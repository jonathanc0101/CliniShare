import axios from "axios";
import rutas from "./rutas";

export const api = {
  obtenerMedicoByDni,
  obtenerPacienteByDni,
  guardarPaciente,
  guardarEventoObteniendoIds,
  modificarEvento,
  obtenerEventoConPacienteYMedicoPorId,
  obtenerEventos,
  obtenerEventosPorPacienteId,
  obtenerPacienteById,
  obtenerMedicoById,
  obtenerPacientes,
  modificarPaciente,
  obtenerEventosCompletosImportantesPorPacienteId,
  obtenerEventosCompletos,
};

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

async function guardarPaciente(Paciente) {
  try {
    const response = await axios.post(rutas.nuevoPaciente, Paciente);
    const pacienteRespuesta = response.data;
    return Object.keys(pacienteRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function obtenerPacientes() {
  try {
    const pacientesObtenidos = await axios.get(rutas.getPacientes);

    return pacientesObtenidos;
  } catch (error) {
    return "No se encontraron pacientes";
  }
}

async function modificarPaciente(id, Paciente) {
  try {
    const response = await axios.put(rutas.modificarPaciente + id, Paciente);

    const pacienteRespuesta = response.data;

    return Object.keys(pacienteRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function guardarEventoObteniendoIds(Evento) {
  try {
    const pacienteEncontrado = await api.obtenerPacienteByDni(
      Evento.pacienteDni
    );
    Evento.pacienteId = pacienteEncontrado.id;

    const medicoEncontrado = await api.obtenerMedicoByDni(Evento.medicoDni);
    Evento.medicoId = medicoEncontrado.id;

    const response = await axios.post(rutas.nuevoEvento, Evento);

    const eventoRespuesta = response.data;

    return Object.keys(eventoRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function modificarEvento(id, Evento) {
  try {
    const response = await axios.put(rutas.modificarEvento + id, Evento);

    const eventoRespuesta = response.data;

    return Object.keys(eventoRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

// async function obtenerEvento(id) {
//   try {
//     const eventoObtenido = await axios.get(rutas.getEvento + id);

//     console.log("Object: ", eventoObtenido.data);
//     return eventoObtenido.data;
//   } catch (error) {
//     return "El evento no existe";
//   }
// }

async function obtenerEventoConPacienteYMedicoPorId(id) {
  try {
    const eventoObtenido = await axios.get(rutas.getEventoConPacienteYMedicoPorId + id);

    return eventoObtenido.data;
  } catch (error) {
    return "El evento no existe";
  }
}

async function obtenerEventos() {
  try {
    const eventosObtenidos = await axios.get(rutas.getEventos);
    return eventosObtenidos;
  } catch (error) {
    return "El evento no existe";
  }
}

async function obtenerEventosCompletos() {
  try {
    const eventosObtenidos = await axios.get(rutas.getEventosCompletos);

    return eventosObtenidos;
  } catch (error) {
    return "Error no hay eventos";
  }
}

async function obtenerEventosPorPacienteId(pacienteId) {
  try {
    const eventosObtenidos = await axios.get(rutas.getEventosPorPacienteId + pacienteId);
    return eventosObtenidos;
  } catch (error) {
    return "El evento no existe";
  }
}

async function obtenerMedicoByDni(medicoDni) {
  try {
    const medicoEncontrado = await axios.get(rutas.getMedicoByDni + medicoDni);
    return medicoEncontrado.data;
  } catch (error) {
    return "Médico no encontrado";
  }
}

async function obtenerPacienteByDni(pacienteDni) {
  try {
    const pacienteEncontrado = await axios.get(
      rutas.getPacienteByDni + pacienteDni
    );
    return pacienteEncontrado.data;
  } catch (error) {
    return "Paciente no encontrado";
  }
}

async function obtenerPacienteById(pacienteId) {
  try {
    const pacienteEncontrado = await axios.get(
      rutas.getPacienteById + pacienteId
    );
    return pacienteEncontrado.data;
  } catch (error) {
    return "Paciente no encontrado";
  }
}

async function obtenerMedicoById(medicoId) {
  try {
    const medicoEncontrado = await axios.get(rutas.getMedicoById + medicoId);
    return medicoEncontrado.data;
  } catch (error) {
    return "Médico no encontrado";
  }
}


async function obtenerEventosCompletosImportantesPorPacienteId(pacienteId) {
  try {
    const eventosImportantesObtenidos = await axios.get(rutas.getEventosCompletosImportantesPorPacienteId + pacienteId);
    return eventosImportantesObtenidos;
  } catch (error) {
    return "El evento no existe";
  }
}