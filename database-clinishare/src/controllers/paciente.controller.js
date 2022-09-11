import { sequelize } from "../database/database.js";
import { Evento } from "../models/Evento.js";
import { Paciente } from "../models/Paciente.js";
import { PacientesService } from "../services/paciente.service.js";

export const getPacientes = async (req, res) => {
  const pacientes = await PacientesService.getPacientes();
  console.log(pacientes);
  res.send(JSON.stringify(pacientes));
};

export const getPacienteByDni = async (req, res) => {
  let { dniABuscar } = req.body;
  const paciente = await Paciente.findAll({
    where: {
      dni: dniABuscar
    },

    attributes: ['id', 'nombre', 'apellido', 'dni']

  });

  console.log(paciente);

  if (!paciente) {
    res.send(JSON.stringify({}));
  }
  else {
    res.send(JSON.stringify(paciente));
  }
};

export const getDnisDePacientes = async (req, res) => {
  const pacientes = await Paciente.findAll({
    attributes: ['dni']
  });

  console.log(pacientes);

  if (pacientes.length === 0) {
    res.send(JSON.stringify([{}]));
  }
  else {
    res.send(JSON.stringify(pacientes));
  }
};


export const createPaciente = async (req, res) => {
  const { nombre, apellido, dni } = req.body;

  try {
    const newPaciente = await Paciente.create({
      nombre,
      apellido,
      dni
    },);

    const newPacienteAux = { nombre: newPaciente.nombre, apellido: newPaciente.apellido, dni: newPaciente.dni };

    console.log();
    res.send(JSON.stringify(newPacienteAux));

  } catch (error) {
    res.send(JSON.stringify({error}));
  }

};

export const updatePacientes = async (req, res) => {
  const pacientes = req.body;

  try {
    let pacientesUpdateados = 0;

    //IMPORTANTE, COMPARAR Y DEJARLE AL USUARIO DECIDIR

    await sequelize.transaction(async (t) => {

      for (let paciente of pacientes) {
        await Paciente.update({

          nombre: paciente.nombre,
          dni: paciente.dni,
          apellido: paciente.apellido,
        },
         {

          where: {
            id: paciente.id
          },

          transaction: t
        });

        if(paciente.eventos){
          for(let evento of paciente.eventos){
            await Evento.update({
              titulo:evento.titulo,
              fecha:evento.fecha,
              descripcion:evento.descripcion,
            },{
              where: {
                id: evento.id
              },
            })
          }
        }

        pacientesUpdateados += 1;
      }

    });
    // If the execution reaches this line, the transaction has been committed successfully
    // `result` is whatever was returned from the transaction callback (the `user`, in this case)
    res.send(JSON.stringify({ pacientesUpdateados }));

  } catch (error) {
    console.log(error);
    res.send(JSON.stringify({ error }));

    // If the execution reaches this line, an error occurred.
    // The transaction has already been rolled back automatically by Sequelize!  
  }
};
