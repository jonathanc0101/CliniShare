import { EventosService } from "../services/eventos.service.js";
import { PacientesService } from "../services/paciente.service.js";
import { sequelize } from "../database/database.js";
import { Medico } from "../models/Medico.js";
import { Evento } from "../models/Evento.js";
import { SincronizacionService } from "../services/sincronizacion.service.js";

export async function handleSincronizarPostRequest(req, res, next) {
  res.send(await getDatosParaSincronizar(req.body));
}

export async function getDatosParaSincronizar(dnisYFechas) {
  return await EventosService.getEventosCompletosPorDnisYFechas(dnisYFechas);
}

export async function actualizarDatos(datos) {
  
  //hay que resolver el tema de sincronizar los pacientes, que quede almacenada la version mas actualizada del paciente
  try {
    await sequelize.transaction(async (t) => {
      for (const evento of datos) {
        await Medico.upsert(evento.medico,{transaction: t});
        await PacientesService.upsertarPorDNIyNacimiento(evento.paciente,t);
        const eventoAux = {
          ...evento,
          pacienteId: await PacientesService.getIdPorDniYNacimiento(evento.paciente),
          medicoId: evento.medicoId,
        };
        await Evento.upsert(eventoAux,{transaction: t});
      }

      await SincronizacionService.createSincronizacion({medicoId:datos["medico"]["id"]})
    });



    return true;
  } catch (error) {
    console.log("No se pudo cargar el paciente: " + error);
    return {};
  }
}
