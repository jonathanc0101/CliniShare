import { sequelize } from "../database/database.js";
import { Evento } from "../models/Evento.js";
import { Paciente } from "../models/Paciente.js";
import { PacientesService } from "../services/paciente.service.js";

export const getPacientes = async (req, res) => {
  const pacientes = await PacientesService.getPacientes();
  res.send(JSON.stringify(pacientes));
};

export const getPacienteByDni = async (req, res) => {
  // let { dniABuscar } = req.body;
  const pacienteEncontrado = await PacientesService.getPacienteByDni(dniABuscar);
  res.send(JSON.stringify(pacienteEncontrado));
};

export const getDnisDePacientes = async (req, res) => {
  const pacientes = await PacientesService.getDnisDePacientes();
  res.send(JSON.stringify(pacientes));
};


export const createPaciente = async (req, res) => {
  const {nombre, apellido, dni} = req.body;
  const newPaciente = await PacientesService.createPaciente({nombre,apellido,dni});
  res.send(JSON.stringify(newPaciente));

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
