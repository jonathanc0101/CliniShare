import { Paciente } from "../models/Paciente.js";
import { HistoriaClinica } from "../models/HistoriaClinica.js";
import { sequelize } from "../database/database.js";
import { Evento } from "../models/Evento.js";

export const PacientesService = {
  getPacientes: () => getPacientesFromModel(),
  createPaciente: (paciente) => createPacienteFromModel(paciente),
  getPacienteByDni: (dniABuscar) => getPacienteByDniFromModel(dniABuscar),
  getDnisDePacientes: () => getDnisDePacientesFromModel(),
  getInterseccionDNIS: (dnis) => getInterseccionDNISFromModel(dnis),
  getPacientesPorDnis: (dnis) => getPacientesPorDnisFromModel(dnis)
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
    //IMPORTANTE (para el futuro), COMPARAR Y DEJARLE AL USUARIO DECIDIR
    let newPacienteAux = {};

    await sequelize.transaction(async (t) => {
      const newPaciente = await Paciente.create(
        {
          nombre,
          apellido,
          dni,
        },
        {
          transaction: t,
        }
      );

      //Se crea la historia clíínica del paciente
      await HistoriaClinica.create(
        { pacienteDni: newPaciente.dni },
        {
          transaction: t,
        }
      );

      newPacienteAux = {
        nombre: newPaciente.nombre,
        apellido: newPaciente.apellido,
        dni: newPaciente.dni,
      };
    });

    return newPacienteAux;
  } catch (error) {
    console.log("No se pudo cargar el paciente. " + error);
    return { error };
  }
}

async function getPacienteByDniFromModel(dniABuscar) {
  // let { dniABuscar } = req.body;
  const paciente = await Paciente.findAll({
    where: {
      dni: dniABuscar,
    },
    attributes: ["id", "nombre", "apellido", "dni"],
  });

  if (!paciente) {
    return null;
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



