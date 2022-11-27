
import { PacienteConflictivo } from "../models/PacienteConflictivo.js";
import { sequelize } from "../database/database.js";
import { Evento } from "../models/Evento.js";
import { PacientesService } from "./paciente.service.js";


export const PacientesConflictivosService = {
  getAll,
  resolver,
  upsertarPorDNINacimientoYComputadoraId,
  apartarConflictos
};

async function apartarConflictos(pacientes,computadoraId){
  let pacientesNoConflictivos = [];

  const pacientesFiltrados = pacientes.map( (p) => {
    let pNew = p;
    delete pNew.id;
    return pNew;
  });

  for(const paciente of pacientesFiltrados){

    const pAux = await PacientesService.getPorDniYNacimiento(paciente);
    let pacienteEncontrado = pAux.dataValues;
    delete pacienteEncontrado.id;

    console.log("\n\n\n");
    console.log("\n\n recibido \n", paciente);
    console.log("\n\n\n");

    console.log("\n\n\n");
    console.log("\n\n encontrado \n", pacienteEncontrado);
    console.log("\n\n\n");

    const sonIguales = JSON.stringify(paciente) === JSON.stringify(pacienteEncontrado);

    console.log("\n\n\n");
    console.log("sonIguales: ",sonIguales);
    console.log("\n\n\n");

    if(sonIguales){
      pacientesNoConflictivos.push(paciente)
    }else{
      upsertarPorDNINacimientoYComputadoraId({...paciente,computadoraId});
    }

  }

  return pacientesNoConflictivos;

}

async function getAll() {
  const pacientes = await PacienteConflictivo.findAll();

  if (pacientes.length === 0) {
    return [];
  } else {
    return pacientes;
  }
}

async function resolver(pacienteConflictivo){

  let paciente = { ...pacienteConflictivo.dataValues  };
  delete paciente.computadoraId;
  delete paciente.conflictoId;

  console.log("\n\n\n conflictivo: ");
  console.log(paciente);
  console.log("\n\n\n");

  return await PacientesService.upsertarPorDNIyNacimiento(paciente);
}

async function upsertarPorDNINacimientoYComputadoraId(paciente){
  const pacienteFound = await PacienteConflictivo.findOne({
    where: {
      dni: paciente.dni,
      fechaNacimiento: paciente.fechaNacimiento,
      computadoraId:paciente.computadoraId
    }
  });

  PacienteConflictivo.upsert(paciente);
}

