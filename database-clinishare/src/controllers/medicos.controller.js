import { Medico } from "../models/Medico.js";

export const getMedicos = async (req, res) => {
  const medicos = await Medico.findAll();
  console.log(medicos);
  res.send("obteniendo médicos...");
};

export const createMedico = async (req, res) => {
  const { nombre, apellido, dni, matricula } = req.body;

  // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
  const newMedico = await Medico.create({
    nombre,
    apellido,
    dni,
    matricula,
  });

  console.log(newMedico);
  res.send("creando medico...");
};
