import { Evento } from "../models/Evento.js";

export const EventosService = {
    getEventos : () => getEventosFromModel()
}

async function getEventosFromModel(){
    const eventos = await Evento.findAll({ attributes: ['id', 'titulo', 'fecha', 'descripcion'] });

    if (eventos.length === 0) {
      [];
    }
    else {
      return(eventos);
    }
}