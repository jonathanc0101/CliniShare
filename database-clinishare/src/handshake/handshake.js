import axios from "axios";
import { SERVER_BD_PORT, INITIAL_RESPONSE } from "../UDP/constants.js";
import emitter from "../eventos/eventEmitter.js";

export function handleNewComputer(computadora){

        for(let ip in computadora.IPS){
            console.log("IP" + computadora.IPS[ip]);
            
            let getMethodString = computadora.IPS[ip] + ":" + SERVER_BD_PORT + "/clinishare";
            console.log(getMethodString);

            axios.get(getMethodString).then(( response )=> {
                // console.log(`statusCode: ${res.status}`);
                console.log("response" + response);
                console.log("response.data" + response.data);
              })
              .catch(error => {
                console.error(error);
              });
        }

        // emitter.emit("new_valid_computer", )

}

export function getInitialResponse(req, res) {
    res.send(JSON.stringify({"INITIAL_RESPONSE":INITIAL_RESPONSE}));
}


