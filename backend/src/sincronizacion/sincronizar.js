import axios from "axios";
import { SERVER_BD_PORT} from "../UDP/constants.js";
import { PacientesService } from "../services/paciente.service.js";
import emitter from "../eventos/eventEmitter.js";

export async function sincronizar(computadora) {
    
        const postSincronicemosString = 'http://' + computadora.ip.toString().trim() + ':' + SERVER_BD_PORT.toString().trim() + '/sincronizar';

        const getDNISyNacimientosString = 'http://' + computadora.ip.toString().trim() + ':' + SERVER_BD_PORT.toString().trim() + '/pacientes/all/dnis;nacimientos';


        //obtener DNIS para sincronizar con los que tenemos en comun
        let dnisyNacimientosDePacientes = [];
        await axios
            .get(getDNISyNacimientosString)
            .then(res => {
                if(res.data.count === 0){ //si no tiene pacientes no hay nada que hacer
                    return //chau chau adios
                }
                
                dnisyNacimientosDePacientes = res.data;
            })
            .catch(error => {
                console.error(error);
            });

            let dnisyFechasASincronizar = await PacientesService.getInterseccionDNISyFechas(dnisyNacimientosDePacientes);
            
        console.log("dnisyFechasASincronizar: ",dnisyFechasASincronizar);
        //obtener los datos a sincronizar
        await axios
            .post(postSincronicemosString,dnisyFechasASincronizar)
            .then(res => {
                if(!res.data){
                    return //chau chau adios
                }
                if(res.data.length === 0){
                    return //chau chau adios
                }

                let datosPacientes = res.data;
                
                console.log("datosPacientesdatosPacientesdatosPacientes: ",datosPacientes);
                // hacemosAlgo
                emitter.emit("datos_recibidos", datosPacientes)
            })
            .catch(error => {
                console.error(error);
            });

}

