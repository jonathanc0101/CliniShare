import { Paciente } from "../models/Paciente.js"

export const PacientesService = {
    getPacientes: () => getPacientesFromModel()
}

async function getPacientesFromModel() {
    const pacientes = await Paciente.findAll({ attributes: ['id', 'nombre', 'apellido', 'dni'] });

    if (pacientes.length === 0) {
        return [];
    }
    else {
        return pacientes;
    }
}