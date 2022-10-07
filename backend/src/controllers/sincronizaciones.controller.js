
import { SincronizacionService } from "../services/sincronizacion.service.js";

export const getSincronizacionReciente = async (req, res, next) => {
    const sincronizacionMasReciente = await SincronizacionService.getSincronizacionReciente();
    console.log(sincronizacionMasReciente);
    res.send(JSON.stringify(sincronizacionMasReciente));
}

export const createSincronizacion = async (req, res, next) => {
  const {fecha,medicoDNI} = req.body;

  const newSincronizacion = await SincronizacionService.createSincronizacion({fecha,medicoDNI});
  res.send(JSON.stringify(newSincronizacion));

};

