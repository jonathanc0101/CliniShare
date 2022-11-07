import { EventosService } from "../services/eventos.service.js";
import { PacientesService } from "../services/paciente.service.js";
import { sequelize } from "../database/database.js";
import { Medico } from "../models/Medico.js";
import { Evento } from "../models/Evento.js";
import { SincronizacionService } from "../services/sincronizacion.service.js";

export async function handleSincronizarPostRequest(req, res, next) {
  res.send(
    await getDatosParaSincronizar(
      req.body.medicoId,
      req.body.dnisyFechasASincronizar
    )
  );
}

export async function getDatosParaSincronizar(idMedico, dnisYFechas) {
  const fecha =
    await SincronizacionService.getUltimaFechaDeSincronizacionConMedicoId(
      idMedico
    );

  if (!fecha) {
    //primera sincronizacion
    return await EventosService.getEventosCompletosPorDnisYFechas(dnisYFechas);
  } else {
    return await EventosService.getEventosCompletosPorDnisYFechasAPartirDeFecha(
      dnisYFechas,
      fecha
    );
  }
}

export async function actualizarDatos(datos) {
  console.log("\n\nevento:datos a actualizar\n\n", datos);
  if (datos.length === 0) {
    return {};
  }
  //hay que resolver el tema de sincronizar los pacientes, que quede almacenada la version mas actualizada del paciente
  try {
    await sequelize.transaction(async (t) => {
      for (const medico of datos.medicos) {
        await Medico.upsert(medico, { transaction: t });
      }

      for (const paciente of datos.pacientes) {
        await PacientesService.upsertarPorDNIyNacimiento(paciente, t);
      }

      for (const evento of datos.eventos) {
        const eventoAux = {
          ...evento,
          pacienteId: await PacientesService.getIdPorDniYNacimiento(
            evento.paciente
          ),
        };
        await Evento.upsert(eventoAux, { transaction: t });
      }
    });

    return true;
    
  } catch (error) {
    console.log("No se pudo actualizar el evento compartido: " + error);
    return {};
  }
}
