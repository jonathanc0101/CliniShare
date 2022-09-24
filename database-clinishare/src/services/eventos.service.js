import { Evento } from "../models/Evento.js";
import { HistoriaClinicaService } from "./historiaClinica.service.js";
import { HistoriaClinica } from "../models/HistoriaClinica.js";

export const EventosService = {
  getEventos: () => getEventosFromModel(),
  createEvento: (evento) => createEventoFromModel(evento),
  getEventosPorDniPaciente: (dni) => getEventosFromModelPorPacienteDNI(dni),
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

async function createEventoFromModel(evento) {
  try {
    let newEvento = {};

    //Obtengo la hc mediante el dni del paciente
    const historiaClinicaObtenida =
      await HistoriaClinicaService.getHistoriaClinicaByPacienteDni(
        evento.pacienteDni
      );

    //si no existe, creo la historia clinica
    if (historiaClinicaObtenida === null) {
      return ("No se pudo encontrar la historia clínica");
      // const historiaClinicaNueva =
      //   await HistoriaClinicaService.createHistoriaClinica({
      //     pacienteDni: evento.pacienteDni,
      //   });
      //después de crear la historia clinica, asginar al evento correspondiente
      // evento.historiaClinicaId = historiaClinicaNueva.id;
    } else {
      // Si ya existe la historia clinica, asignarla al evento correspondiente
      evento.historiaClinicaId = historiaClinicaObtenida.id;
    }

    evento.fecha = new Date();
    // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
    newEvento = await Evento.create(evento);

    return newEvento;
  } catch (error) {
    return "No se pudo cargar el evento. " + error;
  }
}


async function getEventosFromModelPorPacienteDNI(pacienteDNI) {
  const historia = await HistoriaClinica.findAll({
    //migrar luego a historia.service
    where : {
      pacienteDni: pacienteDNI
    }
  });

  if(!historia){
    return [];
  }

  const eventos = await Evento.findAll({
    where: {
      historiaClinicaId:historia.historiaClinicaId
    }
  });

  if (eventos.length === 0) {
    [];
  } else {
    return eventos;
  }
}