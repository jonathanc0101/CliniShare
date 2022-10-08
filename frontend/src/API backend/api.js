import axios from "axios";
import rutas from "./rutas";

export const api = {
  obtenerMedicoByDni,
  obtenerPacienteByDni,
  guardarPaciente,
  guardarEventoObteniendoIds,
  modificarEvento,
  obtenerEvento,
  obtenerEventos,
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

async function guardarEvento(Evento) {
  try {
    const response = await axios.post(rutas.nuevoEvento, Evento);

    const eventoRespuesta = response.data;

    return Object.keys(eventoRespuesta).length !== 0;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function guardarEventoObteniendoIds(Evento) {
  try {
    const pacienteEncontrado = await api.obtenerPacienteByDni(Evento.pacienteDni);
    console.log(Evento);
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

async function obtenerEvento(id) {
  try {
    const eventoObtenido = await axios.get(rutas.getEvento + id);
    return eventoObtenido.data;
  } catch (error) {
    return "El evento no existe";
  }
}

async function obtenerEventos() {
  try {
    const eventosObtenidos = await axios.get(rutas.getEventos);
    console.log(eventosObtenidos);
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
