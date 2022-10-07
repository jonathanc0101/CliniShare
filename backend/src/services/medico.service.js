import { Medico } from "../models/Medico.js";

export const MedicosService = {
  getMedicos: () => getMedicosFromModel(),
  // getMedicoByDni: (dniABuscar) => getMedicoByDniFromModel(dniABuscar),
  createMedico: (medico) => createMedicoFromModel(medico),
};

async function getMedicosFromModel() {
  const medicos = await Medico.findAll({
    attributes: ["id", "nombre", "apellido", "dni", "matricula"],
  });

  if (medicos.length === 0) {
    return [];
  } else {
    return medicos;
  }
}

async function createMedicoFromModel({ nombre, apellido, dni, matricula }) {
  try {
    // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
    let newMedico = await Medico.create({
      nombre,
      apellido,
      dni,
      matricula,
    });

    return newMedico;
  } catch (error) {
    return "No se pudo crear médico, error: " + error;
  }
}

// async function getMedicoByDniFromModel(dniABuscar) {
//   const medico = await Medico.findOne({
//     where: {
//       dni: dniABuscar,
//     },
//   });

//   if (!medico) {
//     return {};
//   } else {
//     return medico;
//   }
// }