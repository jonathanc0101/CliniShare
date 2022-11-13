import {eventos1} from "./eventos_1.js";
import {eventos2} from "./eventos_2.js";
import {eventos3} from "./eventos_3.js";
import {medicos} from "./medicos.js";
import {pacientes} from "./pacientes.js";
import fs from "fs";

async function procesarDatos(){

    const eventos = [...eventos1,...eventos2,...eventos3];
    const pacientesIds = pacientes.map((p)=>p.id);
    const medicosIds = medicos.map((p)=>p.id);

    
    for(const evento of eventos){
        const randomMedicoId = medicosIds[randomIndex(medicosIds)];
        const randomPacienteId = pacientesIds[randomIndex(pacientesIds)];

        // generar id medico e id paciente

        evento.medicoId = randomMedicoId;
        evento.pacienteId = randomPacienteId;        
    }

    const eventos1Procesados = eventos.filter((e) => eventos.indexOf(e) < eventos1.length );
    const eventos2Procesados = eventos.filter((e) => eventos.indexOf(e) < eventos2.length );
    const eventos3Procesados = eventos.filter((e) => eventos.indexOf(e) < eventos3.length );

    const eventosProcesados = {eventos1Procesados,eventos2Procesados,eventos3Procesados};

    for(const key of Object.keys(eventosProcesados)){
        fs.writeFileSync(key + ".js",JSON.stringify(eventosProcesados[key],null,4));
    }

}

function randomIndex(arr){
    return Math.floor(Math.random() * arr.length);
}

procesarDatos();