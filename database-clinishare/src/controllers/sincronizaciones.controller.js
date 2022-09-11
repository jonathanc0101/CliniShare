import { sequelize } from "../database/database.js";
import { Sincronizacion } from "../models/Sincronizacion.js";
import { SincronizacionService } from "../services/sincronizacion.service.js";

export const getSincronizacionReciente = async (req, res) => {
    const sincronizacionMasReciente = await SincronizacionService.getSincronizacionReciente();
    console.log(sincronizacionMasReciente);
    res.send(JSON.stringify(sincronizacionMasReciente));
}

export const createSincronizacion = async (req, res) => {
  const {fecha,medicoDNI} = req.body;

  const newSincronizacion = await SincronizacionService.createSincronizacion({fecha,medicoDNI});
  res.send(JSON.stringify(newSincronizacion));

};

