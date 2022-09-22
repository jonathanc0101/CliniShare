import axios from "axios";
import { SERVER_BD_PORT} from "../UDP/constants.js";
import { PacientesService } from "../services/paciente.service.js";
import emitter from "../eventos/eventEmitter.js";

export async function sincronizar(computadora) {
    
        const postSincronicemosString = 'http://' + computadora.ip.toString().trim() + ':' + SERVER_BD_PORT.toString().trim() + '/sincronizar';

        const getDNISString = 'http://' + computadora.ip.toString().trim() + ':' + SERVER_BD_PORT.toString().trim() + '/pacientes/all/dnis';

        let dnisDePacientes = [];
        await axios
            .get(getDNISString)
            .then(res => {
                if(res.data.count === 0){ //si no tiene pacientes no hay nada que hacer
                    return //chau chau adios
                }
                
                dnisDePacientes = res.data;
                console.log(dnisDePacientes);
            })
            .catch(error => {
                console.error(error);
            });

            let dnisASincronizar = await PacientesService.getInterseccionDNIS(dnisDePacientes);
        
        await axios
            .post(postSincronicemosString,dnisASincronizar)
            .then(res => {
                if(!res.data){
                    return //chau chau adios
                }
                if(res.data.length === 0){
                    return //chau chau adios
                }

                let datosPacientes = res.data;

                console.log("datosPacientes " + JSON.stringify(datosPacientes));
                
                // hacemosAlgo
                emitter.emit("pacientes_recibidos", datosPacientes)
            })
            .catch(error => {
                console.error(error);
            });

}

