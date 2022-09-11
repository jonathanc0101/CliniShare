import { HistoriaClinica } from "../models/HistoriaClinica.js";

export const HistoriaClinicaService = {
  getHistoriasClinicas: () => getHistoriasClinicasFromModel(),
  createHistoriaClinica: (historia) => createHistoriaClinicaFromModel(historia),
}

async function getHistoriasClinicasFromModel() {
    const historias = await HistoriaClinica.findAll({ attributes: ['id', 'pacienteId', 'medicoId'] });
    
    if (historias.length === 0) {
        return [];
    }
    else {
        return historias;
    }

}

async function createHistoriaClinicaFromModel({ id, pacienteId}) {
    try {
        // es asincrono porque es una consulta a la bd, esta guardando un dato dentro de la bd
        let newHistoria = await HistoriaClinica.create({ id, pacienteId});
    
        newHistoria = {
            id:newHistoria.id,
            pacienteId:newHistoria.pacienteId,
        }
    
        return(newHistoria);
      
      } catch (error) {
        return("No se pudo crear historia, error: " + error);
      }  
}