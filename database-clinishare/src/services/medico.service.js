import { Medico } from "../models/Medico.js"

export const MedicosService = {
    getMedicos: () => getMedicosFromModel(),
    createMedico: () => createMedicoFromModel(),
}

async function getMedicosFromModel() {
    const medicos = await Medico.findAll({ attributes: ['id', 'nombre', 'apellido', 'dni',"matricula"] });
    
    if (medicos.length === 0) {
        return [];
    }
    else {
        return medicos;
    }
}

async function createMedicoFromModel({nombre,apellido,dni,matricula}){
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
    
        return(newMedico);
      
      } catch (error) {
        return("No se pudo crear médico, error: " + error);
      }
}