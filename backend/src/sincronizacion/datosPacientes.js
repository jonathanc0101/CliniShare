import { EventosService } from "../services/eventos.service.js";
import { PacientesService } from "../services/paciente.service.js";
import { sequelize } from "../database/database.js";

export async function handleSincronizarPostRequest(req,res,next){
  res.send(await getDatosParaSincronizar(req.body));
}

export async function getDatosParaSincronizar(dnisYFechas){
   return await EventosService.getEventosCompletosPorDnisYFechas(dnisYFechas);
}

export async function actualizarDatos(datos) {
  console.log("datosdatos",datos);
   // aca hay que actualizar los medicos, eventos, y pacientes lo dejamos para despues, pero igual los recibimos
   try {
      await sequelize.transaction(async (t) => {
         for(const evento in datos){
          console.log("eventoeventoevento",evento);
            // Medico.upsert(medico);
         }

        for (const paciente of datos.pacientes) {
          
          PacientesService.upsertarPorDNIyNacimiento(paciente);

          //updateamos los eventos correspondientes
          for(const evento of paciente.eventos){
            Evento.upsert({...evento, pacienteId:pacienteAux.id, medicoId:medicoId,
          });
          }
        }
      });
  
      return newPaciente;
    } catch (error) {
      console.log("No se pudo cargar el paciente: " + error);
      return {};
    }
}
