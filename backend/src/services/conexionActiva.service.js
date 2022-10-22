import { ConexionActiva } from "../models/ConexionActiva.js";

export const ConexionActivaService = {
  getConexiones: () => getConexionesFromModel(),
  getConexionPorID: (id) => getConexionPorIDFromModel(id),
  createConexion: (conexion) =>
    createConexionFromModel(conexion),
  deleteConexionPorId: (conexion) => deleteConexionPorIdFromModel(conexion),
};

async function getConexionesFromModel() {
  const conexiones = await ConexionActiva.findAll({
    where:{
      activa:true
    }
  });

  if (!conexiones) {
    return([]);
  }
  else {
    return conexiones;
  }
}

async function getConexionPorIDFromModel(id){
  const conexion = await ConexionActiva.findOne({
    where : {id:id}
  });

  return conexion;
}

async function createConexionFromModel(conexion) {
  try {
    //MODIFICAR, QUE SI LA IP ESTA REPETIDA LOS DATOS SE PISEN
    const conexionFound =  await ConexionActiva.findOne({where:{ip:""}});

    if(conexionFound){
      await ConexionActiva.destroy({where:{ip:conexion.ip}});
    }

    let newConexion = await ConexionActiva.create(conexion);

    return newConexion;
  } catch (error) {
    console.log( "Error en la createConexionFromModel " + error);
    return {};
  }
}

async function deleteConexionPorIdFromModel(id) {
  try {
    return await ConexionActiva.update({activa:false}, {
      where: { id: conexion.id },
    });
    
  } catch (error) {
    console.log( "Error en deleteConexionFromModel " + error);
    return {};
  }
}