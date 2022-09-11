import { Paciente } from "../models/Paciente.js";

export const PacientesService = {
  getPacientes: () => getPacientesFromModel(),
  createPaciente: (paciente) => createPacienteFromModel(paciente),
  getPacienteByDni: (dniABuscar) => getPacienteByDniFromModel(dniABuscar),
  getDnisDePacientes: () => getDnisDePacientesFromModel(),
  getInterseccionDNIS: (dnis) => getInterseccionDNISFromModel(dnis),
  getPacientesPorDnis:(dnis) => getPacientesPorDnisFromModel(dnis),
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

async function createPacienteFromModel({ nombre, apellido, dni }) {

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
    return ("Paciente no encontrado");
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

async function getInterseccionDNISFromModel(dnis) {
  let dnisInterseccion = [];

  const pacientes = await getDnisDePacientesFromModel();
  const newPacientes = pacientes.map((x) => x.dni);
  const newDnis = dnis.map((x) => x.dni);


  dnisInterseccion = newDnis.filter(value => newPacientes.includes(value));
  dnisInterseccion = dnisInterseccion.filter(value => newDnis.includes(value));

  console.log("dnisInterseccion " + dnisInterseccion);

  return dnisInterseccion;
}

async function getPacientesPorDnisFromModel(dnisPacientes) {
  if (dnisPacientes.length === 0) {
    return []
  }
  
  let todosLosPacientes = await getPacientesFromModel();
  console.log(todosLosPacientes);
  return todosLosPacientes;

  // let datosPacientes = await JSON.stringify(getPacientesPorDnis(dnisPacientes));
  // res.send(datosPacientes);
}


