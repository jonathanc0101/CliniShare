import { EventosService } from "../services/eventos.service.js";
import { PacientesService } from "../services/paciente.service.js";

export const getEventos = async (req, res) => {
  const eventos = await EventosService.getEventos();
  res.send(JSON.stringify(eventos));
};

export const getEventosPorDni = async (req, res) => {
  let dni = req.query.dni;
  console.log("dNI" + dni)
  const eventos = await PacientesService.getEventosPorDniPaciente(dni);
  res.send(JSON.stringify(eventos));
};

export const createEvento = async (req, res) => {
  try {
    const { titulo, fecha, descripcion, medicoDni, pacienteDni } = req.body;
    const eventoCargado = await EventosService.createEvento({
      titulo,
      fecha,
      descripcion,
      medicoDni,
      pacienteDni
    });
    // console.log(eventoCargado);
    res.send(JSON.stringify(eventoCargado));
  } catch (error) {
    console.log(error)
  }
};
