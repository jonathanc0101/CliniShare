import { Medico } from "../models/Medico.js";
import { EventosService } from "../services/eventos.service.js";
import { PacientesService } from "../services/paciente.service.js";

export async function getDatosParaSincronizar(req,res,next){
  res.send(getDatosParaSincronizar(req.body.dnisYFechas));
}


export async function getDatosParaSincronizar(dnisYFechas){
   return await EventosService.getEventosCompletosPorDnisYFechas(dnisYFechas);
}

export async function actualizarDatos(datos) {
   // aca hay que actualizar los medicos, eventos, y pacientes lo dejamos para despues, pero igual los recibimos
   try {
      await sequelize.transaction(async (t) => {
         for(const medico of datos.medicos){
            Medico.upsert(medico);
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
