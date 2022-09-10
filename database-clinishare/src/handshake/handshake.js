import axios from "axios";
import { SERVER_BD_PORT, INITIAL_RESPONSE } from "../UDP/constants.js";
import emitter from "../eventos/eventEmitter.js";

export async function handleNewComputer(computadora){

    try {     
        for(let ip in computadora.IPS){
            console.log("IP" + computadora.IPS[ip]);
            
            let getMethodString = computadora.IPS[ip] + "%3" + SERVER_BD_PORT + "/clinishare";
            console.log(getMethodString);

            let res = await axios.get(getMethodString);
            console.log((res));

            let data = res.data;

            console.log(data);
        }

        // emitter.emit("new_valid_computer", )

    } catch (error) {        
        console.log(error);
    }
}

export async function getInitialResponse(req, res) {
    res.send(JSON.stringify({"INITIAL_RESPONSE":INITIAL_RESPONSE}));
}


