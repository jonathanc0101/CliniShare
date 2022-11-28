import { PacienteConflictivo } from "../models/PacienteConflictivo.js";
import { sequelize } from "../database/database.js";
import { Evento } from "../models/Evento.js";
import { PacientesService } from "./paciente.service.js";
import { Paciente } from "../models/Paciente.js";

export const PacientesConflictivosService = {
  getAll,
  getPacientesYConflictos,
  resolver,
  upsertarPorDNINacimientoYComputadoraId,
  apartarConflictos,
};

async function apartarConflictos(pacientes, computadoraId) {
  let pacientesNoConflictivos = [];

  const pacientesFiltrados = pacientes.map((p) => {
    let pNew = p;
    delete pNew.id;
    return pNew;
  });

  for (const paciente of pacientesFiltrados) {
    const pAux = await PacientesService.getPorDniYNacimiento(paciente);
    let pacienteEncontrado = pAux.dataValues;
    delete pacienteEncontrado.id;

    // console.log("\n\n\n");
    // console.log("\n\n recibido \n", paciente);
    // console.log("\n\n\n");

    // console.log("\n\n\n");
    // console.log("\n\n encontrado \n", pacienteEncontrado);
    // console.log("\n\n\n");

    const sonIguales =
      JSON.stringify(paciente) === JSON.stringify(pacienteEncontrado);

    console.log("\n\n\n");
    console.log("sonIguales: ", sonIguales);
    console.log("\n\n\n");

    if (sonIguales) {
      pacientesNoConflictivos.push(paciente);
    } else {
      upsertarPorDNINacimientoYComputadoraId({ ...paciente, computadoraId });
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



async function getPacientesYConflictos() {
  const zip = (a, b) =>
    a.map((k, i) => {
      return { paciente: k, conflicto: b[i] };
    });

  const pacientesConflictivos = await PacienteConflictivo.findAll();
  const pacientes = await Paciente.findAll();

  const pacientesFiltrados = pacientes.filter((v) => {
    return pacientesConflictivos.some((e) => {
      return e.fechaNacimiento === v.fechaNacimiento && e.dni === v.dni;
    });
  });

  const pacientesYConflictos = zip(pacientesFiltrados, pacientesConflictivos);

  const pacientesYConflictosFiltrados = pacientesYConflictos.filter(x => {
    if(x.conflicto){
      return true
    }
  });

  return { pacientesYConflictosFiltrados };
}

//   dnisYFechasInterseccion = newDnisyFechas.filter((value) => localDnisYfechas.some(elem => JSON.stringify(value) === JSON.stringify(elem)));
//   dnisYFechasInterseccion = dnisYFechasInterseccion.filter((value) =>
//   newDnisyFechas.some(elem => JSON.stringify(value) === JSON.stringify(elem))
//   );

async function resolver(pacienteConflictivo) {
  let upsertado = {};

  await sequelize.transaction(async (t) => {
    await PacienteConflictivo.destroy({
      where: { conflictoId: pacienteConflictivo.conflictoId },
      transaction: t,
    });

    let paciente = { ...pacienteConflictivo.dataValues };
    delete paciente.computadoraId;
    delete paciente.conflictoId;

    upsertado = await PacientesService.upsertarPorDNIyNacimiento(paciente, {
      transaction: t,
    });
  });

  return upsertado;
}

async function upsertarPorDNINacimientoYComputadoraId(paciente) {
  const pacienteFound = await PacienteConflictivo.findOne({
    where: {
      dni: paciente.dni,
      fechaNacimiento: paciente.fechaNacimiento,
      computadoraId: paciente.computadoraId,
    },
  });

  PacienteConflictivo.upsert(paciente);
}
