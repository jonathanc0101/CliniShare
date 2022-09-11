import { Paciente } from "../models/Paciente.js";

export const PacientesService = {
  getPacientes: () => getPacientesFromModel(),
  createPaciente: (paciente) => createPacienteFromModel(paciente),
  getPacienteByDni: (dniABuscar) => getPacienteByDniFromModel(dniABuscar),
  getDnisDePacientes: () => getDnisDePacientesFromModel()
};

async function getPacientesFromModel() {
  const pacientes = await Paciente.findAll({
    attributes: ["id", "nombre", "apellido", "dni"],
  });

  if (pacientes.length === 0) {
    return [];
  } else {
    return pacientes;
  }
}

async function createPacienteFromModel({nombre, apellido, dni}) {
  // const { nombre, apellido, dni } = req.body;

  try {
    // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
    const newPaciente = await Paciente.create({
      nombre,
      apellido,
      dni,
    });

    const newPacienteAux = {
      nombre: newPaciente.nombre,
      apellido: newPaciente.apellido,
      dni: newPaciente.dni,
    };

    return newPacienteAux;
  } catch (error) {
    return null;
  }
}

async function getPacienteByDniFromModel(dniABuscar) {
    // let { dniABuscar } = req.body;
  const paciente = await Paciente.findAll({
    where: {
      dni: dniABuscar
    },
    attributes: ['id', 'nombre', 'apellido', 'dni']
  });

  if (!paciente) {
    return("Paciente no encontrado");
  }
  else {
    return paciente;
  }
}

async function getDnisDePacientesFromModel() {
    const pacientes = await Paciente.findAll({
        attributes: ['dni']
      });
      
  if (pacientes.length === 0) {
    return [];
  } else {
    return pacientes;
  }
}

