import axios from "axios";
import { SERVER_BD_PORT} from "../UDP/constants.js";
import emitter from "../eventos/eventEmitter.js";

export function sincronizar(computadora) {
        const postMethodString = 'http://' + computadora.ip.toString().trim() + ':' + SERVER_BD_PORT.toString().trim() + '/sincronizar';

        console.log(postMethodString);
        // axios
        //     .post(postMethodString)
        //     .then(res => {
        //         if(res.data.INITIAL_RESPONSE === INITIAL_RESPONSE ){
        //             // hacemosAlgo
        //             emitter.emit("new_valid_computer", {nombre:computadora.nombre, ip:computadora.IPS[ip]})
        //             return;
        //         }
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });


}

