import axios from "axios";
import rutas from "./rutas";

export const api = {
  guardarPaciente,
  guardarEvento,
  modificarEvento,
  obtenerEvento
};

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

async function guardarPaciente(Paciente) {
  try {
    const response = await axios.post(rutas.nuevoPaciente, Paciente);

    const pacienteRespuesta = response.data;

    return(Object.keys(pacienteRespuesta).length !== 0);
    
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function guardarEvento(Evento) {
  try {
    const response = await axios.post(rutas.nuevoEvento, Evento);

    const eventoRespuesta = response.data;

    return(Object.keys(eventoRespuesta).length !== 0);
    
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function modificarEvento(Evento) {
  try {
    const response = await axios.put(rutas.modificarEvento + Evento.id, Evento);

    const eventoRespuesta = response.data;

    return(Object.keys(eventoRespuesta).length !== 0);
    
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function obtenerEvento() {
  try {
    const eventoObtenido = await axios.get(rutas.getEvento + "3");
    //console.log(eventoObtenido.data);
    return eventoObtenido.data;
  } catch (error) {
    // console.error(error);
    return ("El evento no existe")
  }
}
