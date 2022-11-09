import { EventosService } from "../services/eventos.service.js";
import { PacientesService } from "../services/paciente.service.js";
import { sequelize } from "../database/database.js";
import { Medico } from "../models/Medico.js";
import { Evento } from "../models/Evento.js";

export async function handleSincronizarPostRequest(req, res, next) {
  res.send(await getDatosParaSincronizar(req.body.fecha,req.body.dnisyFechasASincronizar));
}

export async function getDatosParaSincronizar(fecha,dnisYFechas) {

  if(!fecha){
    //primera sincronizacion
    return await EventosService.getEventosCompletosPorDnisYFechas(dnisYFechas);
  }else{
    return await EventosService.getEventosCompletosPorDnisYFechasAPartirDeFecha(dnisYFechas,fecha);
  }

}

export async function actualizarDatos(datos) {
  console.log("\n\nevento:datos a actualizar\n\n",datos);
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

    });

    return true;
  } catch (error) {
    console.log("No se pudo actualizar el evento compartido: " + error);
    return {};
  }
}
