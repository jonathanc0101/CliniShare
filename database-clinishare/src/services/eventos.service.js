import { Evento } from "../models/Evento.js";
import { HistoriaClinicaService } from "./historiaClinica.service.js";

export const EventosService = {
  getEventos: () => getEventosFromModel(),
  createEvento: (evento, dniPaciente) =>
    createEventoFromModel(evento, dniPaciente),
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

async function createEventoFromModel(evento, dniPaciente) {
  try {
    dniPaciente = "1111";

    //preguntar si existe una historia clinica asignado a tal paciente.
    //si no existe, creo la historia clinica
    const historiaClinicaNueva =
      await HistoriaClinicaService.createHistoriaClinica({
        pacienteDni: dniPaciente,
      });

    //después de crear la historia clinica, asginar al evento correspondiente
    evento.historiaClinicaId = historiaClinicaNueva.id;

    evento.fecha = new Date();
    // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
    let newEvento = await Evento.create(evento);

    return newEvento;
  } catch (error) {
    return "No se pudo cargar el evento. " + error;
  }
}
