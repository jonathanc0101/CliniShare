import { Medico } from "../models/Medico.js";

export const getMedicos = async (req, res) => {
  const medicos = await Medico.findAll({attributes: ['id','nombre', 'apellido', 'dni']});
  console.log(medicos);

  if (medicos.length === 0) {
    res.send(JSON.stringify({}));
  }
  else {
    res.send(JSON.stringify(medicos));
  }
};

export const createMedico = async (req, res) => {
  const { nombre, apellido, dni, matricula } = req.body;

  try {
    // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
    const newMedico = await Medico.create({
      nombre,
      apellido,
      dni,
      matricula,
    });

    newMedico = {
      nombre:newMedico.nombre,
      apellido:newMedico.apellido,
      dni:newMedico.dni,
      matricula:newMedico.matricula,
    }

    console.log(newMedico);
    res.send(JSON.stringify(newMedico));
  
  } catch (error) {
    res.send("No se pudo crear médico, error: " + error);
  }

};
