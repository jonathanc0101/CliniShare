import axios from "axios";
import rutas from "./rutas";

export const api = {
  guardarPaciente,
  guardarEvento
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

// async function modificarEvento(Evento) {
//   try {
//     const response = await axios.post(rutas.nuevoEvento, Evento);

//     const eventoRespuesta = response.data;

//     return(Object.keys(eventoRespuesta).length !== 0);
    
//   } catch (error) {
//     console.error(error);
//     return false;
//   }
// }
