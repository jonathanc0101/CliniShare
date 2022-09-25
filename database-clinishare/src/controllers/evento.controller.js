import { EventosService } from "../services/eventos.service.js";

export const getEventos = async (req, res) => {
  const eventos = await EventosService.getEventos();
  res.send(JSON.stringify(eventos));
};

export const getEventosPorDni = async (req, res) => {
  let dni = req.params.dni;
  console.log("dNI" + dni);
  const eventos = await EventosService.getEventosPorDniPaciente(dni);
  res.send(JSON.stringify(eventos));
};

export const getEventoPorId = async (req, res) => {
  let id = req.params.id;
  const evento = await EventosService.getEventoPorId(id);

  res.send(JSON.stringify(evento));
};

export const createEvento = async (req, res) => {
  try {
    const evento = req.body;
    const eventoCargado = await EventosService.createEvento(evento);
    // console.log(eventoCargado);
    res.send(JSON.stringify(eventoCargado));
  } catch (error) {
    console.log(error);
  }
};

export const updateEventoPorId = async (req, res) => {
  const id = req.params.id;
  console.log("updateEventoPorId, ID: " + id);

  const evento = req.body;
  const updatedEvento = await EventosService.updateEventoPorId(evento, id);

  res.send(JSON.stringify(updatedEvento));
};
