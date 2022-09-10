import axios from "axios";
import { SERVER_BD_PORT, INITIAL_RESPONSE } from "../UDP/constants.js";
import emitter from "../eventos/eventEmitter.js";

export async function handleNewComputer(computadora){
    try {
        for(ip in computadora.IPS){
            let res = await axios.get(ip + ":" + SERVER_BD_PORT + "/clinishare");

            let data = res.data;

            console.log(data);
        }

        // emitter.emit("new_valid_computer", )

    } catch (error) {        
        console.log(error);
    }
}

export function getInitialResponse(){
    return INITIAL_RESPONSE;
}

