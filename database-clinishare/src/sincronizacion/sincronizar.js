import axios from "axios";
import { SERVER_BD_PORT} from "../UDP/constants.js";
import emitter from "../eventos/eventEmitter.js";

export function sincronizar(computadora) {
        const postSincronicemosString = 'http://' + computadora.ip.toString().trim() + ':' + SERVER_BD_PORT.toString().trim() + '/sincronizar';

        const getDNISString = 'http://' + computadora.ip.toString().trim() + ':' + SERVER_BD_PORT.toString().trim() + '/pacientes/all/dnis';

        axios
            .get(getDNISString)
            .then(res => {
                if(res.data.count === 0){ //si no tiene pacientes no hay nada que hacer
                    return //chau chau adios
                }
                
                let dnisDePacientes = res.data;
                console.log(dnisDePacientes);
            })
            .catch(error => {
                console.error(error);
            });

        console.log("url de sincronizar: " + postSincronicemosString);

        // axios
        //     .post(postMethodString,{
                
        //       })
        //     .then(res => {
        //         if(??){
        //             // hacemosAlgo
        //             emitter.emit("??", {???})
        //             return;
        //         }
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });


}

