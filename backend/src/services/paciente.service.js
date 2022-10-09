import { Paciente } from "../models/Paciente.js";
import { sequelize } from "../database/database.js";
import { Evento } from "../models/Evento.js";

export const PacientesService = {
  getPacientes: () => getPacientesFromModel(),
  createPaciente: (paciente) => createPacienteFromModel(paciente),
  getPacienteByDni: (dniABuscar) => getPacienteByDniFromModel(dniABuscar),
  getPacienteById: (id) => getPacienteByIdFromModel(id),
  getDnisDePacientes: () => getDnisDePacientesFromModel(),
  getInterseccionDNIS: (dnis) => getInterseccionDNISFromModel(dnis),
  getPacientesPorDnis: (dnis) => getPacientesPorDnisFromModel(dnis),
  getEntidadesPacientesPorDnis: (dnis) =>
    getEntidadesPacientesPorDnisFromModel(dnis),
  updatePacientePorId: (paciente, id) =>
    updatePacientePorIdFromModel(paciente, id),
};

async function getPacientesFromModel() {
  const pacientes = await Paciente.findAll();

  if (pacientes.length === 0) {
    return [];
  } else {
    return pacientes;
  }
}

async function getEntidadesPacientesFromModel() {
  const pacientes = await Paciente.findAll({
      include: [
      {
        model: Evento      
      },
    ],
  });

  if (pacientes.length === 0) {
    return [];
  } else {
    return pacientes;
  }
}

async function createPacienteFromModel(paciente) {
  try {
    let newPaciente = {};

    await sequelize.transaction(async (t) => {
      newPaciente = await Paciente.create(paciente,
        {
          transaction: t,
        }
      );

    });

    return newPaciente;
  } catch (error) {
    console.log("No se pudo cargar el paciente. " + error);
    return { };
  }
}

async function updatePacientePorIdFromModel(paciente, id) {
  try {
    const response = await Paciente.update(paciente, {
      where: { id: id },
    });

    return response;
  } catch (error) {
    console.log(error);

    return {};
  }
}

async function getPacienteByDniFromModel(dniABuscar) {
  const paciente = await Paciente.findOne({
    where: {
      dni: dniABuscar,
    },
  });

  if (!paciente) {
    return {};
  } else {
    return paciente;
  }
}

async function getPacienteByIdFromModel(id) {
  const paciente = await Paciente.findOne({
    where: {
      id: id,
    },
  });

  if (!paciente) {
    return {};
  } else {
    return paciente;
  }
}

async function getDnisDePacientesFromModel() {
  const pacientes = await Paciente.findAll({
    attributes: ["dni"],
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

  dnisInterseccion = newDnis.filter((value) => newPacientes.includes(value));
  dnisInterseccion = dnisInterseccion.filter((value) =>
    newDnis.includes(value)
  );

  console.log("Dnis obtenidos en la INTERSECCIÓN: " + dnisInterseccion);

  return dnisInterseccion;
}

async function getPacientesPorDnisFromModel(dnisPacientes) {
  if (dnisPacientes.length === 0) {
    return [];
  }

  let todosLosPacientes = await getPacientesFromModel();

  // FILTRAR
  let pacientesFiltrados = todosLosPacientes.filter((value) =>
    dnisPacientes.includes(value.dni)
  );

  return pacientesFiltrados;
}

async function getEntidadesPacientesPorDnisFromModel(dnisPacientes) {
  if (dnisPacientes.length === 0) {
    return [];
  }

  let todosLosPacientes = await getEntidadesPacientesFromModel();

  // FILTRAR
  let pacientesFiltrados = todosLosPacientes.filter((value) =>
    dnisPacientes.includes(value.dni)
  );

  return pacientesFiltrados;
}

