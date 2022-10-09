import { ConexionActivaService } from "../services/conexionActiva.service";

export const getConexionesActivas = async (req, res, next) => {
  const conexiones = await ConexionActivaService.getConexiones();
  res.send(JSON.stringify(conexiones));
};


export const getConexionPorId = async (req, res, next) => {
  let id = req.params.id;
  const conexion = await ConexionActivaService.getConexionPorId(id);

  res.send(JSON.stringify(conexion));
};

export const createConexion = async (req, res, next) => {
  try {
    const conexion = req.body;
    const conexionCargada = await ConexionActivaService.createConexion(conexion);
    res.send(JSON.stringify(conexionCargada));

  } catch (error) {
    console.log(error);
  }
};

export const deleteConexionPorId = async (req, res, next) => {
  const id = req.params.id;

  const response = await ConexionActivaService.deleteConexionPorId(id);

  res.send(JSON.stringify(response));
};
