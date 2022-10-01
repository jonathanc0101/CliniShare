import { Evento } from "../models/Evento.js";
import { HistoriaClinicaService } from "./historiaClinica.service.js";
import { HistoriaClinica } from "../models/HistoriaClinica.js";

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

    //Obtengo la hc mediante el dni del paciente
    const historiaClinicaObtenida =
      await HistoriaClinicaService.getHistoriaClinicaByPacienteDni(
        evento.pacienteDni
      );

    //si no existe, creo la historia clinica
    if (!historiaClinicaObtenida) {
      return ("No se pudo encontrar la historia clínica");
    } else {
      // Si ya existe la historia clinica, asignarla al evento correspondiente
      evento.historiaClinicaId = historiaClinicaObtenida.id;
    }

    evento.fecha = new Date();
    // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
    newEvento = await Evento.create(evento);

    return newEvento;
  } catch (error) {
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
  let historia = await HistoriaClinicaService.getHistoriaClinicaByPacienteDni(pacienteDNI);
  
  if(!historia){
    return [];
  }
  
  historia = historia; //conseguimos la primera historia

  console.log("HIST:" + JSON.stringify(historia));

  const eventos = await Evento.findAll({
    where: {
      historiaClinicaId:historia.id
    }
  });

  if (eventos.length === 0) {
    [];
  } else {
    return eventos;
  }
}